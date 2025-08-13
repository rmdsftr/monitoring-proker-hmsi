"use client";

import Image from "next/image"
import Link from "next/link";
import { poppins } from "../fonts/fontname";
import { usePathname } from "next/navigation";
import styles from "@/styles/components/background.module.css";
import React from "react";
import ProfilCornerMaster from "./profilcorner";
import img from "@/assets/images/kahim.jpg"
import hmsi from "@/assets/images/logo-hmsi.png";
import { maname } from "../fonts/fontname";
import { userStore } from "@/store/user";

interface Props{
    periode:String;
}

export default function NavbarMaster({periode} : Props){
    const pathname = usePathname();
    const user = userStore((state) => state.user);

    const menus = [
        {menu:"Pengurus", href:"/m/pengurus"},
        {menu: "Visi & Misi", href:"/m/visimisi"},
        {menu: "POTM & SOTM", href:"/m/psotm"},
        {menu: "Setting", href:"/m/setting"}
    ]

    return(
        <div className={styles.navbar}>
            <div className={`${maname.variable} ${styles.left}`}>
                <Link href="/" className={styles.back}>
                    <Image
                        src={hmsi}
                        alt=""
                        width={50}
                    />
                    <p>HMSI <span>{periode}</span></p>
                </Link>
            </div>
            <div className={styles.right}>
                {menus.map((m) => (
                    <Link
                        key={m.href}
                        href={m.href}
                        className={`${poppins.variable} ${styles.link} ${pathname === m.href ? styles.active:""}`}
                    >
                    {m.menu}
                    </Link>
                ))}
                <div className={styles.profil}>
                    {user ? (
                        <ProfilCornerMaster foto={img} nickname={user.panggilan}/>
                    ) : (null)}
                </div>
            </div>
        </div>
    )
}