import { Body, Controller, Get, Post, Req, SetMetadata, UseGuards } from "@nestjs/common";
import { VisiService } from "./visimisi.service";
import { AddVisiDto } from "./dto/addvisi.dto";
import { JwtAuthGuard } from "../auth/guards/jwt.guard";
import { Request } from "express";
import { MisiService } from "./misi.service";
import { AddMisiDto } from "./dto/addmisi.dto";

@Controller('visi')
@UseGuards(JwtAuthGuard)
export class VisiController{
    constructor(
        private readonly visiService: VisiService
    ){}

    @Post('add')
    async addVisi(@Body() dto: AddVisiDto, @Req() req:Request){
        const user = req.user!;
        const id_periode = user.id_periode;
        const id_jabatan = user.id_jabatan;
        const id_divisi = user.id_divisi;
        const role = user.role;
        console.log("Visi nya adalah : ", dto);
        return await this.visiService.addVisi(dto, role, id_periode!, id_jabatan!, id_divisi!);
    }

    @Get()
    async getVisi(@Req() req:Request){
        const user = req.user!;
        const id_periode = user.id_periode;
        return await this.visiService.getVisi(id_periode!);
    }
}

@Controller('misi')
@UseGuards(JwtAuthGuard)
export class MisiController{
    constructor(
        private readonly misiService: MisiService
    ){}

    @Post('add')
    async addMisi(@Body() dto: AddMisiDto, @Req() req:Request){
        const user = req.user!;
        const id_periode = user.id_periode;
        const id_jabatan = user.id_jabatan;
        const id_divisi = user.id_divisi;
        const role = user.role;
        console.log("Misi nya adalah : ", dto);
        return await this.misiService.AddMisi(dto, role, id_periode!, id_jabatan!, id_divisi!);
    }

    @Get()
    async getMisi(@Req() req:Request){
        const user = req.user;
        const id_periode = user?.id_periode;
        return await this.misiService.getMisi(id_periode!);
    }
}