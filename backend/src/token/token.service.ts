import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { PrismaService } from "../prisma/prisma.service";
import { VerifyTokenDto } from "./dto/verify.dto";
import { failed, success } from "src/utils/response";
import { Response } from "express";
import { url } from "inspector";

@Injectable()
export class TokenService{
    constructor(private readonly prisma:PrismaService){}

    async verify(dto:VerifyTokenDto){
        const cek = await this.prisma.periode.findFirst({
            where: {token_transisi: dto.token_transisi}
        })

        if(!cek){
            throw new HttpException("Token tidak valid", HttpStatus.BAD_REQUEST);
        }

        await this.prisma.periode.update({
            where: {id_periode: cek.id_periode},
            data: {
                token_transisi: 'verified',
                status_periode: 'on going'
            }
        })

        return{ id_periode : cek.id_periode };
    }
}