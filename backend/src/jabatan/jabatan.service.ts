import { Injectable, InternalServerErrorException, UnauthorizedException } from "@nestjs/common";
import { PrismaService } from "../prisma/prisma.service";
import { CreateJabatanDto } from "./dto/create-jabatan.dto";
import { toTitleCase } from "../utils/titlecase";
import { failed, success } from "../utils/response";

@Injectable()
export class JabatanService{
    constructor(
        private prisma: PrismaService
    ){}
    
    async getJabatan(){
        try {
            const all = await this.prisma.jabatan.findMany();
            return all;
        } catch (error) {
            if(!(error instanceof Error)){
                throw new InternalServerErrorException("Kesalahan pada server");
            }
            throw error;
        }
    }
    
    async getAllJabatan(id_periode: string) {
        try {
            const cek_periode = await this.prisma.periode.findFirst({
                where: {id_periode},
                select: {
                    status_periode: true
                }
            })
            
            if(cek_periode?.status_periode !== 'on_going'){
                throw new UnauthorizedException("Periode selain yang sedang berlangsung tidak boleh mengubah data")
            }
            
            const all = await this.prisma.jabatan.findMany({
                where: {
                    periode_jabatan: {
                        none: {
                            id_periode: id_periode
                        }
                    }
                },
                select: {
                    id_jabatan: true,
                    jabatan: true
                }
            })
            
            return all;
            
        } catch (error) {
            if (!(error instanceof Error)) {
                throw new InternalServerErrorException("Kesalahan pada server");
            }
            throw error;
        }
    }
    
    async getSelectedJabatan(id_periode:string){
        try {
            const cek_periode = await this.prisma.periode.findFirst({
                where: {id_periode},
                select: {
                    status_periode: true
                }
            })
            
            if(cek_periode?.status_periode !== 'on_going'){
                throw new UnauthorizedException("Periode selain yang sedang berlangsung tidak boleh mengubah data")
            }
            
            const all = await this.prisma.periode_jabatan.findMany({
                where: {
                    id_periode: id_periode
                },
                select: {
                    id_jabatan: true,
                    is_inti: true,
                    is_presidium: true,
                    jabatan: {
                        select: {
                            jabatan: true
                        }
                    }
                }
            });
            
            const result = all.map(item => ({
                id_jabatan: item.id_jabatan,
                jabatan: item.jabatan!.jabatan,
                is_inti: item.is_inti,
                is_presidium: item.is_presidium
            }));
            
            const specialOrder = ["kahim", "wakahim", "sekum", "bendum"];
            
            const sorted = result.sort((a, b) => {
                const aIndex = specialOrder.indexOf(a.id_jabatan!);
                const bIndex = specialOrder.indexOf(b.id_jabatan!);
                
                if (aIndex !== -1 && bIndex !== -1) {
                    return aIndex - bIndex; 
                }
                if (aIndex !== -1) return -1; 
                if (bIndex !== -1) return 1;  
                
                const aPriority = a.is_inti ? 1 : a.is_presidium ? 2 : 3;
                const bPriority = b.is_inti ? 1 : b.is_presidium ? 2 : 3;
                
                return aPriority - bPriority;
            });
            
            return sorted;
        } catch (error) {
            if (!(error instanceof Error)) {
                throw new InternalServerErrorException("Kesalahan pada server");
            }
            throw error;
        }
    }

    async deleteInti(id:string, id_periode:string){
        try {
            const cek_periode = await this.prisma.periode.findFirst({
                where: {id_periode},
                select: {
                    status_periode: true
                }
            })
            
            if(cek_periode?.status_periode !== 'on_going'){
                throw new UnauthorizedException("Periode selain yang sedang berlangsung tidak boleh mengubah data")
            }

            const id_periode_jabatan = `${id}-${id_periode}-j`;
            await this.prisma.periode_jabatan.update({
                where: {id_periode_jabatan},
                data: {
                    is_inti: false
                }
            })

            return true;
        } catch (error) {
            if (!(error instanceof Error)) {
                throw new InternalServerErrorException("Kesalahan pada server");
            }
            throw error;
        }
    }

    async deletePres(id:string, id_periode:string){
        try {
            const cek_periode = await this.prisma.periode.findFirst({
                where: {id_periode},
                select: {
                    status_periode: true
                }
            })
            
            if(cek_periode?.status_periode !== 'on_going'){
                throw new UnauthorizedException("Periode selain yang sedang berlangsung tidak boleh mengubah data")
            }

            const id_periode_jabatan = `${id}-${id_periode}-j`;
            await this.prisma.periode_jabatan.update({
                where: {id_periode_jabatan},
                data: {
                    is_presidium: false
                }
            })

            return true;
        } catch (error) {
            if (!(error instanceof Error)) {
                throw new InternalServerErrorException("Kesalahan pada server");
            }
            throw error;
        }
    }

    async delete(id:string, id_periode:string){
        try {
            const cek_periode = await this.prisma.periode.findFirst({
                where: {id_periode},
                select: {
                    status_periode: true
                }
            })
            
            if(cek_periode?.status_periode !== 'on_going'){
                throw new UnauthorizedException("Periode selain yang sedang berlangsung tidak boleh mengubah data")
            }

            const id_periode_jabatan = `${id}-${id_periode}-j`;
            await this.prisma.periode_jabatan.delete({
                where: {
                    id_periode_jabatan
                }
            })

            return true;
        } catch (error) {
            if (!(error instanceof Error)) {
                throw new InternalServerErrorException("Kesalahan pada server");
            }
            throw error;
        }
    }
    
    async add(dto:CreateJabatanDto){
        try {
            const cek = await this.prisma.jabatan.findFirst({
                where: {
                    OR : [
                        {id_jabatan: dto.id_jabatan},
                        {jabatan: toTitleCase(dto.jabatan)}
                    ]
                }
            })
            
            if(cek){
                return failed("Jabatan sudah didaftarkan")
            }
            
            const newJabatan = await this.prisma.jabatan.create({
                data: {
                    id_jabatan: dto.id_jabatan,
                    jabatan: toTitleCase(dto.jabatan)
                }
            })
            
            return success("Berhasil menambahkan jabatan", newJabatan)
        } catch (error) {
            return failed("Gagal menambahkan jabatan", error)
        }
    }
}