import Head from "@/components/sidebar/head"
import MenuList from "@/components/sidebar/body"
import styles from "@/styles/layouts/sidebar.module.css";
import Link from "next/link";
import ProfilSidebar from "@/components/sidebar/profil";
import img from "@/assets/images/kahim.jpg";
import { userStore } from "@/store/user";

export function Sidebar(){
    const user = userStore((state) => state.user);

    return(
        <div className={styles.background}>
            <div>
                <Link href="/" className={styles.link}>
                    <Head periode="2024/2025"/>
                </Link>
                <MenuList/>
            </div>
            <div className={styles.person}>
                {user ? (
                    <ProfilSidebar gambar={img} nama={user.panggilan}/>
                ) : (null)}
            </div>
        </div>
    )
}