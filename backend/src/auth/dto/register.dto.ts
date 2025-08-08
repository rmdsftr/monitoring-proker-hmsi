import { IsNotEmpty, IsString } from "class-validator";

export class StartDto{
    @IsNotEmpty()
    @IsString()
    no_hima:string;

    @IsNotEmpty()
    @IsString()
    nim:string;

    @IsNotEmpty()
    @IsString()
    nama:string;

    @IsNotEmpty()
    @IsString()
    panggilan:string;

    @IsNotEmpty()
    @IsString()
    sandi:string;

    @IsNotEmpty()
    @IsString()
    konfirmasi_sandi:string;

    @IsNotEmpty()
    @IsString()
    token_transisi:string;
}