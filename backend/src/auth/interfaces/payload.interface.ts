export interface jwtPayload{
    id_anggota:string;
    id_pengurus: string;
    role:string;
    panggilan: string;
    id_periode:string;
    periode:string;
    id_fungsional:string;
    id_jabatan:string;
    exp?: number; 
    iat?: number; 
    iss?: string; 
    sub?: string; 
    aud?: string;
}