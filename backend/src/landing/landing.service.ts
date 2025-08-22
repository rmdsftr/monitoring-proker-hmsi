import { Injectable, InternalServerErrorException } from "@nestjs/common";
import { PrismaService } from "../prisma/prisma.service";

@Injectable()
export class LandingService{
    constructor(
        private readonly prisma: PrismaService
    ){}

    async getVisiMisi() {
        try {
            const cek = await this.prisma.periode.findFirst({
                where: { status_periode: 'on_going' },
                select: {
                    id_periode: true,
                    periode: true
                }
            });
            
            const periode = cek?.periode;
            console.log("periode : ", periode);
            const id_periode = cek?.id_periode;

            const visi = await this.prisma.visi.findFirst({
                where: { id_periode },
                select: { visi: true }
            });
            console.log('visi:', visi);

            const misi = await this.prisma.misi.findMany({
                where: { id_periode },
                select: { misi: true }
            });
            console.log('misi:', misi);

            return { visi, misi, periode };

        } catch (error) {
            console.error("error nya di sini : ", error);
            throw error;
        }
    }

}