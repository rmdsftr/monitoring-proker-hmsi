"use client";

import Link from "next/link"
import { Button } from "@/components/button/button";
import styles from "@/styles/layouts/navbar.module.css";
import { poppins } from "@/components/fonts/fontname";
import { userStore } from "@/store/user";
import ProfilSidebar from "@/components/sidebar/profil";
import img from "@/assets/images/kahim.jpg";
import wp from "@/assets/images/unand.webp"
import React from "react";

export function TopRight(){
    const user = userStore((state) => state.user);
    return(
        <div className={`${poppins.variable} ${styles.align}`}>
            <Link href="/#visi" className={styles.link}>Visi</Link>
            <Link href="/#misi" className={styles.link}>Misi</Link>

            {user ? (
                <ProfilSidebar gambar={img} nama={user.panggilan}/>
            ) : (
                <Button color="secondary" variant="solid" size="md">Login</Button>
            )}
        </div>
    )
}