import { IsNotEmpty, IsString } from "class-validator";

export class LoginDto{
    @IsNotEmpty()
    @IsString()
    no_hima:string;

    @IsNotEmpty()
    @IsString()
    periode_id:string;

    @IsNotEmpty()
    @IsString()
    password:string;
}