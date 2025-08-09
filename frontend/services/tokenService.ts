export async function verifyToken(token: string): Promise<string> {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/token/verify`, {
    method: "PATCH",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ token_transisi: token }),
  });

  if (!res.ok) {
    const errorData = await res.json().catch(() => ({}));
    throw new Error(errorData.message || "Token tidak valid");
  }

  const data = await res.json();
  return data.id_periode;
}
