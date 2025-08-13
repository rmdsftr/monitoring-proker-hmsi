export async function AddVisi(visi: string) {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/visi/add`, {
      method: "POST",
      headers: { "Content-type": "application/json" },
      credentials: "include",
      body: JSON.stringify({ visi }), // pastikan bentuknya object
    });

    if (!res.ok) {
      const errData = await res.json(); 
      throw new Error(errData.message || "Gagal menambahkan visi");
    }

    return await res.json();
  } catch (error) {
    throw error; 
  }
}

export async function GetVisi() {
    try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/visi`, {
            method: 'GET',
            headers: { "Content-Type": "application/json" },
            credentials: 'include'
        });

        if (!res.ok) {
            throw new Error(`HTTP error status: ${res.status}`);
        }

        const visi = await res.json(); 
        return visi;
    } catch (error) {
        throw error;
    }
}