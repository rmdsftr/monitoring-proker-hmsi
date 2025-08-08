import { ExecutionContext, Injectable } from "@nestjs/common";
import { AuthGuard } from "@nestjs/passport";
import { AuthService } from "../auth.service";
import { Request, Response } from "express";

@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt'){
    constructor(private authService:AuthService){
        super()
    }

    async canActivate(context: ExecutionContext): Promise<boolean>{
        const request = context.switchToHttp().getRequest<Request>();
        const response = context.switchToHttp().getResponse<Response>();

        try {
            return await super.canActivate(context) as boolean;
        } catch (error) {
            try {
                const refreshResult = await this.authService.refreshToken(request, response);
                if (refreshResult.status === 'success'){
                    return await super.canActivate(context) as boolean;
                }
            } catch (refreshError) {
                throw refreshError;
            }
            throw error;
        }
    }
}