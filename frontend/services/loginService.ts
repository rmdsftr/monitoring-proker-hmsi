export async function loginUser(payload: {
  no_hima: string;
  periode_id: string;
  password: string;
  id_periode: string;
}) {
  const res = await fetch(`http://localhost:5000/auth/new`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    credentials: "include",
    body: JSON.stringify(payload),
  });

  if (!res.ok) {
    const errData = await res.json();
    // kalau backend ngirim { errors: {...} } kita lempar
    if (errData.errors) {
      const error: any = new Error("Validation error");
      error.fieldErrors = errData.errors;
      throw error;
    }
    throw new Error(errData.message || "Login gagal");
  }

  return await res.json();
}
