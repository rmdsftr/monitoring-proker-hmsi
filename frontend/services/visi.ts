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

export async function EditVisi(id_visi: number, visi: string) {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/visi/edit/${id_visi}`, {
      method: "PATCH",
      headers: { "Content-type": "application/json" },
      credentials: "include",
      body: JSON.stringify({ visi }),
    });

    const text = await res.text();
    const data = text ? JSON.parse(text) : null;

    if (!res.ok) {
      throw new Error(data?.message || `Gagal mengedit visi (status: ${res.status})`);
    }

    return data;
  } catch (error) {
    console.error("EditVisi error:", error);
    throw error;
  }
}

export async function DeleteVisi(id_visi: number) {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/visi/delete/${id_visi}`,
      {
        method: "DELETE",
        credentials: "include",
      }
    );

    if (!res.ok) {
      throw new Error(`Gagal menghapus visi status : ${res.status}`)
    }

    const text = await res.text();
    return text ? JSON.parse(text) : null;
  } catch (error) {
    console.error("Error delete visi:", error);
    throw error; 
  }
}
