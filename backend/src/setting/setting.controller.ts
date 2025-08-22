import { Body, Controller, Post, Req, UseGuards } from "@nestjs/common";
import { SettingService } from "./setting.service";
import { FungsionalArrayDto, FungsionalItemDto } from "./dto/add.dto";
import { JwtAuthGuard } from "../auth/guards/jwt.guard";
import { clientRequest } from "src/utils/client-request";
import { JabatanArrayDto } from "./dto/add-jabatan.dto";

@Controller('setting')
export class SettingController{
    constructor(
        private readonly settingService: SettingService
    ){}

    @Post('fungsional')
    @UseGuards(JwtAuthGuard)
    async addPeriodeFungsional(@Body() dto: FungsionalArrayDto, @Req() req: clientRequest) {
        const user = req.user;
        const id_periode = user?.id_periode;
        const role = user?.role;
        const id_jabatan = user?.id_jabatan;
        const id_pengurus = user?.id_pengurus;
        return await this.settingService.addPeriodeFungsional(dto, id_periode!, role!, id_jabatan!, id_pengurus!);
    }

    @Post('jabatan')
    @UseGuards(JwtAuthGuard)
    async addPeriodeJabatan(@Body() dto: JabatanArrayDto, @Req() req: clientRequest) {
        const user = req.user;
        const id_periode = user?.id_periode;
        const role = user?.role;
        const id_jabatan = user?.id_jabatan;
        const id_pengurus = user?.id_pengurus;
        return await this.settingService.addPeriodeJabatan(dto, id_periode!, role!, id_jabatan!, id_pengurus!);
    }
}