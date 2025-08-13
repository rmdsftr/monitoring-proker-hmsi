import { Injectable, InternalServerErrorException } from "@nestjs/common";
import { PrismaService } from "../prisma/prisma.service";
import { CreateDivisiDto } from "./dto/create-divisi.dto";
import { toTitleCase, toUpperCase } from "../utils/titlecase";
import { failed, success } from "../utils/response";

@Injectable()
export class DivisiService{
    constructor(
        private prisma:PrismaService
    ){}

    async getDivisi(){
        try {
            const all = await this.prisma.divisi.findMany({
                where: {is_inti:false},
                select: {
                    id_divisi: true,
                    divisi: true
                }
            })

            return all;
        } catch (error) {
            if(!(error instanceof Error)){
                throw new InternalServerErrorException("Kesalahan pada server");
            }
            throw error;
        }
    }

    async add(dto:CreateDivisiDto){
        try {
            const cek = await this.prisma.divisi.findFirst({
                where: {
                    OR: [
                        {id_divisi: toUpperCase(dto.id_divisi)},
                        {divisi: toTitleCase(dto.divisi)}
                    ]
                }
            })

            if(cek){
                return failed("Divisi sudah ada")
            }

            const newDivisi = await this.prisma.divisi.create({
                data: {
                    id_divisi: toUpperCase(dto.id_divisi),
                    divisi: toTitleCase(dto.divisi)
                }
            })

            return success("Berhasil menambahkan divisi baru", newDivisi)
        } catch (error) {
            return failed("Gagal menambahkan divisi baru : ", error)
        }
    }
}