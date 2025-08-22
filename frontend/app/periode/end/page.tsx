"use client";

import Watermark from "@/layouts/watermark";
import img from "@/assets/images/unand.webp";
import styles from "@/styles/pages/token.module.css";
import FinalPeriodeLayout from "@/layouts/periode/final";

export default function Periode(){
    return(
        <div className={styles.wallpaper} style={{backgroundImage: `url(${img.src})`}}>
            <div className={styles.container}>
                <div className={styles.watermak}>
                    <Watermark/>
                </div>
                <div className={styles.content}>
                    <FinalPeriodeLayout/>
                </div>
            </div>
        </div>
    )
}