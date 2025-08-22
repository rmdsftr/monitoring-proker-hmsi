import { BadRequestException, Body, Controller, Delete, Get, Param, Post, Req, UseGuards } from "@nestjs/common";
import { DivisiService } from "./divisi.service";
import { CreateDivisiDto } from "./dto/create-divisi.dto";
import { Request } from "express";
import { JwtAuthGuard } from "../auth/guards/jwt.guard";
import { clientRequest } from "../utils/client-request";

@Controller('divisi')
export class DivisiController{
    constructor(
        private readonly divisiService: DivisiService
    ){}
    
    // @Get()
    // async getDivisi(){
    //     return await this.divisiService.getDivisi();
    // }
    
    @Get('all')
    @UseGuards(JwtAuthGuard)
    async getAllDivisi(@Req() req: clientRequest) {
        const user = req.user;
        const id_periode = user?.id_periode;
        if (!id_periode) {
            throw new BadRequestException("ID periode tidak ditemukan");
        }
        
        return await this.divisiService.getAllDivisi(id_periode);
    }

    @Get('selected')
    @UseGuards(JwtAuthGuard)
    async getSelected(@Req() req: clientRequest) {
        const user = req.user;
        const id_periode = user?.id_periode;
        if (!id_periode) {
            throw new BadRequestException("ID periode tidak ditemukan");
        }
        return await this.divisiService.getSelectedDivisi(id_periode);
    }

    @Delete(':id')
    @UseGuards(JwtAuthGuard)
    async deleteSelected(@Req() req: clientRequest, @Param('id') id:string) {
        const user = req.user;
        const id_periode = user?.id_periode;
        if (!id_periode) {
            throw new BadRequestException("ID periode tidak ditemukan");
        }
        return await this.divisiService.deleteSelected(id_periode, id);
    }
    
    @Post()
    async add(@Body() dto:CreateDivisiDto){
        return this.divisiService.add(dto);
    }
}