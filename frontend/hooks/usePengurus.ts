import { useEffect, useState } from "react";
import { Pengurus } from "@/types/pengurus";
import { GetCurrentPengurus } from "@/services/pengurus";

export interface AlertType {
  message: string;
  type: "success" | "error";
}

export function usePengurus(){
    const [dataPengurus, setDataPengurus] = useState<Pengurus[]>([]);
    const [loading, setLoading] = useState(false);
    const [alert, setAlert] = useState<AlertType | null>(null);

    const showAlert = (message: string, type: "success" | "error") => {
        setAlert({ message, type });
    };

    const fetchPengurusData = async () => {
        setLoading(true);
        try {
            const data = await GetCurrentPengurus();
            const mapped = data.map((item: any) => ({
                id: item.anggota.id_anggota,
                nama: item.anggota.nama,
                noHima: item.anggota.no_hima,
                nim: item.anggota.nim,
                panggilan: item.anggota.panggilan,
                divisi: item.divisi.id_divisi, 
                jabatan: item.jabatan.jabatan,
                id_jabatan: item.jabatan.id_jabatan,
                status: item.anggota.status_anggota
            }));

            setDataPengurus(mapped);
        } catch (error) {
            console.error(error);
        } finally {
            setLoading(false);
        }
    };
    
    useEffect(() => {
        fetchPengurusData();
    }, []);
    
    return {
        dataPengurus, loading, alert, setAlert, fetchPengurusData, showAlert
    }
}