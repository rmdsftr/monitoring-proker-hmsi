import { BadRequestException, Injectable, InternalServerErrorException, UnauthorizedException } from "@nestjs/common";
import { PrismaService } from "../prisma/prisma.service";
import { CreateDivisiDto } from "./dto/create-divisi.dto";
import { toTitleCase, toUpperCase } from "../utils/titlecase";
import { failed, success } from "../utils/response";

@Injectable()
export class DivisiService{
    constructor(
        private prisma:PrismaService
    ){}
    
    // async getDivisi(){
    //     try {
    //         const all = await this.prisma.fungsional.findMany({
    //             where: {
    //                 tipe: "divisi"
    //             }
    //         })
    
    //         return all;
    //     } catch (error) {
    //         if(!(error instanceof Error)){
    //             throw new InternalServerErrorException("Kesalahan pada server");
    //         }
    //         throw error;
    //     }
    // }
    
    async getAllDivisi(id_periode: string) {
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
            
            const all = await this.prisma.fungsional.findMany({
                where: {
                    periode_fungsional: {
                        none: {
                            id_periode: id_periode
                        }
                    }
                },
                select: {
                    id_fungsional: true,
                    fungsional: true
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
    
    async getSelectedDivisi(id_periode:string){
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
            
            const all = await this.prisma.periode_fungsional.findMany({
                where: {
                    id_periode: id_periode
                },
                select: {
                    id_fungsional: true,
                    tipe: true,
                    fungsional: {
                        select: {
                            fungsional: true
                        }
                    }
                }
            });
            
            const result = all.map(item => ({
                id_fungsional: item.id_fungsional,
                fungsional: item.fungsional!.fungsional,
                tipe: item.tipe
            }));
            
            const specialOrder = ["kahim", "wakahim", "sekum", "bendum"];
            const tipeOrder = { inti: 1, divisi: 2 };
            
            const sorted = result.sort((a, b) => {
                const aIndex = specialOrder.indexOf(a.id_fungsional!);
                const bIndex = specialOrder.indexOf(b.id_fungsional!);
                
                if (aIndex !== -1 && bIndex !== -1) {
                    return aIndex - bIndex; 
                }
                if (aIndex !== -1) return -1; 
                if (bIndex !== -1) return 1;  
                
                return tipeOrder[a.tipe!] - tipeOrder[b.tipe!];
            });
            
            return sorted;
            
        } catch (error) {
            if (!(error instanceof Error)) {
                throw new InternalServerErrorException("Kesalahan pada server");
            }
            throw error;
        }
    }
    
    async deleteSelected(id_periode:string, id:string){
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
            
            const id_periode_fungsional = `${id}-${id_periode}-f`
            
            await this.prisma.periode_fungsional.delete({
                where: {
                    id_periode_fungsional: id_periode_fungsional
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
    
    async add(dto:CreateDivisiDto){
        try {
            const cek = await this.prisma.fungsional.findFirst({
                where: {
                    OR: [
                        {id_fungsional: toUpperCase(dto.id_fungsional)},
                        {fungsional: toTitleCase(dto.fungsional)}
                    ]
                }
            })
            
            if(cek){
                throw new BadRequestException("Fungsional sudah ada")
            }
            
            const newDivisi = await this.prisma.fungsional.create({
                data: {
                    id_fungsional: dto.id_fungsional,
                    fungsional: toTitleCase(dto.fungsional),
                }
            })
            
            return {newDivisi};
        } catch (error) {
            console.error("error nya di sini : ", error);
            throw error instanceof Error
            ? error
            : new InternalServerErrorException("Terjadi kesalahan pada server");
        }
    }
}