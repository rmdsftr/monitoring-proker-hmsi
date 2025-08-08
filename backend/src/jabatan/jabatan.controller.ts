import { Body, Controller, Post } from "@nestjs/common";
import { JabatanService } from "./jabatan.service";
import { CreateJabatanDto } from "./dto/create-jabatan.dto";

@Controller('jabatan')
export class JabatanController{
    constructor(
        private jabatanService: JabatanService
    ){}

    @Post()
    async add(@Body() dto:CreateJabatanDto){
        return this.jabatanService.add(dto);
    }
}