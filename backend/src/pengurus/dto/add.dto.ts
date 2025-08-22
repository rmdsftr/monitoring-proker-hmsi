import { IsNotEmpty, IsString } from "class-validator";

export class AddPengurusDto{
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
    id_divisi:string;

    @IsNotEmpty()
    @IsString()
    id_jabatan:string;
}