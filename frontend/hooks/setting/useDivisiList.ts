import { useEffect, useState } from "react";
import { GetAllDivisi } from "@/services/divisi";

export function useDivisiList() {
    const [divisi, setDivisi] = useState<any[]>([]);
    const [loading, setLoading] = useState(false);
    
    const fetchDivisi = async () => {
        setLoading(true);
        try {
            const data = await GetAllDivisi();
            if (!Array.isArray(data)) throw new Error("Data yang diterima bukan array");
            const mapped = data.map((item: any) => ({
                id: item.id_fungsional,
                fungsional: item.fungsional,
            }));
            setDivisi(mapped);
        } catch (err) {
            console.error("Error fetching divisi:", err);
        } finally {
            setLoading(false);
        }
    };
    
    useEffect(() => {
        fetchDivisi();
    }, []);
    
    return { divisi, loading, fetchDivisi };
}
