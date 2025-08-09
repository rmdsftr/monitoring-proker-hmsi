import { Body, Controller, Post, Res } from "@nestjs/common";
import { AuthService } from "./auth.service";
import { StartDto } from "./dto/register.dto";
import { Response } from "express";
import { NewPeriodLoginDto } from "./dto/new-period.dto";

@Controller('auth')
export class AuthController{
    constructor(
        private readonly authService:AuthService
    ){}

    // @Post('register')
    // async register(@Body() dto:StartDto, @Res({passthrough:true}) res:Response){
    //     return this.authService.register(dto, res);
    // }

    @Post('new')
    async LoginNewPeriod(@Body() dto:NewPeriodLoginDto, @Res({passthrough:true}) res:Response){
        return await this.authService.LoginNewPeriode(dto, res);
    }
}