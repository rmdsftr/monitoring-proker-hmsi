import { Input } from "@/components/input/input";
import Table from "@/components/table/table";
import { Button } from "@/components/button/button";
import Radio from "@/components/button/radio";
import styles from "@/styles/layouts/new-kahim.module.css";
import { FaSearch, FaPlus } from "react-icons/fa";
import React, { useEffect, useState } from "react";
import { poppins } from "@/components/fonts/fontname";
import { AddKahimService } from "@/services/periode";
import { KahimPayload } from "@/types/periode";
import { useRouter } from "next/navigation";
import { GetCurrentPengurus } from "@/services/pengurus";
import EthelLoading from "@/components/loading/ethel";

interface Props{
    mode: "default" | "add";
    onChange: (mode: "default" | "add") => void;
}

function AddKahimLayout({onBack} : {onBack : () => void}){
    const router = useRouter();

    const [nama, setNama] = useState("");
    const [panggilan, setPanggilan] = useState("");
    const [nohima, setNohima] = useState("");
    const [nim, setNim] = useState("")

    const [loading, setLoading] = useState(false);
    const [errors, setErrors] = useState<string | undefined>(undefined);

    const handleSubmit = async(e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true)
        setErrors(undefined)

        const payload: KahimPayload = {
            nama: nama,
            panggilan: panggilan,
            nohima: nohima,
            nim: nim
        }

        try {
            const result = await AddKahimService(payload);
            if(result){
                router.push("/periode/end")
            }
        } catch (error:any) {
            setErrors(error?.message || "Gagal menambahkan kahim baru");

            setTimeout(() => {
                setErrors(undefined);
            }, 3000);
        } finally {
            setLoading(false)
        }
    }

    return(
        <div className={styles.add}>
            {errors && (
                <p className={styles.error}>{errors}</p>
            )}
            <form onSubmit={handleSubmit}>
                <Input 
                    placeholder="Nama Lengkap"
                    variant="ghost"
                    size="medium"
                    value={nama}
                    onChange={(e) => setNama(e.target.value)}
                />
                <br />
                <Input
                    placeholder="Panggilan"
                    variant="ghost"
                    size="medium"
                    value={panggilan}
                    onChange={(e) => setPanggilan(e.target.value)}
                />
                <br />
                <Input
                    placeholder="No. Himpunan"
                    variant="ghost"
                    size="medium"
                    value={nohima}
                    onChange={(e) => setNohima(e.target.value)}
                />
                <br />
                <Input
                    placeholder="NIM"
                    variant="ghost"
                    size="medium"
                    value={nim}
                    onChange={(e) => setNim(e.target.value)}
                />
                <br />
                <div className={styles.btn}>
                    <Button 
                        variant="outline" 
                        color="primary" 
                        className={styles.button}
                        onClick={onBack}
                        type="button"
                    >
                        Kembali
                    </Button>
                    <Button className={styles.button} type="submit">
                        {loading ? "Mendaftarkan kahim..." : "Daftarkan"}
                    </Button>
                </div>
            </form>
        </div>
    )
}

export default function NewKahimLayout({mode, onChange} : Props){
    const [selected, setSelected] = useState<string | null>(null);
    const [loading, setLoading] = useState(false);
    const [calonKahim, setCalonKahim] = useState<string[]>([]);

    useEffect(() => {
        setLoading(true);
        const fetchAnggota = async() => {
            try {
                const data = await GetCurrentPengurus();
                const mapped = data.map((item : any) => ({
                    nama: item.anggota.nama,
                    panggilan: item.anggota.panggilan,
                    nohima: item.anggota.nohima,
                    nim: item.anggota.nim
                }))

                setCalonKahim(mapped)
            } catch (error) {
                throw error;
            } finally {
                setLoading(false)
            }
        }
        fetchAnggota();
    }, [])

    const columns = [
            { key: "nama", header: "Nama", align: "left" as const },
            { key: "nohima", header: "No. HIMA", align: "left" as const },
            { key: "nim", header: "NIM", align: "left" as const },
            { key: "panggilan", header: "Panggilan", align: "left" as const },
            {
                key: "pilih",
                header: "Pilih",
                align: "center" as const,
                render: (row:any) => {
                return <Radio label=""
                    name=""
                    value={row.nim}
                    checked={selected === row.nim}
                    onChange={() => setSelected(row.nim)}
                    variant="primary"/>;
                },
            }
    ]

    return(
        <div className={`${styles.container} ${poppins.variable}`}>
            <div className={styles.space}>
                {mode === "default" ? (
                    <div className={styles.content}>
                    <h5>Pilih akun atau buat akun baru untuk Ketua Himpunan periode yang baru</h5>
                    <div className={styles.nav}>
                        <Input 
                            variant="ghost" 
                            iconRight={<FaSearch size={15}/>}
                            placeholder="Cari nama ketua himpunan"
                            className={styles.search}
                        />
                        <Button size="sm" iconLeft={<FaPlus/>} onClick={() => onChange("add")}>
                            Kahim
                        </Button>
                    </div>
                    <div>
                        {loading ? (
                            <div className={styles.cat}>
                                <EthelLoading/>
                            </div>
                        ) : (
                            <Table
                                data={calonKahim}
                                columns={columns}
                            />
                        )}
                    </div>
                </div>
                ) : (
                    <div className={styles.content}>
                        <AddKahimLayout
                            onBack={() => onChange("default")}
                        />
                    </div>
                )}
            </div>
        </div>
    )
}