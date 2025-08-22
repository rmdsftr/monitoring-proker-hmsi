import { Module } from "@nestjs/common";
import { PengurusService } from "./pengurus.service";
import { PengurusController } from "./pengurus.controller";
import { PrismaModule } from "../prisma/prisma.module";
import { AuthModule } from "../auth/auth.module";
import { SupabaseModule } from "../supabase/supabase.module";

@Module({
    providers: [PengurusService],
    controllers: [PengurusController],
    imports: [PrismaModule, AuthModule, SupabaseModule]
})
export class PengurusModule{}