import { IsNotEmpty, IsString } from "class-validator";

export class CreateJabatanDto{
    @IsNotEmpty()
    @IsString()
    id_jabatan:string;

    @IsNotEmpty()
    @IsString()
    jabatan:string;
}