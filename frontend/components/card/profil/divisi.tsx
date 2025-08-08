import { StaticImageData } from "next/image";
import Image from "next/image";
import { poppins } from "@/components/fonts/fontname";
import styles from "@/styles/components/profil-divisi.module.css";

interface Props{
    foto: StaticImageData;
    id_divisi: string;
    divisi:string;
    deskripsi:string;
    visi:string;
    misi:string[];
}


export default function ProfilDivisi({foto, id_divisi, divisi, deskripsi, visi, misi} : Props){
    return(
        <div className={styles.background}>
            <Image
                src={foto}
                alt={divisi}
                height={400}
                width={400}
                className={styles.img}
            />
            <div className={`${poppins.variable} ${styles.main}`}>
                <h2 className={styles.title}>DIVISI {id_divisi}</h2>
                <h2 className={styles.divisi}>{divisi}</h2>
                <p className={styles.desc}>{deskripsi}</p>

                <div className={styles.gap}>
                    <h5 className={styles.sub}>Visi</h5>
                    <p className={styles.content}><i>{visi}</i></p>
                </div>

                <div className={styles.misi}>
                    <h5 className={styles.sub}>Misi</h5>
                    <ol className={styles.content}>
                        {misi.map((point, index) => (
                        <li key={index}>{point}</li>
                        ))}
                    </ol>
                </div>
            </div>
        </div>

    )
}