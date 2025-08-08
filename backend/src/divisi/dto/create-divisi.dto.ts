import { IsNotEmpty, IsString } from "class-validator";

export class CreateDivisiDto{
    @IsNotEmpty()
    @IsString()
    id_divisi:string;

    @IsNotEmpty()
    @IsString()
    divisi:string;
}