import { Body, Controller, Delete, Param, Post } from "@nestjs/common";
import { PeriodeService } from "./periode.service";
import { CreatePeriodeDto } from "./dto/create-periode.dto";

@Controller('periode')
export class PeriodeController{
    constructor(
        private readonly periodeService:PeriodeService
    ){}

    @Post()
    async add(@Body() body:CreatePeriodeDto){
        return this.periodeService.add(body)
    }
}