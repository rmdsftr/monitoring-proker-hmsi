import PopupFormLayout from "../popup-form"
import { Button } from "@/components/button/button";
import { Dropdown } from "@/components/dropdown/dropdown";
import styles from "@/styles/layouts/periode/popup-konfirmasi.module.css";
import { poppins } from "@/components/fonts/fontname";
import { FaCalendar } from "react-icons/fa";
import React, { useState } from "react";
import { AddPeriode } from "@/services/periode";
import { useRouter } from "next/navigation";

const currentYear = new Date().getFullYear();

const options = Array.from({ length: 100 }, (_, i) => {
  const year = currentYear + i;
  return { label: year.toString(), value: year.toString() };
});

export default function PopupInputNewPeriode(){
    const router = useRouter();

    const [mulai, setMulai] = useState("");
    const [selesai, setSelesai] = useState("");

    const [loading, setLoading] = useState(false);
    const [errors, setErrors] = useState<string | undefined>(undefined);

    const handleSubmit = async(e: React.FormEvent) => {
        e.preventDefault()
        setLoading(true);

        try {
            const start_year = Number(mulai);
            const end_year = Number(selesai)
            if(end_year >= start_year){
                await AddPeriode(start_year, end_year);
                router.push("/periode/kahim");
            } else {
                setErrors("Tahun mulai tidak boleh lebih besar dari selesai")
                setTimeout(() => {
                    setErrors(undefined);
                }, 3000);
            }
        } catch (error: any) {
            setErrors(error?.message || "Gagal menambahkan periode baru");

            setTimeout(() => {
                setErrors(undefined);
            }, 3000);
        } finally {
            setLoading(false);
        }
    }

    return(
        <div className={`${styles.container} ${poppins.variable} ${styles.lebar} ${styles.content}`}>
            <form onSubmit={handleSubmit}>
                <h4>Perkiraan periode selanjutnya</h4>
                {errors && (
                    <p className={styles.error}>{errors}</p>
                )}
                <div className={styles.drop}>
                    <Dropdown
                        options={options}
                        placeholder="Tahun mulai"
                        iconLeft={<FaCalendar size={12} color="black"/>}
                        className={styles.full}
                        value={mulai}
                        onChange={(val) => setMulai(val.target.value)}
                    />
                    <Dropdown
                        options={options}
                        placeholder="Tahun selesai"
                        iconLeft={<FaCalendar size={12} color="black"/>}
                        className={styles.full}
                        value={selesai}
                        onChange={(val) => setSelesai(val.target.value)}
                    />
                </div>
                <div className={styles.button}>
                    <Button color="secondary" type="submit">
                        {loading ? "Menyimpan..." : "Submit"}
                    </Button>
                    <Button className={styles.back} color="secondary" variant="outline" type="button">
                        Kembali
                    </Button>
                </div>
                <i className={styles.catatan}>Catatan: Jika tahun mulai dan selesai sama, tetap pilih opsi sesuai tahunnya. (Contoh: 2025/2025)</i>
            </form>
        </div>
    )
}