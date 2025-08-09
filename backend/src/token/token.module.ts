import { Module } from "@nestjs/common";
import { TokenService } from "./token.service";
import { TokenController } from "./token.controller";
import { PrismaModule } from "../prisma/prisma.module";

@Module({
    providers: [TokenService],
    controllers: [TokenController],
    imports: [PrismaModule]
})
export class TokenModule{}