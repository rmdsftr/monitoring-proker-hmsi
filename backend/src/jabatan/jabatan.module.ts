import { Module } from "@nestjs/common";
import { JabatanService } from "./jabatan.service";
import { JabatanController } from "./jabatan.controller";
import { PrismaModule } from "../prisma/prisma.module";
import { AuthModule } from "../auth/auth.module";

@Module({
    providers: [JabatanService],
    controllers: [JabatanController],
    imports: [PrismaModule, AuthModule]
})
export class JabatanModule{}