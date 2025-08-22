import { Body, Controller, Patch, Post, Redirect, Res } from "@nestjs/common";
import { TokenService } from "./token.service";
import { VerifyTokenDto } from "./dto/verify.dto";
import { Response } from "express";

@Controller('token')
export class TokenController{
    constructor(private readonly tokenService:TokenService){}

    @Patch('verify')
    async verify(@Body() dto:VerifyTokenDto){
        return await this.tokenService.verify(dto);
    }

    @Post('kahim/new')
    async newKahim(){
        
    }
}