import { Body, Controller, Post } from "@nestjs/common";
import { DivisiService } from "./divisi.service";
import { CreateDivisiDto } from "./dto/create-divisi.dto";

@Controller('divisi')
export class DivisiController{
    constructor(
        private readonly divisiService: DivisiService
    ){}

    @Post()
    async add(@Body() dto:CreateDivisiDto){
        return this.divisiService.add(dto);
    }
}