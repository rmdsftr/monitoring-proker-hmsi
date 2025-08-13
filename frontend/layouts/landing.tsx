"use client";

import styles from "@/styles/layouts/landing.module.css";
import wp from "@/assets/images/unand.webp";
import { poppins } from "@/components/fonts/fontname";
import Footer from "./footer";
import { usePathname } from "next/navigation";
import { useEffect } from "react";
import FadeInOnScroll from "@/utils/fadeInScroll";
import { motion } from "framer-motion";
import { Button } from "@/components/button/button";
import Link from "next/link";
import { userStore } from "@/store/user";

interface props{
    periode:string;
    visi: React.ReactNode;
    misi: React.ReactNode;
}

export function Welcome({periode, visi, misi}: props){
    const pathname = usePathname();
    const user = userStore((state) => state.user);

    useEffect(() => {
        if(pathname === '/'){
            const hash = window.location.hash;
            if(hash){
                const id = hash.substring(1);
                const el = document.getElementById(id);
                if(el){
                    el.scrollIntoView({behavior: "smooth"})
                }
            }
        }
    }, [pathname])

    return(
        <div>
            <section id="home" className={`${poppins.variable} ${styles.home}`} style={{ backgroundImage: `url(${wp.src})` }}>
                <motion.div 
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, ease: "easeOut" }}
                    className={styles.content}
                >
                    <h1>Himpunan</h1>
                    <h1>Mahasiswa</h1>
                    <h1>Sistem Informasi</h1>
                    <h3>Periode <span>{periode}</span></h3>
                    <br />

                    {user ? (
                        <Link href="/master" className={styles.kelola}>
                            <Button variant="outline" color="primary" size="md">Kelola Data Master</Button>
                        </Link>
                    ) : (null)}
                </motion.div>
            </section>
            <section id="visi" className={`${poppins.variable} ${styles.visi}`}>
                <h4>VISI</h4>
                <FadeInOnScroll id="visi">
                    <p><span>❝</span> {visi} <span>❞</span></p>
                </FadeInOnScroll>
            </section>
            <section id="misi" className={styles.misi}>
                <h4>MISI</h4>
                <FadeInOnScroll id="misi">
                    {misi}
                </FadeInOnScroll>
            </section>
            <div className={styles.footer}>
                <Footer/>
            </div>
        </div>
    )
}