import { Body, Controller, Delete, Get, Param, ParseIntPipe, Patch, Post, Req, SetMetadata, UseGuards } from "@nestjs/common";
import { VisiService } from "./visimisi.service";
import { AddVisiDto } from "./dto/addvisi.dto";
import { JwtAuthGuard } from "../auth/guards/jwt.guard";
import { Request } from "express";
import { MisiService } from "./misi.service";
import { AddMisiDto } from "./dto/addmisi.dto";
import { EditVisiDto } from "./dto/editvisi.dto";
import { EditMisiDto } from "./dto/editmisi.dto";

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

    @Patch('edit/:id_visi')
    async editVisi(
        @Param('id_visi', ParseIntPipe) id_visi:number,
        @Body() dto:EditVisiDto, 
        @Req() req: Request){
        const user = req.user;
        const id_periode = user?.id_periode;
        return await this.visiService.editVisi(id_visi, dto, id_periode!);
    }

    @Delete('delete/:id_visi')
    async deleteVisi(@Param('id_visi', ParseIntPipe) id_visi:number, @Req() req:Request){
        const user = req.user;
        const id_periode = user?.id_periode;
        console.log("ID VISI ADALAH : ", id_visi);
        console.log("ID PERIODE ADALAH : ", id_periode);
        return await this.visiService.deleteVisi(id_visi, id_periode!)
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

    @Patch('edit/:id_misi')
    async editMisi(
        @Param('id_misi', ParseIntPipe) id_misi:number,
        @Body() dto:EditMisiDto, 
        @Req() req: Request){
        const user = req.user;
        const id_periode = user?.id_periode;
        console.log("ID MISI ADALAH : ", id_misi);
        console.log("ID PERIODE ADALAH : ", id_periode);
        return await this.misiService.editMisi(id_misi, dto, id_periode!);
    }

    @Delete('delete/:id_misi')
    async deleteMisi(@Param('id_misi', ParseIntPipe) id_misi:number, @Req() req:Request){
        const user = req.user;
        const id_periode = user?.id_periode;
        console.log("ID MISI ADALAH : ", id_misi);
        console.log("ID PERIODE ADALAH : ", id_periode);
        return await this.misiService.deleteMisi(id_misi, id_periode!)
    }
}