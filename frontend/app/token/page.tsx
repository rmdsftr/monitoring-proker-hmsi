"use client";

import Watermark from "@/layouts/watermark";
import img from "@/assets/images/unand.webp";
import styles from "@/styles/pages/token.module.css";
import { poppins } from "@/components/fonts/fontname";
import TokenForm from "@/layouts/token";
import { useEffect } from "react";

export default function AktivasiPage() {
  useEffect(() => {
    sessionStorage.setItem('visitedTokenPage', 'true')
  },[])

  return (
    <div className={styles.wallpaper} style={{ backgroundImage: `url(${img.src})` }}>
      <div className={styles.container}>
        <div className={styles.watermak}>
          <Watermark />
        </div>
        <div className={styles.container2}>
          <div className={`${poppins.variable} ${styles.form}`}>
            <TokenForm />
          </div>
        </div>
      </div>
    </div>
  );
}
