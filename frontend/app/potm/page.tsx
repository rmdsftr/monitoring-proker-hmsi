'use client'
import styles from "@/styles/pages/divisi.module.css";

import { Sidebar } from "@/layouts/sidebar";
import POTMLayout from "@/layouts/potm";

export default function Potm(){
    return(
        <div className={styles.background}>
            <Sidebar/>
            <POTMLayout/>
        </div>
    )
}