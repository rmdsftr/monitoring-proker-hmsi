import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { PrismaService } from "../prisma/prisma.service";
import { VerifyTokenDto } from "./dto/verify.dto";

@Injectable()
export class TokenService{
    constructor(private readonly prisma:PrismaService){}

    async verify(dto:VerifyTokenDto){
        const cek = await this.prisma.periode.findFirst({
            where: {token_transisi: dto.token_transisi},
            select: {
                id_periode: true,
                status_periode: true
            }
        })

        if(cek?.status_periode !== 'upcoming'){
            throw new HttpException("Token tidak bisa digunakan untuk membuka periode", HttpStatus.BAD_REQUEST);
        }

        await this.prisma.periode.update({
            where: {id_periode: cek.id_periode},
            data: {
                status_periode: 'on_going'
            }
        })

        return{ id_periode : cek.id_periode };
    }
}