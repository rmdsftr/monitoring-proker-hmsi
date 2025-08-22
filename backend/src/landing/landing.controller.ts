import { Controller, Get } from "@nestjs/common";
import { LandingService } from "./landing.service";

@Controller('landing')
export class LandingController{
    constructor(
        private readonly landingService : LandingService
    ){}

    @Get()
    async getVisiMisi(){
        return await this.landingService.getVisiMisi();
    }
}