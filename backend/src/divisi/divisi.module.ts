import { Module } from "@nestjs/common";
import { DivisiController } from "./divisi.controller";
import { DivisiService } from "./divisi.service";
import { PrismaModule } from "../prisma/prisma.module";
import { AuthModule } from "../auth/auth.module";

@Module({
    controllers: [DivisiController],
    providers: [DivisiService],
    imports: [PrismaModule, AuthModule]
})
export class DivisiModule{}