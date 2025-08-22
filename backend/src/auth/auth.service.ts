import { HttpException, HttpStatus, Injectable, InternalServerErrorException, UnauthorizedException } from "@nestjs/common";
import { PrismaService } from "../prisma/prisma.service";
import { failed, success } from "../utils/response";
import { formatPrimaryKey, toTitleCase, toUpperCase } from "../utils/titlecase";
import * as bcrypt from 'bcrypt';
import { jwtPayload } from "./interfaces/payload.interface";
import { JwtTokenUtil } from "../utils/jwt-token";
import { CookieService } from "../utils/token-cookies";
import { Request, Response } from "express";
import { NewPeriodLoginDto } from "./dto/new-period.dto";
import { LoginDto } from "./dto/login.dto";
import { StandardResponse, TokenResponse } from "src/interfaces/standardResponse.interface";
import { UserValidator } from "../validators/user-auth.validator";

@Injectable()
export class AuthService{
    constructor(
        private prisma:PrismaService,
        private jwtTokenUtil: JwtTokenUtil,
        private cookieService: CookieService,
        private userValidator: UserValidator
    ){}

    async LoginNewPeriode(dto: NewPeriodLoginDto, res: Response) {
        const nohima = formatPrimaryKey(dto.no_hima);
        const nim = await this.prisma.anggota.findFirst({
            where: {
                nohima: toUpperCase(dto.no_hima)
            }, select: {
                nim: true
            }
        })

        const id_anggota = `${nohima}-${nim?.nim}`;

        const cek = await this.prisma.anggota.findUnique({
            where: { id_anggota },
            select: {
            id_anggota: true,
            panggilan: true,
            sandi: true,
            pengurus: {
                select: {
                id_pengurus: true,
                id_periode: true,
                role: true,
                status_pengurus: true,
                periode: { select: { status_periode: true } },
                member_fungsional: {
                    select: {
                    id_periode_fungsional: true,
                    id_periode_jabatan: true,
                    },
                },
                },
            },
            },
        });

        if (!cek) throw new UnauthorizedException('User tidak ditemukan');

        const jabatan = cek.pengurus?.find(p =>
            p.member_fungsional?.some(q => q.id_periode_jabatan === 'kahim')
        );

        const cek2 = await this.prisma.pengurus.findFirst({
            where: {
            id_anggota: id_anggota,
            id_periode: dto.id_periode,
            },
            select: {
            role: true,
            status_pengurus: true,
            },
        });

        const cek3 = await this.prisma.periode.findUnique({
            where: { id_periode: dto.id_periode },
            select: { status_periode: true },
        });

        if (!jabatan &&
            cek2?.role !== 'superadmin' &&
            cek2?.status_pengurus !== 'aktif' &&
            cek3?.status_periode !== 'on_going') {
            throw new UnauthorizedException(
            "Anda tidak memiliki akses untuk membuka periode kepengurusan"
            );
        }

        if (dto.periode_id !== dto.id_periode) {
            throw new UnauthorizedException(
            "Periode yang diizinkan dibuka hanya dari token aktivasi"
            );
        }

        const pwMatched = await bcrypt.compare(dto.password, cek.sandi!);
        if (!pwMatched) throw new UnauthorizedException('Password tidak sesuai');

        const payload: jwtPayload = await this.userValidator.userValidation({
            id_anggota: cek.id_anggota
        })

        const token = await this.jwtTokenUtil.generateTokens(payload);
        this.cookieService.setAccessToken(
            res,
            token.access_token,
            token.refresh_token
        );

        return { message: 'Login periode baru berhasil' };
        }


    async LoginUser(dto: LoginDto, res: Response) {
        try {
            console.log('🚀 === LOGIN PROCESS DEBUG ===');
            console.log('📋 Request URL:', res.req.url);
            console.log('📋 Request Origin:', res.req.headers.origin);
            console.log('📋 Request Headers:', {
                'content-type': res.req.headers['content-type'],
                'user-agent': res.req.headers['user-agent']?.substring(0, 50) + '...',
                'origin': res.req.headers.origin,
                'referer': res.req.headers.referer
            });

            const nohima = formatPrimaryKey(dto.no_hima);
            console.log('🔍 Formatted no_hima:', nohima);
            
            const nim = await this.prisma.anggota.findFirst({
                where: { nohima: toUpperCase(dto.no_hima) },
                select: { nim: true }
            });

            if (!nim) {
                console.log('❌ NIM not found for no_hima:', dto.no_hima);
                throw new UnauthorizedException('User tidak ditemukan');
            }

            const id_anggota = `${nohima}-${nim?.nim}`;
            console.log('🔍 Generated id_anggota:', id_anggota);

            const cek = await this.prisma.anggota.findUnique({
                where: { id_anggota },
                select: {
                    id_anggota: true,
                    panggilan: true,
                    sandi: true,
                    pengurus: {
                        select: {
                            id_pengurus: true,
                            id_periode: true,
                            role: true,
                            status_pengurus: true,
                            periode: { select: { status_periode: true } },
                            member_fungsional: {
                                select: {
                                    id_periode_fungsional: true,
                                    id_periode_jabatan: true,
                                },
                            },
                        },
                    },
                },
            });

            if (!cek) {
                console.log('❌ User not found in database:', id_anggota);
                throw new UnauthorizedException('User tidak ditemukan');
            }

            console.log('✅ User found:', {
                id_anggota: cek.id_anggota,
                panggilan: cek.panggilan,
                pengurus_count: cek.pengurus?.length || 0
            });

            const activePengurus = cek.pengurus?.find(
                p => p.status_pengurus === 'aktif' && p.periode?.status_periode === 'on_going'
            );

            if (!activePengurus) {
                console.log('❌ No active pengurus found for user:', id_anggota);
                console.log('📋 Available pengurus:', cek.pengurus?.map(p => ({
                    id_pengurus: p.id_pengurus,
                    status_pengurus: p.status_pengurus,
                    status_periode: p.periode?.status_periode
                })));
                throw new UnauthorizedException('Anda tidak memiliki akses ke sistem');
            }

            console.log('✅ Active pengurus found:', {
                id_pengurus: activePengurus.id_pengurus,
                role: activePengurus.role,
                id_periode: activePengurus.id_periode
            });

            const pwMatched = await bcrypt.compare(dto.password, cek.sandi!);
            if (!pwMatched) {
                console.log('❌ Password mismatch for user:', id_anggota);
                throw new UnauthorizedException('Password tidak sesuai');
            }

            console.log('✅ Password verified');

            const payload: jwtPayload = await this.userValidator.userValidation({
                id_anggota: cek.id_anggota
            });

            console.log('✅ User validation completed:', payload);

            const token = await this.jwtTokenUtil.generateTokens(payload);
            
            console.log('🔑 Tokens generated:', {
                access_token_length: token.access_token.length,
                refresh_token_length: token.refresh_token.length,
                access_token_preview: token.access_token.substring(0, 30) + '...',
                refresh_token_preview: token.refresh_token.substring(0, 30) + '...'
            });

            // Set cookies dengan detailed logging
            console.log('🍪 Setting cookies...');
            console.log('🍪 Environment:', process.env.NODE_ENV);
            console.log('🍪 Is Production:', process.env.NODE_ENV === 'production');
            
            this.cookieService.setAccessToken(
                res,
                token.access_token,
                token.refresh_token
            );

            console.log('🍪 Cookies set successfully');
            
            // Log response headers untuk debugging
            console.log('📤 Response headers will include:', {
                'Set-Cookie': res.getHeaders()['set-cookie'] || 'Not set yet'
            });

            const response = { 
                message: 'Login periode baru berhasil',
                user: {
                    id_anggota: cek.id_anggota,
                    panggilan: cek.panggilan,
                    role: activePengurus.role
                },
                debug_info: {
                    cookies_set: true,
                    environment: process.env.NODE_ENV,
                    timestamp: new Date().toISOString()
                }
            };

            console.log('✅ Login successful, sending response:', response);
            return response;

        } catch (error) {
            console.error('❌ Login error:', {
                message: error.message,
                stack: error.stack,
                type: error.constructor.name
            });

            if (!(error instanceof Error)) {
                console.error('Kesalahan pada server : ', error);
                throw new InternalServerErrorException('Terjadi kesalahan pada server');
            }
            throw error;
        }
    }

    async refreshToken(request: Request, response: Response): Promise<StandardResponse<TokenResponse>> {
        try {
            const refresh_token = this.cookieService.getRefreshToken(request);
            if (!refresh_token) {
                throw new UnauthorizedException("Refresh token tidak ditemukan");
            }

            const decoded = this.jwtTokenUtil.verifyToken(refresh_token);

            const payload: jwtPayload = await this.userValidator.userValidation({
                id_anggota: decoded.id_anggota,
            });

            const tokens = await this.jwtTokenUtil.generateTokens(payload);

            this.cookieService.setAccessToken(
                response,
                tokens.access_token,
                tokens.refresh_token
            );

            return {
                status: "success",
                message: "Token refreshed successfully",
                data: {
                    accessToken: tokens.access_token,
                    refreshToken: tokens.refresh_token,
                },
            };
        } catch (error) {
            this.cookieService.clearTokens(response);

            if (error instanceof UnauthorizedException) {
                return failed(error.message);
            }

            console.error("Refresh token error:", error);
            return failed(`Gagal memperbarui token: ${error}`);
        }
    }


}