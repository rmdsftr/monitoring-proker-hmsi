import { Body, Controller, Get, Param, Patch, Post, Req, Request, Res, UploadedFile, UseGuards, UseInterceptors } from "@nestjs/common";
import { PengurusService } from "./pengurus.service";
import { AddPengurusDto } from "./dto/add.dto";
import { JwtAuthGuard } from "../auth/guards/jwt.guard";
import { EditPengurusDto } from "./dto/edit.dto";
import { FileInterceptor } from "@nestjs/platform-express";
import { clientRequest } from "../utils/client-request";
import { Response } from "express";

@Controller('pengurus')
@UseGuards(JwtAuthGuard)
export class PengurusController{
    constructor(
        private readonly pengurusService:PengurusService
    ){}

    @Get()
    async getPengurus(@Req() req: clientRequest){
        const user = req.user;
        const id_periode = user?.id_periode;
        return await this.pengurusService.getPengurus(id_periode!)
    }

    // @Post()
    // async addPengurus(
    //     @Body() dto:AddPengurusDto,
    //     @Req() req:clientRequest
    // ){
    //     const user = req.user;
    //     const id_periode = user?.id_periode;
    //     const id_jabatan = user?.id_jabatan;
    //     return await this.pengurusService.addPengurus(dto, id_periode!, id_jabatan!);
    // }

    // @Patch('edit/:id_anggota')
    // @UseInterceptors(FileInterceptor('foto'))
    // async editPengurus(
    //     @Param('id_anggota') id_anggota:string,
    //     @Body() dto:EditPengurusDto,
    //     @UploadedFile() foto: Express.Multer.File,
    //     @Req() req: clientRequest
    // ){
    //     const user = req.user!;
    //     const id_periode = user?.id_periode;
    //     return await this.pengurusService.editPengurus(id_anggota, dto, foto, id_periode!);
    // }

    // @Get('foto/:id_anggota')
    // async getFotoPengurus(@Param('id_anggota') id_anggota: string) {
    //     const result = await this.pengurusService.getFotoPengurus(id_anggota);
    //     return result;
    // }

}