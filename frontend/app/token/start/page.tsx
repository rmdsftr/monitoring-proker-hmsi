"use client";

import Watermark from "@/layouts/watermark";
import img from "@/assets/images/unand.webp";
import styles from "@/styles/pages/token.module.css";
import FormLogin from "@/layouts/login";
import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function Aktivasi(){
    const router = useRouter();

    useEffect(() => {
        const visited = sessionStorage.getItem('visitedTokenPage');
        if(!visited){
            router.replace("/token")
        }
    }, [])

    return(
        <div className={styles.wallpaper} style={{backgroundImage: `url(${img.src})`}}>
            <div className={styles.container}>
                <div className={styles.watermak}>
                    <Watermark/>
                </div>
                <div className={styles.content}>
                    <FormLogin/>
                </div>
            </div>
        </div>
    )
}