export async function LandingService() {
  if (!process.env.NEXT_PUBLIC_API_URL) {
    throw new Error("NEXT_PUBLIC_API_URL belum diset di .env");
  }

  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/landing`, {
      method: 'GET',
      headers: { "Content-Type": "application/json" },
      cache: 'no-store' 
    });

    console.log("isi fetch : ", res);

    if (!res.ok) {
      throw new Error(`HTTP Error ${res.status}: ${res.statusText}`);
    }

    const text = await res.text();
    const result = text ? JSON.parse(text) : { message: "Berhasil" };
    return result;
  } catch (error) {
    console.error("Gagal memuat landing data:", error);
    throw error;
  }
}
