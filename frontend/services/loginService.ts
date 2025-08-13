import { refreshUser } from "@/utils/cookie";

export async function login(payload: {
  no_hima: string;
  periode_id: string;
  password: string;
}) {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/auth/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    credentials: "include",
    body: JSON.stringify(payload),
  });
  if (!res.ok) throw new Error((await res.json()).message || "Login gagal");

  await refreshUser();
  return await res.json();
}

export async function loginAktivasi(payload: {
  no_hima: string;
  periode_id: string;
  password: string;
  id_periode: string;
}) {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/auth/new`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    credentials: "include",
    body: JSON.stringify(payload),
  });
  if (!res.ok) throw new Error((await res.json()).message || "Login gagal");

  await refreshUser();
  return await res.json();
}
