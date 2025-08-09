import { Injectable } from "@nestjs/common";
import { PrismaService } from "../prisma/prisma.service";
import { CreatePeriodeDto } from "./dto/create-periode.dto";
import { failed, success } from "../utils/response";

@Injectable()
export class PeriodeService{
    constructor(
        private prisma:PrismaService
    ){}

    async add(body:CreatePeriodeDto){
        try {
            const id_periode = `${body.start_year}${body.end_year}`;
            const check_periode = await this.prisma.periode.findUnique({
                where: {
                    id_periode: id_periode
                }
            })

            if(check_periode){
                return failed("Periode sudah ada")
            }

            const new_period = await this.prisma.periode.create({
                data: {
                    id_periode: id_periode,
                    start_year: body.start_year,
                    end_year: body.end_year,
                    status_periode: 'berlangsung'
                }
            })

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

}