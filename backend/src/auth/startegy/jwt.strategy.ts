import { Injectable, UnauthorizedException } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { PassportStrategy } from "@nestjs/passport";
import { Strategy, ExtractJwt } from "passport-jwt";
import { UserValidator } from "../../validators/user-auth.validator";
import { jwtPayload } from "../interfaces/payload.interface";
import { Request } from "express";

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
    constructor(
        private configService: ConfigService,
        private userValidator: UserValidator
    ) {
        super({
            jwtFromRequest: ExtractJwt.fromExtractors([
                // 1. Enhanced cookie extractor with detailed logging
                (req: Request) => {
                    console.log('🔍 === JWT TOKEN EXTRACTION DEBUG ===');
                    console.log('📋 Request URL:', req.url);
                    console.log('📋 Request Method:', req.method);
                    console.log('📋 Request Headers:', {
                        'content-type': req.headers['content-type'],
                        'authorization': req.headers.authorization ? 'Present' : 'Missing',
                        'cookie': req.headers.cookie ? 'Present' : 'Missing',
                        'user-agent': req.headers['user-agent']
                    });
                    
                    // Check raw cookie header
                    const rawCookies = req.headers.cookie;
                    console.log('🍪 Raw Cookie Header:', rawCookies || 'NO COOKIE HEADER');
                    
                    // Check parsed cookies
                    console.log('🍪 Parsed Cookies Object:', req.cookies);
                    console.log('🍪 Available Cookie Keys:', req.cookies ? Object.keys(req.cookies) : 'No cookies object');
                    
                    if (req.cookies) {
                        // Check different possible cookie names
                        const possibleTokenNames = [
                            'access_token', 
                            'accessToken', 
                            'jwt', 
                            'token',
                            'auth_token',
                            'authToken'
                        ];
                        
                        for (const name of possibleTokenNames) {
                            if (req.cookies[name]) {
                                console.log(`🔑 Found token in cookie '${name}':`, req.cookies[name].substring(0, 20) + '...');
                                return req.cookies[name];
                            }
                        }
                    }
                    
                    console.log('❌ No token found in cookies');
                    return null;
                },
                
                // 2. Authorization header extractor with logging
                (req: Request) => {
                    const authHeader = req.headers.authorization;
                    if (authHeader && authHeader.startsWith('Bearer ')) {
                        const token = authHeader.substring(7);
                        console.log('🔑 Found token in Authorization header:', token.substring(0, 20) + '...');
                        return token;
                    }
                    console.log('❌ No Bearer token in Authorization header');
                    return null;
                },
                
                // 3. Body field extractor
                ExtractJwt.fromBodyField('access_token'),
                
                // 4. Query parameter extractor
                ExtractJwt.fromUrlQueryParameter('access_token')
            ]),
            ignoreExpiration: false,
            secretOrKey: configService.get<string>('jwt.secret') || 'fallback-secret',
            passReqToCallback: false
        });
        
        console.log('🚀 JwtStrategy initialized');
        console.log('🔐 JWT Secret status:', 
            configService.get<string>('jwt.secret') ? 'PROVIDED' : 'USING FALLBACK');
    }

    async validate(payload: jwtPayload) {
        console.log('✅ JWT validation started');
        console.log('📋 Payload received:', payload);
        
        // Validasi payload structure
        if (!payload.id_anggota) {
            console.log('❌ Missing id_anggota in payload');
            throw new UnauthorizedException("Token tidak valid: payload tidak lengkap");
        }
        
        try {
            const user = await this.userValidator.validateUser(payload);
            
            if (!user) {
                console.log('❌ UserValidator returned null/undefined');
                throw new UnauthorizedException("Token tidak valid: user tidak ditemukan");
            }
            
            console.log('✅ User validation successful:', {
                id_anggota: user.id_anggota,
                role: user.role,
                panggilan: user.panggilan
            });
            
            return user;
        } catch (error) {
            console.error('❌ User validation failed:', error);
            
            if (error instanceof UnauthorizedException) {
                throw error;
            }
            
            throw new UnauthorizedException("Token tidak valid: validasi user gagal");
        }
    }
}