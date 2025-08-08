"use client"

import { ProfilDivisiDummy } from "@/libs/dummy/divisi.dummy";
import { notFound } from "next/navigation";
import { Sidebar } from "@/layouts/sidebar";
import ProfilDivisi from "@/components/card/profil/divisi";
import styles from "@/styles/pages/profil-divisi.module.css";

interface Props{
    params: {
        slug:string;
    }
}

export default function ProfilDivisiPage({params} : Props){
    const data = ProfilDivisiDummy.find((m) => m.slug === params.slug);
    if(!data) return notFound();

    return(
        <div className={styles.background}>
            <Sidebar/>
            <div className={styles.container}>
                <ProfilDivisi
                    foto={data.foto}
                    id_divisi={data.id_divisi}
                    divisi={data.divisi}
                    deskripsi={data.deskripsi}
                    visi={data.visi}
                    misi={data.misi}
                />
            </div>
        </div>
    )
}