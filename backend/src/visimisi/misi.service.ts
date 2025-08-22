import { BadRequestException, Injectable, InternalServerErrorException, UnauthorizedException } from "@nestjs/common";
import { AddMisiDto } from "./dto/addmisi.dto";
import { PrismaService } from "../prisma/prisma.service";
import { EditMisiDto } from "./dto/editmisi.dto";

@Injectable()
export class MisiService{
    constructor(
        private readonly prisma : PrismaService
    ){}

    async AddMisi(dto:AddMisiDto, role:string, id_periode:string, id_jabatan:string, id_divisi:string){
        console.log("log 2 : ", role);
        console.log("log 3 : ", id_periode);
        console.log("log 4 : ", id_divisi);
        console.log("log 5 : ", id_jabatan);
        
        try {
            const periode = await this.prisma.periode.findUnique({
                where: {
                    id_periode: id_periode
                }, select: {
                    status_periode: true
                }
            })

            if(periode!.status_periode !== "on_going"){
                throw new UnauthorizedException("Periode saat ini sedang tidak aktif");    
            }

            if (role !== "superadmin") {
                throw new BadRequestException("Hanya superadmin yang boleh mengubah misi");
            }

            console.log({
                id_divisi,
                divisiType: typeof id_divisi,
                id_jabatan,
                jabatanType: typeof id_jabatan
            });

            console.log(
                `"${id_divisi}" === "KAHIM" =>`, id_divisi === "KAHIM",
                `"${id_jabatan}" === "inti" =>`, id_jabatan === "inti",
                `"${id_jabatan}" === "KAHIM" =>`, id_jabatan === "KAHIM",
                `"${id_divisi}" === "inti" =>`, id_divisi === "inti"
            );

            if (id_divisi !== "KAHIM" || id_jabatan !== "inti") {
                throw new BadRequestException("Misi hanya boleh diisi oleh kahim");
            }

            const result = await this.prisma.misi.create({
                data: { misi: dto.misi, id_periode }
            });

            return {
                ...result,
                id_misi: result.id_misi.toString() 
            };
        } catch (error) {
            console.error("error nya di sini : ", error);
            throw error instanceof Error
                ? error
                : new InternalServerErrorException("Terjadi kesalahan pada server");
        }
    }

    async getMisi(id_periode: string){
        try {
            const misi = await this.prisma.misi.findMany({
                where: {
                    id_periode: id_periode
                }, select: {
                    id_misi: true,
                    misi: true
                }
            })

            const misiFormatted = misi.map(item => ({
                ...item,
                id_misi: item.id_misi.toString()
            }));

            return misiFormatted;
        } catch (error) {
            console.error("error nya di sini : ", error);
            throw error instanceof Error
                ? error
                : new InternalServerErrorException("Terjadi kesalahan pada server");
        }
    }

    async editMisi(id_misi:number, dto:EditMisiDto, id_periode:string){
        try {
            const cek = await this.prisma.misi.findFirst({
                where: { 
                    AND: {
                        id_misi: id_misi,
                        id_periode: id_periode
                    }
                }
            });

            if(!cek){
                throw new BadRequestException("ID misi tidak valid")
            }

            await this.prisma.misi.update({
                where: {id_misi: id_misi},
                data: {
                    misi: dto.misi
                }
            })
        } catch (error) {
            console.error("error nya di sini : ", error);
            throw error instanceof Error
                ? error
                : new InternalServerErrorException("Terjadi kesalahan pada server");
        }
    }

    async deleteMisi(id_misi:number, id_periode:string){
        try {
            const cek = await this.prisma.misi.findFirst({
                where: { 
                    AND: {
                        id_misi: id_misi,
                        id_periode: id_periode
                    }
                }
            });

            if(!cek){
                throw new BadRequestException("ID misi tidak valid")
            }

            await this.prisma.misi.delete({
                where: {id_misi: id_misi}
            })
        } catch (error) {
            console.error("error nya di sini : ", error);
            throw error instanceof Error
                ? error
                : new InternalServerErrorException("Terjadi kesalahan pada server");
        }
    }
}