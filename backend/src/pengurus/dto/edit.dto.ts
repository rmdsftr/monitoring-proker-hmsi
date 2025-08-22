import { IsIn, IsNotEmpty, IsString } from "class-validator";

export class EditPengurusDto{
    @IsNotEmpty()
    @IsString()
    id_divisi:string;

    @IsNotEmpty()
    @IsString()
    id_jabatan:string;

    @IsNotEmpty()
    @IsString()
    @IsIn(["Aktif", "Cuti", "Nonaktif"])
    status_anggota:"Aktif" | "Cuti" | "Nonaktif";
}