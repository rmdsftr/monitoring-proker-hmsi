import { Injectable, UnauthorizedException } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { PassportStrategy } from "@nestjs/passport";
import { Strategy } from "passport-jwt";
import { UserValidator } from "../../validators/user-auth.validator";
import { jwtPayload } from "../interfaces/payload.interface";
import { Request } from "express";

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy){
    constructor(
        configService: ConfigService,
        private userValidator: UserValidator
    ){
        super({
            jwtFromRequest: (req: Request) => {
                if(!req.cookies) return null;
                return req.cookies['access_token']
            },
            ignoreExpiration: false,
            secretOrKey: configService.get<string>('jwt.secret') || 'fallback-secret'
        })
    }

    async validate(payload: jwtPayload){
        const user = await this.userValidator.validateUser(payload);
        if(!user){
            throw new UnauthorizedException("Token tidak valid")
        }

        return user;
    }
}