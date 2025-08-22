import { KahimPayload } from "@/types/periode";

export async function AddPeriode(start_year: number, end_year:number) {
    try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/periode`, {
        method: "POST",
        headers: { "Content-type": "application/json" },
        credentials: "include",
        body: JSON.stringify({ start_year, end_year }), 
        });

        if (!res.ok) {
        const errData = await res.json(); 
        throw new Error(errData.message || "Gagal menambahkan visi");
        }

        const text = await res.text();
        const result = text ? JSON.parse(text) : { message: "Berhasil" };
        return result;
    } catch (error) {
            throw error; 
    }
}

export async function ClosePeriode(){
    try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/periode/close`, {
            method: 'PATCH',
            headers: {"Content-Type" : "application/json"},
            credentials: "include"
        })

        if (!res.ok) {
            const errData = await res.json(); 
            throw new Error(errData.message || "Gagal menambahkan visi");
        }

        const text = await res.text();
        const result = text ? JSON.parse(text) : { message: "Berhasil" };
        return result;
    } catch (error) {
        throw error;
    }
}

export async function AddKahimService(payload: KahimPayload){
    try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/periode/kahim`, {
            method: 'POST',
            headers: {"Content-Type" : "application/json"},
            credentials: 'include',
            body: JSON.stringify(payload)
        })

        if (!res.ok) {
            const errData = await res.json(); 
            throw new Error(errData.message || "Gagal menambahkan visi");
        }

        const text = await res.text();
        const result = text ? JSON.parse(text) : { message: "Berhasil" };
        return result;
    } catch (error) {
        throw error;
    }
}