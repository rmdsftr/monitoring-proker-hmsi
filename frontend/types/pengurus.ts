export interface AddPengurusPayload {
  nama: string;
  panggilan: string;
  no_hima: string;
  nim: string;
  id_divisi: string;
  id_jabatan: string;
}

export interface EditPengurusPayload {
  id_divisi:string;
  id_jabatan:string;
  status_anggota:string;
  foto: File | Blob | null;
}

export interface Pengurus {
  id: number;
  nama: string;
  noHima: string;
  nim: string;
  panggilan: string;
  divisi: string;
  jabatan: string;
  id_jabatan: string;
  status: 'Aktif' | 'Tidak Aktif';
  foto?: string;
}