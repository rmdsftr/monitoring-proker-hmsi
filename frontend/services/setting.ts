import { SaveFungsionalPayload } from "@/types/divisi";
import { SaveJabatanPayload } from "@/types/jabatan";

export async function saveFungsional(payload: SaveFungsionalPayload) {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/setting/fungsional`, {
        method: "POST",
        credentials: "include",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
    });
    
    if (!res.ok) {
        const err = await res.json();
        throw new Error(err.message || "Gagal menyimpan data");
    }
    
    return res.json();
}


export async function saveJabatan(payload: SaveJabatanPayload) {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/setting/jabatan`, {
        method: "POST",
        credentials: "include",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
    });
    
    if (!res.ok) {
        const err = await res.json();
        throw new Error(err.message || "Gagal menyimpan data");
    }
    
    return res.json();
}