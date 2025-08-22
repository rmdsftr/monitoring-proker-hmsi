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

export async function EditMisi(id_misi: number, misi: string) {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/misi/edit/${id_misi}`, {
      method: "PATCH",
      headers: { "Content-type": "application/json" },
      credentials: "include",
      body: JSON.stringify({ misi }),
    });

    const text = await res.text();
    const data = text ? JSON.parse(text) : null;

    if (!res.ok) {
      throw new Error(data?.message || `Gagal mengedit misi (status: ${res.status})`);
    }

    return data;
  } catch (error) {
    console.error("EditMisi error:", error);
    throw error;
  }
}

export async function DeleteMisi(id_misi: number) {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/misi/delete/${id_misi}`,
      {
        method: "DELETE",
        credentials: "include",
      }
    );

    if (!res.ok) {
      throw new Error(`Gagal menghapus misi status : ${res.status}`)
    }

    const text = await res.text();
    return text ? JSON.parse(text) : null;
  } catch (error) {
    console.error("Error delete misi:", error);
    throw error; 
  }
}
