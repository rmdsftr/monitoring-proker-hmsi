import Head from "@/components/sidebar/head"
import MenuList from "@/components/sidebar/body"
import styles from "@/styles/layouts/sidebar.module.css";
import Link from "next/link";

export function Sidebar(){
    return(
        <div className={styles.background}>
            <Link href="/" className={styles.link}>
                <Head periode="2024/2025"/>
            </Link>
            <MenuList></MenuList>
        </div>
    )
}