import { BadRequestException, Body, Controller, Delete, Get, Param, Post, Req, UseGuards } from "@nestjs/common";
import { JabatanService } from "./jabatan.service";
import { CreateJabatanDto } from "./dto/create-jabatan.dto";
import { JwtAuthGuard } from "src/auth/guards/jwt.guard";
import { clientRequest } from "src/utils/client-request";

@Controller('jabatan')
export class JabatanController{
    constructor(
        private jabatanService: JabatanService
    ){}

    @Get()
    async getJabatan(){
        return await this.jabatanService.getJabatan();
    }

    @Get('all')
    @UseGuards(JwtAuthGuard)
    async getAllJabatan(@Req() req: clientRequest) {
        const user = req.user;
        const id_periode = user?.id_periode;
        if (!id_periode) {
            throw new BadRequestException("ID periode tidak ditemukan");
        }
        return await this.jabatanService.getAllJabatan(id_periode);
    }

    @Get('selected')
    @UseGuards(JwtAuthGuard)
    async getSelected(@Req() req: clientRequest) {
        const user = req.user;
        const id_periode = user?.id_periode;
        if (!id_periode) {
            throw new BadRequestException("ID periode tidak ditemukan");
        }
        return await this.jabatanService.getSelectedJabatan(id_periode);
    }

    @Delete('inti/:id')
    @UseGuards(JwtAuthGuard)
    async deleteInti(@Param('id') id:string, @Req() req: clientRequest){
        const user = req.user;
        const id_periode = user?.id_periode;
        if (!id_periode) {
            throw new BadRequestException("ID periode tidak ditemukan");
        }
        return await this.jabatanService.deleteInti(id, id_periode);
    }

    @Delete('pres/:id')
    @UseGuards(JwtAuthGuard)
    async deletePres(@Param('id') id:string, @Req() req: clientRequest){
        const user = req.user;
        const id_periode = user?.id_periode;
        if (!id_periode) {
            throw new BadRequestException("ID periode tidak ditemukan");
        }
        return await this.jabatanService.deletePres(id, id_periode);
    }

    @Delete(':id')
    @UseGuards(JwtAuthGuard)
    async delete(@Param('id') id:string, @Req() req: clientRequest){
        const user = req.user;
        const id_periode = user?.id_periode;
        if (!id_periode) {
            throw new BadRequestException("ID periode tidak ditemukan");
        }
        return await this.jabatanService.delete(id, id_periode);
    }

    @Post()
    async add(@Body() dto:CreateJabatanDto){
        return await this.jabatanService.add(dto);
    }
}