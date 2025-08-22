import { Module } from "@nestjs/common";
import { SettingController } from "./setting.controller";
import { SettingService } from "./setting.service";
import { PrismaModule } from "../prisma/prisma.module";
import { AuthModule } from "../auth/auth.module";

@Module({
    controllers: [SettingController],
    providers: [SettingService],
    imports: [PrismaModule, AuthModule]
})

export class SettingModule{}