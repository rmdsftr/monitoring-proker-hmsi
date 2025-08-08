import { Injectable } from "@nestjs/common";
import { PrismaService } from "../prisma/prisma.service";
import { CreateJabatanDto } from "./dto/create-jabatan.dto";
import { toTitleCase } from "../utils/titlecase";
import { failed, success } from "../utils/response";

@Injectable()
export class JabatanService{
    constructor(
        private prisma: PrismaService
    ){}

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