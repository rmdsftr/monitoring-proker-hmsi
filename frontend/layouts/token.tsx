"use client";

import { Input } from "@/components/input/input";
import { Button } from "@/components/button/button";
import styling from "@/styles/layouts/token.module.css";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { verifyToken } from "@/services/tokenService";

export default function TokenForm() {
  const [token, setToken] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const router = useRouter();

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const idPeriode = await verifyToken(token);
      localStorage.setItem("id_periode_token", idPeriode);
      router.push(`/token/start?id_periode=${idPeriode}`);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Terjadi kesalahan");
    } finally {
      setLoading(false);
    }
  }

  return (
    <form onSubmit={handleSubmit}>
      <h4>Masukkan token kepengurusan baru</h4>
      <br />
      <Input
        variant="outline"
        value={token}
        onChange={(e) => setToken(e.target.value)}
        disabled={loading}
        error={error}
        required
      />
      <br />
      <Button
        className={styling.btn}
        disabled={loading || !token.trim()}
        type="submit"
      >
        {loading ? "Memverifikasi token..." : "Aktivasi"}
      </Button>
    </form>
  );
}
