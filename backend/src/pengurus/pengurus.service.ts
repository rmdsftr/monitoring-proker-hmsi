import { BadRequestException, Injectable, InternalServerErrorException } from "@nestjs/common";
import { PrismaService } from "../prisma/prisma.service";
import { formatPrimaryKey, toTitleCase, toUpperCase } from "../utils/titlecase";
import { AddPengurusDto } from "./dto/add.dto";
import * as bcrypt from 'bcrypt';
import { EditPengurusDto } from "./dto/edit.dto";
import { SupabaseService } from "../supabase/supabase.service";
import { sanitizeFileName } from "src/utils/sanitize";

@Injectable()
export class PengurusService{
    constructor(
        private readonly prisma:PrismaService,
        private readonly supabaseService: SupabaseService
    ){}

    async getPengurus(id_periode:string){
        try {
            const data = await this.prisma.pengurus.findMany({
                where: {id_periode: id_periode},
                select: {
                    anggota: {
                        select: {
                            id_anggota: true,
                            nama: true,
                            nohima: true,
                            nim: true,
                            panggilan: true,                            
                        }
                    },
                }
            })

            return data;
        } catch (error) {
            if(!(error instanceof Error)){
                throw new InternalServerErrorException("Terjadi kesalahan pada serveer");
            }
            throw error;
        }
    }

    // async addPengurus(dto: AddPengurusDto, id_periode: string, id_jabatan: string) {
    //     try {
    //         if (id_jabatan !== 'inti') {
    //             throw new BadRequestException("Hanya inti yang boleh menambahkan pengurus");
    //         }

    //         const roleMap = { inti: 'superadmin', kadiv: 'admin', sekben: 'admin', sekdiv: 'admin', bendiv: 'admin' };
    //         const role = roleMap[dto.id_jabatan] || 'staff';

    //         const id_anggota = formatPrimaryKey(dto.no_hima);
    //         const nohima = toUpperCase(dto.no_hima).trim();
    //         const name = toTitleCase(dto.nama);
    //         const nick = toTitleCase(dto.panggilan);
    //         const sandi = await bcrypt.hash(dto.nim, 12);

    //         await this.prisma.$transaction(async (prisma) => {
    //             let anggota = await prisma.anggota.findFirst({
    //                 where: {
    //                     id_anggota: id_anggota,
    //                     nim: dto.nim,
    //                     no_hima: nohima
    //                 }
    //             });

    //             if (!anggota) {
    //                 anggota = await prisma.anggota.create({
    //                     data: {
    //                         id_anggota,
    //                         nim: dto.nim,
    //                         no_hima: nohima,
    //                         nama: name,
    //                         panggilan: nick,
    //                         sandi: sandi,
    //                         role: role,
    //                         status_anggota: 'Aktif'
    //                     }
    //                 });
    //             }

    //             const cekPengurus = await prisma.pengurus.findFirst({
    //                 where: {
    //                     AND: {
    //                         id_anggota,
    //                         id_periode
    //                     }
    //                 }
    //             });

    //             if (cekPengurus) {
    //                 throw new BadRequestException("Akun pengurus sudah terdaftar untuk periode ini");
    //             }

    //             const divisiValid = await prisma.divisi.findUnique({
    //                 where: { id_divisi: dto.id_divisi }
    //             });
    //             if (!divisiValid) {
    //                 throw new BadRequestException("Divisi tidak valid");
    //             }

    //             const jabatanValid = await prisma.jabatan.findUnique({
    //                 where: { id_jabatan: dto.id_jabatan }
    //             });
    //             if (!jabatanValid) {
    //                 throw new BadRequestException("Jabatan tidak valid");
    //             }

    //             await prisma.pengurus.create({
    //                 data: {
    //                     id_anggota,
    //                     id_periode,
    //                     id_divisi: dto.id_divisi,
    //                     id_jabatan: dto.id_jabatan
    //                 }
    //             });
    //         });
    //     } catch (error) {
    //         if (!(error instanceof Error)) {
    //             throw new InternalServerErrorException("Terjadi kesalahan pada server");
    //         }
    //         console.error("errornya di sini : ", error);
    //         throw error;
    //     }
    // }

    // async editPengurus(id_anggota:string, dto: EditPengurusDto, foto: Express.Multer.File, id_periode:string){
    //     try {
    //         const pengurus = await this.prisma.pengurus.findFirst({
    //             where: {id_anggota, id_periode},
    //             select: {
    //                 periode: {
    //                     select: {
    //                         status_periode: true
    //                     }
    //                 }
    //             }
    //         })

    //         if(!pengurus || pengurus.periode.status_periode !== 'on going'){
    //             throw new BadRequestException("Hanya dapat mengubah data pengurus pada periode yang sedang berlangsung")
    //         }

    //         let fotoUrl:string | null = null;
    //         if(foto){
    //             const fileName = sanitizeFileName(foto.originalname);
    //             const filePath = `anggota/${Date.now()}-${fileName}`;

    //             await this.supabaseService.uploadToSupabase('hmsi', filePath, foto);
    //             fotoUrl = this.supabaseService.getPublicUrl('hmsi', filePath);

    //             await this.prisma.anggota.update({
    //                 where: {id_anggota},
    //                 data: {
    //                     foto: fotoUrl
    //                 }
    //             })
    //         }

    //         if(dto.status_anggota){
    //             await this.prisma.anggota.update({
    //                 where: {id_anggota},
    //                 data: {status_anggota: dto.status_anggota}
    //             })
    //         }

    //         if(dto.id_divisi || dto.id_jabatan){
    //             await this.prisma.pengurus.update({
    //                 where: {
    //                     id_anggota_id_periode: {
    //                         id_anggota, id_periode
    //                     }
    //                 }, data: {
    //                     id_divisi: dto.id_divisi,
    //                     id_jabatan: dto.id_jabatan
    //                 }
    //             })
    //         }
    //     } catch (error) {
    //         if (!(error instanceof Error)) {
    //             throw new InternalServerErrorException("Terjadi kesalahan pada server");
    //         }
    //         console.error("errornya di sini : ", error);
    //         throw error;
    //     }
    // }

    // async getFotoPengurus(id_anggota: string) {
    //     const userPhoto = await this.prisma.anggota.findUnique({
    //         where: { id_anggota },
    //         select: { foto: true },
    //     });

    //     if (!userPhoto?.foto) {
    //         return { url: null };
    //     }

    //     const publicUrl = this.supabaseService.getPublicUrl('hmsi', userPhoto.foto);
    //     return { url: publicUrl };
    // }
}