import { Body, Controller, Get, Post } from "@nestjs/common";
import { DivisiService } from "./divisi.service";
import { CreateDivisiDto } from "./dto/create-divisi.dto";

@Controller('divisi')
export class DivisiController{
    constructor(
        private readonly divisiService: DivisiService
    ){}

    @Get()
    async getDivisi(){
        return await this.divisiService.getDivisi();
    }

    @Post()
    async add(@Body() dto:CreateDivisiDto){
        return this.divisiService.add(dto);
    }
}