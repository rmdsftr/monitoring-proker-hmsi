import { Injectable } from "@nestjs/common";
import { secureType } from "../config/app.config";
import { Request, Response } from "express";
import { ConfigService } from "@nestjs/config";

@Injectable()
export class CookieService{
    private readonly isProduction:boolean;
    private readonly accessTokenMaxAge:number;
    private readonly refreshTokenMaxAge:number;

    constructor(private configService:ConfigService){
        this.isProduction = this.configService.get<string>('NODE_ENV') === 'production';
        this.accessTokenMaxAge = 1000*60*15;
        this.refreshTokenMaxAge = 1000*60*60*24*7;
    }

    setAccessToken(res: Response, access_token:string, refresh_token:string): void {
        const cookieOptions = {
            httpOnly: true,
            secure: this.isProduction,
            sameSite: 'strict' as const,
            path: '/'
        }

        res.cookie('access_token', access_token, {
            ...cookieOptions,
            maxAge: this.accessTokenMaxAge
        })

        res.cookie('refresh_token', refresh_token, {
            ...cookieOptions,
            maxAge: this.refreshTokenMaxAge
        })
    }

    getAccessToken(req:Request):string | null {
        return req.cookies?.access_token || null;
    }

    getRefreshToken(req:Request):string | null {
        return req.cookies?.refresh_token || null;
    }

    clearTokens(res:Response): void{
        const cookieOptions = {
            httpOnly: true,
            secure: this.isProduction,
            sameSite: 'strict' as const,
            path: '/'
        }

        res.clearCookie('access_token', cookieOptions);
        res.clearCookie('refresh_token', cookieOptions)
    }
}