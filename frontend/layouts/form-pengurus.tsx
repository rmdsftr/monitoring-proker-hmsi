import PopupFormLayout from "./popup-form";
import { Input } from "@/components/input/input";
import { Dropdown } from "@/components/dropdown/dropdown";
import { Button } from "@/components/button/button";
import { FaUserPlus, FaUser, FaUserLock, FaUserCog } from "react-icons/fa";
import styles from "@/styles/layouts/form-pengurus.module.css";
import { ChevronDown } from "lucide-react";
import { poppins } from "@/components/fonts/fontname";
import React, { useEffect, useState } from "react";
import { GetAllDivisi } from "@/services/divisi";
import { GetJabatan } from "@/services/jabatan";
import { AddCurrentPengurus } from "@/services/pengurus";
import { useRouter } from "next/navigation";

interface Props{
    isOpen:boolean;
    onClose: () => void;
    onConfirm: (message:string, type: "success" | "error") => void;
}

export default function PopupFormPengurus({isOpen, onClose, onConfirm} : Props){
    if(!isOpen) return null;

    const [options, setOptions] = useState<{ label: string; value: string }[]>([]);
    const [jabatanOptions, setJabatanOptions] = useState<{label:string, value:string}[]>([])
    const [loading, setLoading] = useState(false);

    const [nama, setNama] = useState("");
    const [panggilan, setPanggilan] = useState("");
    const [noHima, setNoHima] = useState("");
    const [nim, setNim] = useState("");
    const [idDivisi, setIdDivisi] = useState("");
    const [idJabatan, setIdJabatan] = useState("");

    useEffect(() => {
        const fetchDivisi = async() => {
            try {
                const data = await GetAllDivisi();
                const mapped = data.map((item: any) => ({
                    label: item.id_divisi,
                    value: item.id_divisi
                }))
                setOptions(mapped)
            } catch (error) {
                throw error;
            }
        }

        const fetchJabatan = async() => {
            try {
                const data = await GetJabatan();
                const mapped = data.map((item:any) => ({
                    label: item.jabatan,
                    value: item.id_jabatan
                }))
                setJabatanOptions(mapped);
            } catch (error) {
                throw error;
            }
        }

        fetchDivisi();
        fetchJabatan();
    }, []);

    const handleSubmit = async(e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);

        try {
            await AddCurrentPengurus({
                nama: nama,
                panggilan: panggilan,
                no_hima: noHima,
                nim: nim,
                id_divisi: idDivisi,
                id_jabatan: idJabatan
            })
            
            onConfirm("Berhasil menambahkan pengurus", "success");
            onClose();
        } catch (error) {
            const message = error instanceof Error ? error.message : "Gagal menyimpan misi";
            onConfirm(message, "error"); 
            onClose();
        } finally {
            setLoading(false)
        }
    }

    return(
        <PopupFormLayout>
            <div>
                <form onSubmit={handleSubmit}>
                    <div className={styles.container}>
                        <div>
                            <Input
                                placeholder="Nama lengkap pengurus"
                                iconLeft={<FaUserPlus color="black" size={16}/>}
                                value={nama}
                                onChange={(e) => setNama(e.target.value)}
                                required
                            />
                            <br />
                            <Input
                                placeholder="Nama panggilan"
                                iconLeft={<FaUser color="black" size={16}/>}
                                value={panggilan}
                                onChange={(e) => setPanggilan(e.target.value)}
                                required
                            />
                            <br />
                            <Input
                                placeholder="Nomor Himpunan"
                                iconLeft={<FaUserLock color="black" size={16}/>}
                                value={noHima}
                                onChange={(e) => setNoHima(e.target.value)}
                                required
                            />
                            <br />
                            <Input
                                placeholder="NIM"
                                iconLeft={<FaUserCog color="black" size={16}/>}
                                value={nim}
                                onChange={(e) => setNim(e.target.value)}
                                required
                            />
                        </div>
                        <div className={`${styles.rata} ${styles.drop}`}>
                            <Dropdown 
                                options={options}
                                placeholder="Divisi"
                                className={styles.full}
                                iconRight={<ChevronDown/>}
                                value={idDivisi}
                                onChange={(e) => setIdDivisi(e.target.value)}
                                required
                            />
                            <Dropdown 
                                options={jabatanOptions}
                                placeholder="Jabatan"
                                className={styles.full}
                                iconRight={<ChevronDown/>}
                                value={idJabatan}
                                onChange={(e) => setIdJabatan(e.target.value)}
                                required
                            />
                        </div>
                    </div>
                    <i className={`${poppins.variable} ${styles.note}`}>Catatan: password default akun pengurus adalah NIM</i>
                    <div className={`${styles.rata} ${styles.btn}`}>
                        <Button variant="ghost" color="secondary" size="md" 
                            className={styles.full}
                            type="button"
                            onClick={onClose}
                            >Cancel</Button>
                        <Button variant="solid" color="secondary" size="md" 
                            type="submit" disabled={loading}
                            className={styles.full}
                            >Buat Akun</Button>
                    </div>
                </form>
            </div>
        </PopupFormLayout>
    )
}