import { BadRequestException, Injectable, InternalServerErrorException, UnauthorizedException } from "@nestjs/common";
import { PrismaService } from "../prisma/prisma.service";
import { AddVisiDto } from "./dto/addvisi.dto";

@Injectable()
export class VisiService{
    constructor(
        private readonly prisma:PrismaService
    ){}

    async addVisi(dto: AddVisiDto, role: string, id_periode: string, id_jabatan: string, id_divisi: string) {
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

            if(periode!.status_periode !== "on going"){
                throw new UnauthorizedException("Periode saat ini sedang tidak aktif");    
            }

            if (role !== "superadmin") {
                throw new BadRequestException("Hanya superadmin yang boleh mengubah visi");
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
                throw new BadRequestException("Visi hanya boleh diisi oleh kahim");
            }

            const existingVisi = await this.prisma.visi.findFirst({ where: { id_periode } });
            if (existingVisi) {
                throw new BadRequestException("Visi hanya dapat diisi sekali untuk periode ini");
            }

            const result = await this.prisma.visi.create({
                data: { visi: dto.visi, id_periode }
            });

            return {
                ...result,
                id_visi: result.id_visi.toString() 
            };
        } catch (error) {
            console.error("error nya di sini : ", error);
            throw error instanceof Error
                ? error
                : new InternalServerErrorException("Terjadi kesalahan pada server");
        }
    }

    async getVisi(id_periode:string){
        try {
            const visi = await this.prisma.visi.findMany({
                where: {
                    id_periode: id_periode
                }
            })

            const visiFormatted = visi.map(item => ({
                ...item,
                id_visi: item.id_visi.toString()
            }));

            return visiFormatted;
        } catch (error) {
            console.error("error nya di sini : ", error);
            throw error instanceof Error
                ? error
                : new InternalServerErrorException("Terjadi kesalahan pada server");
        }
    }

}