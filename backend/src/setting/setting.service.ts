import { BadRequestException, Injectable, InternalServerErrorException, UnauthorizedException } from "@nestjs/common";
import { PrismaService } from "../prisma/prisma.service";
import { FungsionalArrayDto } from "./dto/add.dto";
import { JabatanArrayDto } from "./dto/add-jabatan.dto";

@Injectable()
export class SettingService {
    constructor(
        private readonly prisma: PrismaService
    ) {}

    async addPeriodeFungsional(dto: FungsionalArrayDto, id_periode: string, role: string, id_jabatan: string, id_pengurus: string) {
        try {
            
            if (!dto.data || dto.data.length === 0) {
                throw new BadRequestException("Data tidak boleh kosong");
            }

            const pengurus = await this.prisma.pengurus.findFirst({
                where: {
                    id_pengurus: id_pengurus
                }, 
                select: {
                    id_periode: true,
                    member_fungsional: {
                        select: {
                            id_periode_jabatan: true
                        }
                    }
                }
            });

            if (!pengurus) {
                throw new UnauthorizedException("Pengurus tidak ditemukan");
            }

            
            if (role !== 'superadmin') {
                if (pengurus.id_periode !== id_periode) {
                    throw new UnauthorizedException("Anda tidak memiliki akses untuk periode ini");
                }
                
                const hasAccess = pengurus.member_fungsional.some(p => p.id_periode_jabatan === id_jabatan);
                if (!hasAccess) {
                    throw new UnauthorizedException("Anda tidak memiliki akses untuk fitur ini");
                }
            }

            
            const existingData = await this.prisma.periode_fungsional.findMany({
                where: {
                    id_periode: id_periode,
                    id_fungsional: {
                        in: dto.data.map(item => item.id_fungsional)
                    }
                }
            });

            if (existingData.length > 0) {
                
                await this.prisma.periode_fungsional.deleteMany({
                    where: {
                        id_periode: id_periode,
                        id_fungsional: {
                            in: dto.data.map(item => item.id_fungsional)
                        }
                    }
                });
            }

            const newPeriode = await this.prisma.periode_fungsional.createMany({
                data: dto.data.map((item) => ({
                    id_periode_fungsional: `${item.id_fungsional}-${id_periode}-f`,
                    id_fungsional: item.id_fungsional,
                    id_periode: id_periode,
                    tipe: item.kategori,
                })),
                skipDuplicates: true 
            });

            return {
                success: true,
                message: "Data berhasil disimpan",
                count: newPeriode.count
            };

        } catch (error) {
            console.error("Error addPeriodeFungsional:", error);
            
            if (error instanceof BadRequestException || error instanceof UnauthorizedException) {
                throw error;
            }
            
            throw new InternalServerErrorException("Terjadi kesalahan pada server");
        }
    }

    async addPeriodeJabatan(dto: JabatanArrayDto, id_periode: string, role: string, id_jabatan: string, id_pengurus: string) {
        try {
            
            if (!dto.data || dto.data.length === 0) {
                throw new BadRequestException("Data tidak boleh kosong");
            }

            const pengurus = await this.prisma.pengurus.findFirst({
                where: {
                    id_pengurus: id_pengurus
                }, 
                select: {
                    id_periode: true,
                    member_fungsional: {
                        select: {
                            id_periode_jabatan: true
                        }
                    }
                }
            });

            if (!pengurus) {
                throw new UnauthorizedException("Pengurus tidak ditemukan");
            }

            
            if (role !== 'superadmin') {
                if (pengurus.id_periode !== id_periode) {
                    throw new UnauthorizedException("Anda tidak memiliki akses untuk periode ini");
                }
                
                const hasAccess = pengurus.member_fungsional.some(p => p.id_periode_jabatan === id_jabatan);
                if (!hasAccess) {
                    throw new UnauthorizedException("Anda tidak memiliki akses untuk fitur ini");
                }
            }

            
            const existingData = await this.prisma.periode_jabatan.findMany({
                where: {
                    id_periode: id_periode,
                    id_jabatan: {
                        in: dto.data.map(item => item.id_jabatan)
                    }
                }
            });

            if (existingData.length > 0) {
                
                await this.prisma.periode_jabatan.deleteMany({
                    where: {
                        id_periode: id_periode,
                        id_jabatan: {
                            in: dto.data.map(item => item.id_jabatan)
                        }
                    }
                });
            }

            const newPeriode = await this.prisma.periode_jabatan.createMany({
                data: dto.data.map((item) => ({
                    id_periode_jabatan: `${item.id_jabatan}-${id_periode}-j`,
                    id_jabatan: item.id_jabatan,
                    id_periode: id_periode,
                    is_inti: item.is_inti,
                    is_presidium: item.is_presidium
                })),
                skipDuplicates: true 
            });

            return {
                success: true,
                message: "Data berhasil disimpan",
                count: newPeriode.count
            };

        } catch (error) {
            console.error("Error addPeriodeFungsional:", error);
            
            if (error instanceof BadRequestException || error instanceof UnauthorizedException) {
                throw error;
            }
            
            throw new InternalServerErrorException("Terjadi kesalahan pada server");
        }
    }
}