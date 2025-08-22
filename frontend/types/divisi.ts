export interface GetDivisiInterface{
    id_divisi:string;
    divisi:string;
}

export interface SaveFungsionalPayload {
    data: {
        id_fungsional: string;
        kategori: string;
    }[];
}