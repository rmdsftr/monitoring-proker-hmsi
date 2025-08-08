import { Module } from "@nestjs/common";
import { DivisiController } from "./divisi.controller";
import { DivisiService } from "./divisi.service";
import { PrismaModule } from "../prisma/prisma.module";

@Module({
    controllers: [DivisiController],
    providers: [DivisiService],
    imports: [PrismaModule]
})
export class DivisiModule{}