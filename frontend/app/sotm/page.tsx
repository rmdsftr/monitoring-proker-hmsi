'use client'
import styles from "@/styles/pages/divisi.module.css";

import { Sidebar } from "@/layouts/sidebar";
import SOTMLayout from "@/layouts/sotm";

export default function Sotm(){
    return(
        <div className={styles.background}>
            <Sidebar/>
            <SOTMLayout/>
        </div>
    )
}