import Link from "next/link"
import { Button } from "@/components/button/button";
import styles from "@/styles/layouts/navbar.module.css";
import { poppins } from "@/components/fonts/fontname";

export function TopRight(){
    return(
        <div className={`${poppins.variable} ${styles.align}`}>
            <Link href="/visi" className={styles.link}>Visi</Link>
            <Link href="/misi" className={styles.link}>Misi</Link>
            <Button color="secondary" variant="solid" size="md">Login</Button>
        </div>
    )
}

interface props{
    periode:string;
}

export function Welcome({periode}: props){
    return(
        <div className={`${poppins.variable} ${styles.welcome}`}>
            <h1>Himpunan</h1>
            <h1>Mahasiswa</h1>
            <h1>Sistem Informasi</h1>
            <h3>Periode <span>{periode}</span></h3>
        </div>
    )
}