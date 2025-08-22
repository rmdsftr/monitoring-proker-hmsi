import { Injectable, UnauthorizedException } from "@nestjs/common";
import { jwtPayload } from "../auth/interfaces/payload.interface";
import { PrismaService } from "../prisma/prisma.service";
import { formatPrimaryKey } from "src/utils/titlecase";

@Injectable()
export class UserValidator {
    constructor(private prisma: PrismaService) {}

    async validateUser(payload: jwtPayload): Promise<jwtPayload | any> {
        try {
            const id_anggota = formatPrimaryKey(payload.id_anggota);

            const user = await this.prisma.anggota.findUnique({
                where: { id_anggota },
                select: {
                    id_anggota: true,
                    panggilan: true,
                    pengurus: {
                        select: {
                            id_pengurus: true,
                            id_periode: true,
                            role: true,
                            status_pengurus: true,
                            periode: { 
                                select: { 
                                    periode: true,
                                    status_periode: true 
                                } 
                            },
                            member_fungsional: {
                                select: {
                                    id_periode_fungsional: true,
                                    id_periode_jabatan: true,
                                }
                            }
                        }
                    }
                }
            });

            if (!user) throw new UnauthorizedException("User not found");

            const activePengurus = user.pengurus.find(
                p => p.status_pengurus === 'aktif' && p.periode?.status_periode === 'on_going'
            );

            if (!activePengurus) throw new UnauthorizedException("User tidak aktif di periode berjalan");

            const member = activePengurus.member_fungsional?.[0]; 

            // Always ensure these fields exist, even if empty
            const result = {
                id_anggota: user.id_anggota,
                role: activePengurus.role,
                id_pengurus: activePengurus.id_pengurus,
                panggilan: user.panggilan || '',
                id_periode: activePengurus.id_periode,
                periode: activePengurus.periode?.periode || '',
                id_fungsional: member?.id_periode_fungsional || '',
                id_jabatan: member?.id_periode_jabatan || '',
            };

            console.debug('UserValidator result:', result);
            return result;
            
        } catch (error) {
            console.error("Error saat validasi authentikasi:", error);
            throw error; // Re-throw the original error instead of wrapping it
        }
    }

    async userValidation(payload: { id_anggota: string }): Promise<jwtPayload> {
        const id_anggota = formatPrimaryKey(payload.id_anggota);

        const user = await this.prisma.anggota.findUnique({
            where: { id_anggota },
            select: {
                id_anggota: true,
                panggilan: true,
                pengurus: {
                    select: {
                        id_pengurus: true,
                        id_periode: true,
                        role: true,
                        status_pengurus: true,
                        periode: { 
                            select: { 
                                periode: true,
                                status_periode: true 
                            } 
                        },
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

        if (!user) throw new UnauthorizedException("User not found");

        const activePengurus = user.pengurus.find(
            p => p.status_pengurus === "aktif" && p.periode?.status_periode === "on_going"
        );

        if (!activePengurus) throw new UnauthorizedException("User tidak aktif di periode berjalan");

        const member = activePengurus.member_fungsional?.[0];

        // Always ensure these fields exist, even if empty
        const result = {
            id_anggota: user.id_anggota,
            role: activePengurus.role!,
            id_pengurus: activePengurus.id_pengurus,
            panggilan: user.panggilan || '',
            id_periode: activePengurus.id_periode!,
            periode: activePengurus.periode?.periode || '',
            id_fungsional: member?.id_periode_fungsional || '',
            id_jabatan: member?.id_periode_jabatan || '',
        };

        console.debug('UserValidation result:', result);
        return result;
    }
}