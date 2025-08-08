import styles from "@/styles/components/card-struktur-inti.module.css";
import { poppins } from "@/components/fonts/fontname";
import Link from "next/link";

interface ContentLeftProps{
    jabatan:string;
    link:string;
}

export default function ContentLeft({jabatan, link} : ContentLeftProps){
    return(
        <Link href={link} className={styles.linkWrapper}> 
            <div className={`${poppins.variable} ${styles.btn}`}>
                <h3>{jabatan}</h3>
            </div>
        </Link>
    )
}