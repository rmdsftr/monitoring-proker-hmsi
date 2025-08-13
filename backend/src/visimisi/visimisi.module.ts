import { Module } from "@nestjs/common";
import { VisiService } from "./visimisi.service";
import { MisiController, VisiController } from "./visimisi.controller";
import { PrismaModule } from "../prisma/prisma.module";
import { AuthModule } from "../auth/auth.module";
import { MisiService } from "./misi.service";

@Module({
    providers: [VisiService, MisiService],
    controllers: [VisiController, MisiController],
    imports: [PrismaModule, AuthModule]
})
export class VisiMisiModule{}