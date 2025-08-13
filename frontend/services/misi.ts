export async function AddMisi(misi: string) {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/misi/add`, {
      method: "POST",
      headers: { "Content-type": "application/json" },
      credentials: "include",
      body: JSON.stringify({ misi }), 
    });

    if (!res.ok) {
      const errData = await res.json(); 
      throw new Error(errData.message || "Gagal menambahkan misi");
    }

    return await res.json();
  } catch (error) {
    throw error; 
  }
}

export async function GetMisi() {
    try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/misi`, {
            method: 'GET',
            headers: { "Content-Type": "application/json" },
            credentials: 'include'
        });

        if (!res.ok) {
            throw new Error(`HTTP error status: ${res.status}`);
        }

        const misi = await res.json();
        return misi;
    } catch (error) {
        throw error;
    }
}
