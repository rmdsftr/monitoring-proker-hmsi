import { tipe_fungsional_enum } from "@prisma/client";
import { IsEnum, IsNotEmpty, IsString } from "class-validator";

export class CreateDivisiDto{
    @IsNotEmpty()
    @IsString()
    id_fungsional:string;

    @IsNotEmpty()
    @IsString()
    fungsional:string;
}