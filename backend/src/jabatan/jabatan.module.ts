import { Module } from "@nestjs/common";
import { JabatanService } from "./jabatan.service";
import { JabatanController } from "./jabatan.controller";
import { PrismaModule } from "../prisma/prisma.module";

@Module({
    providers: [JabatanService],
    controllers: [JabatanController],
    imports: [PrismaModule]
})
export class JabatanModule{}