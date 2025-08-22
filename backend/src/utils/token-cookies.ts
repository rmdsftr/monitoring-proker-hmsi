import { Injectable } from "@nestjs/common";
import { Request, Response } from "express";
import { ConfigService } from "@nestjs/config";

@Injectable()
export class CookieService {
    private readonly isProduction: boolean;
    private readonly accessTokenMaxAge: number;
    private readonly refreshTokenMaxAge: number;

    constructor(private configService: ConfigService) {
        this.isProduction = this.configService.get<string>('NODE_ENV') === 'production';
        this.accessTokenMaxAge = 1000 * 60 * 15; // 15 minutes
        this.refreshTokenMaxAge = 1000 * 60 * 60 * 24 * 7; // 7 days
        
        console.log('🍪 CookieService initialized:', {
            isProduction: this.isProduction,
            accessTokenMaxAge: this.accessTokenMaxAge,
            refreshTokenMaxAge: this.refreshTokenMaxAge,
            nodeEnv: this.configService.get<string>('NODE_ENV')
        });
    }

    setAccessToken(res: Response, access_token: string, refresh_token: string): void {
        console.log('🍪 === SETTING COOKIES ===');
        
        // Define sameSite with proper typing
        const sameSiteValue: 'lax' | 'strict' | 'none' = this.isProduction ? 'none' : 'lax';
        
        const cookieOptions = {
            httpOnly: true,
            secure: this.isProduction,
            sameSite: sameSiteValue,
            path: '/'
        };

        console.log('🍪 Base cookie options:', cookieOptions);

        const accessTokenOptions = {
            ...cookieOptions,
            maxAge: this.accessTokenMaxAge
        };

        const refreshTokenOptions = {
            ...cookieOptions,
            maxAge: this.refreshTokenMaxAge
        };

        console.log('🍪 Access token options:', accessTokenOptions);
        console.log('🍪 Refresh token options:', refreshTokenOptions);

        console.log('🔑 Setting access_token cookie (length: ' + access_token.length + ')');
        res.cookie('access_token', access_token, accessTokenOptions);

        console.log('🔑 Setting refresh_token cookie (length: ' + refresh_token.length + ')');
        res.cookie('refresh_token', refresh_token, refreshTokenOptions);

        // Log current response headers
        const headers = res.getHeaders();
        console.log('📤 Current response headers:', {
            'set-cookie': headers['set-cookie'],
            'content-type': headers['content-type']
        });

        // Additional debugging: Check if cookies were actually set
        setTimeout(() => {
            const updatedHeaders = res.getHeaders();
            console.log('📤 Updated response headers after cookie setting:', {
                'set-cookie': updatedHeaders['set-cookie']
            });
        }, 0);

        console.log('✅ Cookies setting completed');
    }

    getAccessToken(req: Request): string | null {
        console.log('🔍 === GETTING ACCESS TOKEN ===');
        console.log('📋 Raw cookie header:', req.headers.cookie || 'NO COOKIES');
        console.log('📋 Parsed cookies object:', req.cookies);
        
        const token = req.cookies?.access_token || null;
        
        if (token) {
            console.log('✅ Access token found (length: ' + token.length + ')');
            console.log('🔑 Token preview:', token.substring(0, 20) + '...');
        } else {
            console.log('❌ Access token not found');
            console.log('📋 Available cookie keys:', req.cookies ? Object.keys(req.cookies) : 'No cookies object');
        }
        
        return token;
    }

    getRefreshToken(req: Request): string | null {
        console.log('🔍 === GETTING REFRESH TOKEN ===');
        
        const token = req.cookies?.refresh_token || null;
        
        if (token) {
            console.log('✅ Refresh token found (length: ' + token.length + ')');
            console.log('🔄 Token preview:', token.substring(0, 20) + '...');
        } else {
            console.log('❌ Refresh token not found');
        }
        
        return token;
    }

    clearTokens(res: Response): void {
        console.log('🧹 === CLEARING TOKENS ===');
        
        const sameSiteValue: 'lax' | 'strict' | 'none' = this.isProduction ? 'none' : 'lax';
        
        const cookieOptions = {
            httpOnly: true,
            secure: this.isProduction,
            sameSite: sameSiteValue,
            path: '/'
        };

        console.log('🧹 Clear cookie options:', cookieOptions);

        res.clearCookie('access_token', cookieOptions);
        res.clearCookie('refresh_token', cookieOptions);
        
        console.log('✅ Tokens cleared');
    }

    // Debug method untuk testing
    debugCookies(req: Request): any {
        return {
            rawCookieHeader: req.headers.cookie,
            parsedCookies: req.cookies,
            availableKeys: req.cookies ? Object.keys(req.cookies) : [],
            hasAccessToken: !!req.cookies?.access_token,
            hasRefreshToken: !!req.cookies?.refresh_token,
            accessTokenPreview: req.cookies?.access_token?.substring(0, 20) + '...',
            refreshTokenPreview: req.cookies?.refresh_token?.substring(0, 20) + '...'
        };
    }
}