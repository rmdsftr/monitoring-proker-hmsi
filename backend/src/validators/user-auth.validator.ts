import { Injectable, UnauthorizedException } from "@nestjs/common";
import { jwtPayload } from "../auth/interfaces/payload.interface";
import { PrismaService } from "../prisma/prisma.service";
import { failed } from "../utils/response";

@Injectable()
export class UserValidator{
    constructor(private prisma:PrismaService){}

    async validateUser(payload: jwtPayload){
        try {
            const user = await this.prisma.anggota.findUnique({
                where: {no_hima: payload.no_hima},
                select: {
                    no_hima:true,
                    nim: true,
                    role: true,
                    pengurus: {
                        select: {
                            id_periode: true,
                            id_divisi: true,
                            id_jabatan: true
                        }
                    }
                }
            })

            if(!user){
                return null;
            }

            const pengurus = user.pengurus[0];

            return {
                ...user,
                id_periode: pengurus?.id_periode,
                id_divisi: pengurus?.id_divisi,
                id_jabatan: pengurus?.id_jabatan
            }
        } catch (error) {
            return failed("User validation error :", error);
        }
    }
}