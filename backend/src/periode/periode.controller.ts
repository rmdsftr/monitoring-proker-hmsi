import { Body, Controller, Delete, Get, Param, Patch, Post, Req, UseGuards } from "@nestjs/common";
import { PeriodeService } from "./periode.service";
import { CreatePeriodeDto } from "./dto/create-periode.dto";
import { AddNewKahim } from "./dto/new-kahim.dto";
import { JwtAuthGuard } from "../auth/guards/jwt.guard";
import { clientRequest } from "src/utils/client-request";

@Controller('periode')
export class PeriodeController{
    constructor(
        private readonly periodeService:PeriodeService
    ){}

    @Post()
    async add(@Body() body:CreatePeriodeDto){
        return this.periodeService.add(body)
    }

    @Get('options')
    async getPeriodeOptions(){
        return await this.periodeService.getPeriodeOptions();
    }

    @Post('kahim')
    async addNewKahim(@Body() dto:AddNewKahim){
        return await this.periodeService.AddNewKahim(dto);
    }

    @Patch('close')
    @UseGuards(JwtAuthGuard)
    async close(@Req() req:clientRequest){
        const user = req.user;
        const id_periode = user?.id_periode;
        return await this.periodeService.close(id_periode!);
    }
}