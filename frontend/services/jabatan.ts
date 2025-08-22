export async function GetJabatan(){
    try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/jabatan`, {
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
        console.error("Kesalahan saat mengambil data jabatan : ", error);
        throw error;
    }
}

export async function GetAllJabatan(){
    try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/jabatan/all`, {
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
        console.error("Kesalahan saat mengambil data jabatan : ", error);
        throw error;
    }
}

export async function GetSelectedJabatan(){
    try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/jabatan/selected`, {
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

export async function deleteSelectedInti(id:string){
    try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/jabatan/inti/${id}`, {
            method: 'DELETE',
            credentials: 'include'
        })

        if(!res.ok){
            throw new Error(`HTTP status error : ${res.status}`);
        }

        return true;
    } catch (error) {
        console.error("Kesalahan saat mengambil data jabatan : ", error);
        throw error;
    }
}

export async function deleteSelectedPres(id:string){
    try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/jabatan/pres/${id}`, {
            method: 'DELETE',
            credentials: 'include'
        })

        if(!res.ok){
            throw new Error(`HTTP status error : ${res.status}`);
        }

        return true;
    } catch (error) {
        console.error("Kesalahan saat mengambil data jabatan : ", error);
        throw error;
    }
}

export async function deleteSelected(id:string){
    try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/jabatan/${id}`, {
            method: 'DELETE',
            credentials: 'include'
        })

        if(!res.ok){
            throw new Error(`HTTP status error : ${res.status}`);
        }

        return true;
    } catch (error) {
        console.error("Kesalahan saat mengambil data jabatan : ", error);
        throw error;
    }
}