'use client'
import styles from "@/styles/pages/divisi.module.css";

import { Sidebar } from "@/layouts/sidebar";
import MenuDivisi from "@/layouts/menu-divisi";

export default function Divisi(){
    return(
        <div className={styles.background}>
            <Sidebar/>
            <MenuDivisi/>
        </div>
    )
}