import { IsNotEmpty, IsString } from "class-validator";

export class NewPeriodLoginDto{
    @IsNotEmpty()
    @IsString()
    no_hima:string;

    @IsNotEmpty()
    @IsString()
    id_periode:string;

    @IsNotEmpty()
    @IsString()
    periode_id:string;

    @IsNotEmpty()
    @IsString()
    password:string;
}