export async function GetDivisi(){
    try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/divisi`, {
            method: 'GET',
            headers: {'Content-type' : 'application/json'}
        })

        if(!res.ok){
            throw new Error(`HTTP status error : ${res.status}`);
        }

        const data = await res.json();
        return data;
    } catch (error) {
        console.error("Kesalahan saat mengambil data divisi : ", error);
        throw error;
    }
}

export async function GetAllDivisi(){
    try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/divisi/all`, {
            method: 'GET',
            headers: {'Content-type' : 'application/json'},
            credentials: 'include'
        })

        if(!res.ok){
            throw new Error(`HTTP status error : ${res.status}`);
        }

        const data = await res.json();
        return data;
    } catch (error) {
        console.error("Kesalahan saat mengambil data divisi : ", error);
        throw error;
    }
}

export async function GetSelectedDivisi(){
    try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/divisi/selected`, {
            method: 'GET',
            headers: {'Content-type' : 'application/json'},
            credentials: 'include'
        })

        if(!res.ok){
            throw new Error(`HTTP status error : ${res.status}`);
        }

        const data = await res.json();
        return data;
    } catch (error) {
        console.error("Kesalahan saat mengambil data divisi : ", error);
        throw error;
    }
}

export async function deleteSelectedDivisi(id:string){
    try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/divisi/${id}`, {
            method: 'DELETE',
            credentials: 'include'
        })

        if(!res.ok){
            throw new Error(`HTTP status error : ${res.status}`);
        }

        return true;
    } catch (error) {
        console.error("Kesalahan saat mengambil data divisi : ", error);
        throw error;
    }
}