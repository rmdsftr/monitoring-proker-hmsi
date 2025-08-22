"use client";

import styles from "@/styles/pages/home.module.css";
import { Logo } from "@/components/sidebar/head";
import { TopRight } from "@/layouts/navbar";
import Link from "next/link";
import { Welcome } from "@/layouts/landing";
import { poppins } from "@/components/fonts/fontname";
import { useEffect, useState } from "react";
import { LandingService } from "@/services/landing";

export default function Home() {

  const [visi, setVisi] = useState<string>("");
  const [misi, setMisi] = useState<string[]>([]);
  const [periode, setPeriode] = useState<string>("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await LandingService();
        if(data){
          setVisi(data.visi?.visi || "");
          setMisi(Array.isArray(data.misi) ? data.misi.map((item:any) => item.misi) : [data.misi?.misi].filter(Boolean));
          setPeriode(data.periode || "")
        }
      } catch (error) {
        console.error("Gagal load landing data : ", error);
      }
    }

    fetchData();
  }, [])

  return (
    <div>
      <div>
        <div className={styles.container}>
          <Link href="/inti" className={styles.link}>
            <Logo size={30} />
          </Link>

          <div className={styles.float}>
              <TopRight />
          </div>
        </div>

        <div className={styles.landing}>
          <Welcome 
            periode={periode || "???"}
            visi={visi}
            misi={
            <ul className={`${poppins.variable} ${styles.two}`}>
              {misi.map((item, idx) => (
                <li key={idx}>{item}</li>
              ))}
            </ul>
            }
          />
        </div>
      </div>
    </div>
  );
}
