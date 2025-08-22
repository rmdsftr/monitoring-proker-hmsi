import { BadRequestException, Injectable, InternalServerErrorException } from "@nestjs/common";
import { PrismaService } from "../prisma/prisma.service";
import { CreatePeriodeDto } from "./dto/create-periode.dto";
import { failed, success } from "../utils/response";
import {v4 as uuidv4} from "uuid"
import { AddNewKahim } from "./dto/new-kahim.dto";
import { formatPrimaryKey, toTitleCase, toUpperCase } from "../utils/titlecase";
import * as bcrypt from "bcrypt";

@Injectable()
export class PeriodeService{
    constructor(
        private prisma:PrismaService
    ){}
    
    async add(body: CreatePeriodeDto) {
        try {
            const check_period = await this.prisma.periode.findFirst({
                where: {
                    start_year: body.start_year,
                    end_year: body.end_year,
                },
                orderBy: { sequence: 'desc' }, 
            });
            
            const sequence = check_period ? check_period.sequence! + 1 : 1;
            
            const id_periode = `${body.start_year}${body.end_year}-${sequence}`;
            
            let periode: string;
            if (body.start_year === body.end_year) {
                periode = `${body.start_year}`;
            } else {
                periode = `${body.start_year}/${body.end_year}`;
            }
            
            const token = uuidv4();
            
            const new_period = await this.prisma.periode.create({
                data: {
                    id_periode,
                    start_year: body.start_year,
                    end_year: body.end_year,
                    sequence,
                    periode,
                    token_transisi: token,
                    status_periode: 'upcoming'
                }
            });
            
            return success("Berhasil menambahkan periode", new_period);
        } catch (error) {
            return failed("Kesalahan pada server", error);
        }
    }
    
    
    async getPeriodeOptions() {
        const list = await this.prisma.periode.findMany({
            select: {
                id_periode: true,
                start_year: true,
                end_year: true
            }
        });
        
        const options = list.map(p => ({
            label: `${p.start_year}/${p.end_year}`,
            value: p.id_periode
        }));
        
        return { options };
    }
    
    async AddNewKahim(dto: AddNewKahim) {
        try {
            const cek = await this.prisma.anggota.findFirst({
                where: {
                    OR: [
                        {nohima: toUpperCase(dto.nohima)},
                        {nim: dto.nim.trim()}
                    ]
                }
            })
            
            if(cek){
                throw new BadRequestException("Akun sudah pernah terdaftar")
            }
            
            const periode = await this.prisma.periode.findFirst({
                where: { status_periode: "upcoming" },
                select: { id_periode: true },
            });
            
            if (!periode) {
                throw new Error("Tidak ada periode mendatang yang ditemukan.");
            }
            
            const id_periode = periode.id_periode;
            
            const id = formatPrimaryKey(dto.nohima);
            const nim = dto.nim.trim();
            const id_anggota = `${id}-${nim}`;
            
            const hashedPassword = await bcrypt.hash(nim, 12);
            
            const result = await this.prisma.$transaction(async (tx) => {
                const anggota = await tx.anggota.create({
                    data: {
                        id_anggota,
                        nama: toTitleCase(dto.nama),
                        panggilan: toTitleCase(dto.panggilan),
                        nohima: toUpperCase(dto.nohima),
                        nim,
                        sandi: hashedPassword,
                    },
                }); 
                
                const id_pengurus = `${id_anggota}-${id_periode}`;
                
                const pengurus = await tx.pengurus.create({
                    data: {
                        id_pengurus,
                        id_anggota,
                        id_periode,
                        role: "superadmin",
                        status_pengurus: "aktif",
                    },
                });
                
                const id_periode_fungsional = `kahim-${id_periode}-f`;
                const periode_fungsional = await tx.periode_fungsional.create({
                    data: {
                        id_periode_fungsional: id_periode_fungsional,
                        id_fungsional: 'kahim',
                        id_periode: id_periode,
                        tipe: 'inti'
                    }
                })
                
                const id_periode_jabatan = `kahim-${id_periode}-j`;
                const periode_jabatan = await tx.periode_jabatan.create({
                    data: {
                        id_periode_jabatan,
                        id_jabatan: 'kahim',
                        id_periode,
                        is_presidium: true,
                        is_inti: true
                    }
                })
                
                const member = await tx.member_fungsional.create({
                    data: {
                        id_periode_fungsional,
                        id_pengurus,
                        id_periode_jabatan
                    }
                })
                
                return { anggota, pengurus, periode_fungsional, periode_jabatan, member };
            });
            
            return result;
        } catch (error) {
            console.error("error nya di sini : ", error);
            throw error instanceof Error
            ? error
            : new InternalServerErrorException("Terjadi kesalahan pada server");
        }
    }
    
    async close(id_periode: string){
        try {
            const stat = await this.prisma.periode.findFirst({
                where: {id_periode: id_periode},
                select: {
                    status_periode: true
                }
            })
            
            if(stat?.status_periode !== 'on_going'){
                throw new BadRequestException("Hanya dapat menutup periode yang sedang berlangsung")
            }
            
            const close = await this.prisma.periode.update({
                where: {
                    id_periode: id_periode
                }, data: {
                    status_periode: 'done',
                    updated_at: new Date()
                }
            })
            
            return close;
        } catch (error) {
            console.error("Gagal menutup kepengurusan:", error);
            throw new Error("Terjadi kesalahan saat menutup kepengurusan");
        }
    }
}