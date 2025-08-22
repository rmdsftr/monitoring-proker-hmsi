import { Module } from "@nestjs/common";
import { PeriodeService } from "./periode.service";
import { PeriodeController } from "./periode.controller";
import { PrismaModule } from "../prisma/prisma.module";
import { AuthModule } from "../auth/auth.module";

@Module({
    providers: [PeriodeService],
    controllers: [PeriodeController],
    imports: [PrismaModule, AuthModule]
})
export class PeriodeModule{}