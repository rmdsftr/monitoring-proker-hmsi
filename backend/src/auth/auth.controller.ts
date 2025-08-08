import { Body, Controller, Post, Res } from "@nestjs/common";
import { AuthService } from "./auth.service";
import { StartDto } from "./dto/register.dto";
import { Response } from "express";

@Controller('auth')
export class AuthController{
    constructor(
        private readonly authService:AuthService
    ){}

    @Post('register')
    async register(@Body() dto:StartDto, @Res({passthrough:true}) res:Response){
        return this.authService.register(dto, res);
    }
}