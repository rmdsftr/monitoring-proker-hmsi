import { Module } from "@nestjs/common";
import { LandingService } from "./landing.service";
import { LandingController } from "./landing.controller";
import { PrismaModule } from "../prisma/prisma.module";

@Module({
    providers: [LandingService],
    controllers: [LandingController],
    imports: [PrismaModule]
})
export class LandingModule{}