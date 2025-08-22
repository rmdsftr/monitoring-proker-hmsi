import { Request } from "express";

export interface clientRequest extends Request{
    user?: {
        id_anggota:string;
        id_pengurus: string;
        role:string;
        panggilan: string;
        id_periode:string;
        id_fungsional:string;
        id_jabatan:string;
    }
}