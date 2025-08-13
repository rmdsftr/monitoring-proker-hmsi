export async function GetDivisi(){
    try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/divisi`, {
            method: 'GET',
            headers: {'Content-type' : 'application/json'}
        })

        if(!res.ok){
            throw new Error(`HTTP status error : ${res.status}`);
        }

        const data = res.json();
        return data;
    } catch (error) {
        console.error("Kesalahan saat mengambil data divisi : ", error);
        throw error;
    }
}