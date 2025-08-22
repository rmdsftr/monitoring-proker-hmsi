export interface SaveJabatanPayload {
    data: {
        id_jabatan: string;
        is_inti: boolean;
        is_presidium:boolean;
    }[];
}