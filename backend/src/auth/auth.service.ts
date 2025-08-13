import { HttpException, HttpStatus, Injectable, InternalServerErrorException, UnauthorizedException } from "@nestjs/common";
import { PrismaService } from "../prisma/prisma.service";
import { StartDto } from "./dto/register.dto";
import { failed, success } from "../utils/response";
import { formatPrimaryKey, toTitleCase } from "../utils/titlecase";
import * as bcrypt from 'bcrypt';
import { jwtPayload } from "./interfaces/payload.interface";
import { JwtTokenUtil } from "../utils/jwt-token";
import { CookieService } from "../utils/token-cookies";
import { Request, Response } from "express";
import { NewPeriodLoginDto } from "./dto/new-period.dto";
import { LoginDto } from "./dto/login.dto";
import { StandardResponse, TokenResponse } from "src/interfaces/standardResponse.interface";

@Injectable()
export class AuthService{
    constructor(
        private prisma:PrismaService,
        private jwtTokenUtil: JwtTokenUtil,
        private cookieService: CookieService
    ){}

    async LoginNewPeriode(dto: NewPeriodLoginDto, res: Response) {
        const id_anggota = formatPrimaryKey(dto.no_hima);

        const cek = await this.prisma.anggota.findUnique({
            where: { id_anggota: id_anggota },
            select: {
                id_anggota:true,
                no_hima: true,
                sandi: true,
                nim: true,
                panggilan:true,
                pengurus: { select: { id_periode: true } }
            }
        });

        if (!cek) {
            throw new UnauthorizedException("Anggota tidak terdaftar");
        }

        const cek2 = await this.prisma.pengurus.findUnique({
            where:{
                id_anggota_id_periode: {
                    id_anggota: id_anggota,
                    id_periode: dto.periode_id
                }
            }
        })

        if(cek2){
            throw new UnauthorizedException("Kepengurusan sudah pernah anda buka")
        }

        if(dto.periode_id === dto.id_periode){
            const pwMatched = await bcrypt.compare(dto.password, cek.sandi);
            if (!pwMatched) {
                throw new UnauthorizedException("Password tidak sesuai");
            }

            try {
                await this.prisma.pengurus.create({
                    data: {
                        id_anggota: id_anggota,
                        id_periode: dto.id_periode,
                        id_jabatan: 'inti',
                        id_divisi: 'KAHIM'
                    }
                });

                await this.prisma.anggota.update({
                    where: { id_anggota: id_anggota },
                    data: { role: 'superadmin' }
                });
            } catch (error) {
                console.error("Gagal memperbarui periode pengurus atau role baru : ", error);
                throw new HttpException('Kesalahan saat memperbarui data', HttpStatus.CONFLICT);
            }

            const payload: jwtPayload = {
                id_anggota: id_anggota,
                no_hima: cek.no_hima,
                nim: cek.nim,
                panggilan: cek.panggilan,
                role: 'superadmin',
                id_divisi: 'KAHIM',
                id_jabatan: 'inti',
                id_periode: dto.id_periode 
            };

            const token = await this.jwtTokenUtil.generateTokens(payload);
            this.cookieService.setAccessToken(res, token.access_token, token.refresh_token);

            return { message: 'Login periode baru berhasil' };
        } else {
            throw new UnauthorizedException("Periode yang diizinkan dibuka hanya dari token aktivasi")
        }        
    }

    async LoginUser(dto:LoginDto, res: Response) {
        try {
            const id_anggota = formatPrimaryKey(dto.no_hima);

            const cek = await this.prisma.anggota.findUnique({
                where: { id_anggota: id_anggota },
                select: {
                    id_anggota:true,
                    no_hima: true,
                    role:true,
                    sandi: true,
                    nim: true,
                    panggilan:true,
                    pengurus: {
                        select: {
                            id_divisi:true,
                            id_jabatan:true,
                            id_periode:true
                        }
                    }
                }
            });

            if (!cek) {
                throw new UnauthorizedException("Anggota tidak terdaftar");
            }

            const cek2 = await this.prisma.pengurus.findUnique({
                where:{
                    id_anggota_id_periode: {
                        id_anggota: id_anggota,
                        id_periode: dto.periode_id
                    }
                }
            })

            if(!cek2){
                throw new UnauthorizedException("Kepengurusan tidak sesuai dengan yang terdaftar")
            }

            const pwMatched = await bcrypt.compare(dto.password, cek.sandi);
            
            if (!pwMatched) {
                throw new UnauthorizedException("Password tidak sesuai");
            }

            const detailUser = cek.pengurus[0];

            const payload: jwtPayload = {
                id_anggota: cek.id_anggota,
                no_hima: cek.no_hima,
                nim: cek.nim,
                role: cek.role,
                panggilan: cek.panggilan,
                id_divisi: detailUser.id_divisi,
                id_jabatan: detailUser.id_jabatan,
                id_periode: detailUser.id_periode
            };

            const token = await this.jwtTokenUtil.generateTokens(payload);
            this.cookieService.setAccessToken(res, token.access_token, token.refresh_token);

            return { message: 'Login periode baru berhasil' };
        } catch (error) {
            if(!(error instanceof Error)){
                console.error("Kesalahan pada server : ", error);
                throw new InternalServerErrorException("Terjadi kesalahan pada server")
            }
            throw error;
        }
    }


    // async register(dto:StartDto, res: Response){
    //     try {
    //         const cek_token = await this.prisma.periode.findUnique({
    //             where: {token_transisi: dto.token_transisi},
    //             select: {
    //                 id_periode:true
    //             }
    //         })

    //         if(!cek_token){
    //             return failed("Token tidak valid")
    //         }

    //         const cek_anggota = await this.prisma.anggota.findUnique({
    //             where: {no_hima: dto.no_hima}
    //         })

    //         if(cek_anggota){
    //             return failed("Akun Anda sudah terdaftar. Silahkan login")
    //         }

    //         if(dto.sandi !== dto.konfirmasi_sandi){
    //             return failed("Sandi tidak sesuai")
    //         }

    //         const hashedpw = await bcrypt.hash(dto.sandi, 12);

    //         const newKahim = await this.prisma.anggota.create({
    //             data: {
    //                 no_hima: dto.no_hima,
    //                 nim: dto.nim,
    //                 nama: toTitleCase(dto.nama),
    //                 panggilan: toTitleCase(dto.panggilan),
    //                 sandi: hashedpw,
    //                 role: 'superadmin'
    //             }
    //         })

    //         const newPengurus = await this.prisma.pengurus.create({
    //             data: {
    //                 no_hima: dto.no_hima,
    //                 id_periode: cek_token.id_periode,
    //                 id_jabatan: 'inti',
    //                 id_divisi: 'KAHIM'
    //             }
    //         })

    //         const payload: jwtPayload = {
    //             no_hima: dto.no_hima,
    //             nim: dto.nim,
    //             role: 'superadmin',
    //             id_periode: cek_token.id_periode,
    //             id_divisi: 'KAHIM',
    //             id_jabatan: 'inti'
    //         }

    //         const tokens = await this.jwtTokenUtil.generateTokens(payload);
    //         this.cookieService.setAccessToken(res, tokens.access_token, tokens.refresh_token)

    //         await this.prisma.periode.update({
    //             where: {token_transisi: dto.token_transisi},
    //             data: {token_transisi: 'done'}
    //         })

    //         return success("Kepengurusan baru HMSI berhasil dibuka", [newKahim, newPengurus])
    //     } catch (error) {
    //         return failed("Gagal membuka kepengurusan baru", error)
    //     }
    // }

    async refreshToken(request: Request, response:Response):Promise<StandardResponse<TokenResponse>>{
        try {
            const refresh_token = this.cookieService.getRefreshToken(request);
            if(!refresh_token){
                throw new UnauthorizedException("Refresh token tidak ditemukan")
            }

            const payload = this.jwtTokenUtil.verifyToken(refresh_token);

            const user = await this.prisma.anggota.findUnique({
                where: {id_anggota: payload.id_anggota},
                select: {
                    id_anggota:true,
                    no_hima:true,
                    nim:true,
                    role:true,
                    panggilan: true,
                    pengurus: {
                        select: {
                            id_periode:true,
                            id_divisi:true,
                            id_jabatan:true
                        }
                    }
                }
            })

            if(!user){
                throw new UnauthorizedException("Pengguna tidak ditemukan")
            }

            const pengurus = user.pengurus[0];

            const newPayload: jwtPayload = {
                id_anggota: user.id_anggota,
                no_hima: user.no_hima,
                nim: user.nim,
                role: user.role,
                panggilan: user.panggilan,
                id_periode: pengurus?.id_periode,
                id_divisi: pengurus?.id_divisi,
                id_jabatan: pengurus?.id_jabatan
            }


            const tokens = await this.jwtTokenUtil.generateTokens(newPayload);
            this.cookieService.setAccessToken(response, tokens.access_token, tokens.refresh_token)

            return {
                status: 'success',
                message: 'Token refreshed successfully',
                data: {
                    accessToken: tokens.access_token,
                    refreshToken: tokens.refresh_token,
                },
            };
        } catch (error) {
            this.cookieService.clearTokens(response);
            if(error instanceof UnauthorizedException){
                return failed(error.message)
            }
            return failed("Gagal memperbarui token: ", error)
        }
    }
}