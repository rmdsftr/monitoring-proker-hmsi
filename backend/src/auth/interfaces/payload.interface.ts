export interface jwtPayload{
    id_anggota:string;
    no_hima:string;
    nim:string;
    role:string | null;
    id_periode:string | null;
    id_divisi:string | null;
    id_jabatan:string | null;
}