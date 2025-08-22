import { useEffect, useState } from "react";
import { GetSelectedDivisi, deleteSelectedDivisi } from "@/services/divisi";

export function useManajemenFungsional(onConfirm: (msg: string, type: "success" | "error") => void) {
    const [divisi, setDivisi] = useState<any[]>([]);
    const [loading, setLoading] = useState(false);
    
    const fetchDivisi = async () => {
        try {
            const data = await GetSelectedDivisi();
            if (!Array.isArray(data)) throw new Error("Data yang diterima bukan array");
            
            const mapped = data.map((item: any) => ({
                id: item.id_fungsional,
                fungsional: item.fungsional,
                tipe: item.tipe,
            }));
            setDivisi(mapped);
        } catch (err) {
            console.error("Error fetching divisi:", err);
        }
    };
    
    const handleDelete = async (id: string) => {
        setLoading(true);
        try {
            await deleteSelectedDivisi(id);
            await fetchDivisi();
            onConfirm("Fungsional berhasil dihapus", "success");
        } catch (err: any) {
            onConfirm(err.message, "error");
        } finally {
            setLoading(false);
        }
    };
    
    useEffect(() => {
        fetchDivisi();
    }, []);
    
    return { divisi, loading, fetchDivisi, handleDelete };
}
