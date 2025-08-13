import { Module } from "@nestjs/common";
import { AuthService } from "./auth.service";
import { AuthController } from "./auth.controller";
import { PrismaModule } from "../prisma/prisma.module";
import { PassportModule } from "@nestjs/passport";
import { JwtStrategy } from "./startegy/jwt.strategy";
import { JwtTokenUtil } from "../utils/jwt-token";
import { UserValidator } from "../validators/user-auth.validator";
import { JwtModule } from "@nestjs/jwt";
import { ConfigModule, ConfigService } from "@nestjs/config";
import { CookieService } from "../utils/token-cookies";

@Module({
    providers: [AuthService, JwtStrategy, JwtTokenUtil, UserValidator, CookieService],
    controllers: [AuthController],
    imports: [PrismaModule, PassportModule,
        JwtModule.registerAsync({
            imports: [ConfigModule],
            inject: [ConfigService],
            useFactory: async(configService:ConfigService) => ({
                secret: configService.get<string>('jwt.secret'),
                signOptions: {
                    expiresIn: configService.get<string>('jwt.accessTokenExpiry') || '15m',
                    issuer: 'hmsi'
                }
            })
        })
    ],
    exports: [AuthService]
})
export class AuthModule{}