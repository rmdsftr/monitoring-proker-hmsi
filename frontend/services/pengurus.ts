import { AddPengurusPayload, EditPengurusPayload } from "@/types/pengurus";

export async function GetCurrentPengurus(){
    try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/pengurus`, {
            method: 'GET',
            headers: {"Content-Type" : "application/json"},
            credentials: 'include'
        })

        if(!res.ok){
            throw new Error(`Kesalahan mendapat respon : ${res.status}`)
        }

        const data = await res.json();
        return data;
    } catch (error) {
        throw error;
    }
}

export async function AddCurrentPengurus(payload: AddPengurusPayload): Promise<any> {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/pengurus`, {
      method: 'POST',
      headers: { "Content-Type": "application/json" },
      credentials: 'include',
      body: JSON.stringify(payload)
    });

    if (!res.ok) {
      throw new Error(`Kesalahan mendapat respon: ${res.status}`);
    }

    const text = await res.text();
    const result = text ? JSON.parse(text) : { message: "Berhasil" };
    return result;
  } catch (error) {
    console.error("AddCurrentPengurus error:", error);
    throw error;
  }
}

export async function EditPengurus(id_anggota:string, payload: EditPengurusPayload): Promise<any> {
  try {
    const formData = new FormData();

    Object.entries(payload).forEach(([key, value]) => {
        if(value !== undefined && value !== null){
            formData.append(key, value as any)
        }
    })
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/pengurus/edit/${id_anggota}`, {
      method: 'PATCH',
      credentials: 'include',
      body: formData
    });

    if (!res.ok) {
      throw new Error(`Kesalahan mendapat respon: ${res.status}`);
    }

    const text = await res.text();
    const result = text ? JSON.parse(text) : { message: "Berhasil" };
    return result;
  } catch (error) {
    console.error("EditPengurus error:", error);
    throw error;
  }
}

export async function GetFotoPengurus(id_anggota:string){
    try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/pengurus/foto/${id_anggota}`, {
            method: 'GET',
            credentials: 'include',
        });

        if (!res.ok) {
            throw new Error(`Kesalahan mendapat respon: ${res.status}`);
        }

        const text = await res.text();
        const result = text ? JSON.parse(text) : { message: "Berhasil" };
        return result;
    } catch (error) {
        console.error("GetFotoPengurus error:", error);
        throw error;
    }
}
