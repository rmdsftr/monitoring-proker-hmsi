"use client";

import Watermark from "@/layouts/watermark";
import img from "@/assets/images/unand.webp";
import styles from "@/styles/pages/token.module.css";
import NewKahimLayout from "@/layouts/periode/create-kahim";
import { useState } from "react";
import FinalPeriodeLayout from "@/layouts/periode/final";

export default function AddKahim(){
    const [kahimLayout, setKahimLayout] = useState<"default" | "add">("default")
    return(
        <div className={styles.wallpaper} style={{backgroundImage: `url(${img.src})`}}>
            <div className={styles.container}>
                <div className={styles.watermak}>
                    <Watermark/>
                </div>
                <div className={styles.content}>
                    <NewKahimLayout mode={kahimLayout} onChange={setKahimLayout}/>
                </div>
            </div>
        </div>
    )
}