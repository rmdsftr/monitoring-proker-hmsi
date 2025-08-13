"use client";

import styles from "@/styles/layouts/login.module.css";
import { poppins } from "@/components/fonts/fontname";
import { Input } from "@/components/input/input";
import { Dropdown } from "@/components/dropdown/dropdown";
import { Button } from "@/components/button/button";
import { FaUser, FaCalendar, FaLock } from "react-icons/fa6";
import { ChevronDown } from "lucide-react";
import { PasswordInput } from "@/components/input/password";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { login } from "@/services/loginService";

export default function FormLogin() {
  const [options, setOptions] = useState<{ label: string; value: string }[]>([]);
  const [noHima, setNoHima] = useState("");
  const [periodeId, setPeriodeId] = useState("");
  const [password, setPassword] = useState("");

  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState<{ [key: string]: string }>({});

  const router = useRouter();

  useEffect(() => {
    fetch(`http://localhost:5000/periode/options`)
      .then((res) => res.json())
      .then((data) => setOptions(data.options))
      .catch((err) => console.error("Gagal mengambil options", err));
  }, []);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setErrors({}); 

    try {
      await login({
        no_hima: noHima,
        periode_id: periodeId,
        password,
      });

      router.push("/");
    } catch (err: any) {
      console.error(err);

      if (err.fieldErrors) {
        setErrors(err.fieldErrors);
      } else {
        setErrors({ general: err.message || "Login gagal" });
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <form className={styles.form} onSubmit={handleLogin}>
        {errors.general && (
          <p className={`${poppins.variable} ${styles.error}`}>{errors.general}</p>
        )}

        <div className={styles.full}>
          <Input
            variant="outline"
            iconLeft={<FaUser size={15} color="black" />}
            placeholder="Nomor Himpunan"
            value={noHima}
            onChange={(e) => setNoHima(e.target.value)}
            error={errors.no_hima} 
          />
        </div>
        <br />
        <div className={styles.full}>
          <Dropdown
            options={options}
            onChange={(e) => setPeriodeId(e.target.value)}
            iconLeft={<FaCalendar size={15} color="black" />}
            iconRight={<ChevronDown size={15} color="black" />}
            placeholder="Pilih periode kepengurusan"
            variant="outline"
            className={`${poppins.variable} ${styles.drop}`}
          />
        </div>
        <br />
        <div className={styles.full}>
          <PasswordInput
            variant="outline"
            iconLeft={<FaLock size={15} color="black" />}
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            error={errors.password}
          />
        </div>
        <br />
            <Button color="secondary" className={styles.btn} disabled={loading}>
                {loading ? "Loading..." : "LOGIN"}
            </Button>
      </form>
    </div>
  );
}
