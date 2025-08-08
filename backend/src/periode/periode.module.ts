import { Module } from "@nestjs/common";
import { PeriodeService } from "./periode.service";
import { PeriodeController } from "./periode.controller";
import { PrismaModule } from "../prisma/prisma.module";

@Module({
    providers: [PeriodeService],
    controllers: [PeriodeController],
    imports: [PrismaModule]
})
export class PeriodeModule{}