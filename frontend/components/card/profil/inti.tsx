import { StaticImageData } from "next/image";
import Image from "next/image";
import styles from "@/styles/components/profil-inti.module.css";
import { poppins } from "@/components/fonts/fontname";

interface Props{
    foto: StaticImageData;
    divisi: string;
    nama:string;
    panggilan:string;
    no_hima:string;
    nim:string;
    kehadiran:number;
    performa: number;
    proker:number;
    progress:number;
}

export default function CardProfilInti({foto, divisi, nama, panggilan, no_hima, nim, kehadiran, performa, proker, progress}: Props){
    return(
        <div className={styles.background}>
            <Image
                src={foto}
                alt={nama}
                height={275}
                width={275}
                className={styles.img}
            />
            <div className={`${poppins.variable} ${styles.data}`}>
                <div>
                    <h2 className={styles.jabatan}>{divisi}</h2>
                    <h2 className={styles.nama}>{nama}</h2>
                    <p className={styles.panggilan}>{panggilan}</p>
                    <div className={styles.sejajar}>
                        <br />
                        <p>{no_hima}</p>
                        <p className={styles.jarak}>|</p>
                        <p>{nim}</p>
                    </div>
                </div>
                <div className={styles.row}>
                    <div className={styles.col}>
                        <h2 className={styles.positif}>{kehadiran}<span>%</span></h2>
                        <p>Kehadiran</p>
                    </div>
                    <div className={styles.col}>
                        <h2 className={styles.positif}>{performa}<span>%</span></h2>
                        <p>Performa Kinerja</p>
                    </div>
                    <div className={styles.col}>
                        <h2 className={styles.default}>{proker}</h2>
                        <p>Program Kerja</p>
                    </div>
                    <div className={styles.col}>
                        <h2 className={styles.default}>{progress}</h2>
                        <p>Terlaksana</p>
                    </div>
                </div>
            </div>
        </div>
    )
}