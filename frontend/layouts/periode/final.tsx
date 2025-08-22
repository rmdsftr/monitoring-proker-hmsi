"use client";

import { Button } from "@/components/button/button"
import PopupFormLayout from "../popup-form"
import styles from "@/styles/layouts/periode/final.module.css";
import { poppins } from "@/components/fonts/fontname";
import Image from "next/image";
import img from "@/assets/images/logo-unand.png";
import { useRef } from "react";
import { QRCodeCanvas } from "qrcode.react";

export default function FinalPeriodeLayout(){
    const tokenRef = useRef<HTMLParagraphElement>(null);

    const handleCopy = () => {
        const token = tokenRef.current?.innerText || "";
        const textToCopy = `url: http://localhost:3000/token
password: NIM
token: ${token}`;

        navigator.clipboard.writeText(textToCopy)
        .then(() => {
            alert("Berhasil menyalin ke clipboard!");
        })
        .catch((err) => {
            console.error("Gagal menyalin:", err);
        });
    };

    return(
        <PopupFormLayout>
            <div className={`${styles.container} ${poppins.variable}`}>
                <div className={styles.kiri}>
                    <div className={styles.qr}>
                        <QRCodeCanvas
                            value="http://localhost:3000/token"
                            size={185}
                            bgColor="#ffffff"
                            fgColor="#000000"
                            level="H"
                        />
                        <i>Ketua himpunan periode baru harap segera melakukan login dengan cara scan QR code berikut. Password default akun adalah NIM. Untuk token, masukkan kode berikut:</i>
                        <div className={styles.token}>
                            <p ref={tokenRef}>jdiowehoihewjijioengknpnpmmdkjel;kf;ke,f'kremm</p>
                            <button onClick={handleCopy}>Salin</button>
                        </div>
                    </div>
                </div>
                <div className={styles.kanan}>
                    <h3>Periode Kepengurusan diamanatkan kepada</h3>
                    <div>
                        <div className={styles.space}>
                            <p>Ketua Himpunan baru :</p>
                            <h5>Fajrin Putra Pratama</h5>
                        </div>
                        <div className={styles.space}>
                            <p>Periode :</p>
                            <h5>2024/2025</h5>
                        </div>
                        <div className={styles.space}>
                            <p>Oleh Ketua Himpunan lama :</p>
                            <h5>Ramadhani Safitri</h5>
                        </div>
                        <div className={styles.space}>
                            <p>Periode :</p>
                            <h5>2024/2025</h5>
                        </div>
                        <Button>Silahkan logout</Button>
                    </div>
                </div>
            </div>
        </PopupFormLayout>
    )
}