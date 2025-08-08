'use client'
import styles from "@/styles/pages/divisi.module.css";

import { Sidebar } from "@/layouts/sidebar";
import StrukturIntiLayout from "@/layouts/struktur-inti";

export default function Inti(){
    return(
        <div className={styles.background}>
            <Sidebar/>
            <StrukturIntiLayout/>
        </div>
    )
}