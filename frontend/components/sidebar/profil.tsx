import Image, { StaticImageData } from "next/image";
import styles from "@/styles/components/sidebar.module.css";
import { poppins } from "../fonts/fontname";
import React from "react";

interface Props{
    gambar: StaticImageData;
    nama:string;
}

export default function ProfilSidebar({nama, gambar} : Props){
    return(
        <div className={`${poppins.variable} ${styles.profil}`}>
            <Image
                src={gambar}
                alt=""
                width={25}
                height={25}
                className={styles.foto}
            />
            <p>{nama}</p>
        </div>
    )
}