'use client'

import { Sidebar } from "@/layouts/sidebar";
import { ProfilIntiDummy } from "@/libs/dummy/inti-dummy";
import { notFound } from "next/navigation";
import CardProfilInti from "@/components/card/profil/inti";
import styling from "@/styles/pages/profil-inti.module.css";

interface Props{
    params: {
        slug:string;
    }
}

export default function ProfilInti({params} : Props){
    const data = ProfilIntiDummy.find((m) => m.slug === params.slug);
    if(!data) return notFound();

    return(
        <div className={styling.background}>
            <Sidebar/>
            <div className={styling.container}>
                <CardProfilInti 
                    foto={data.foto}
                    divisi={data.divisi}
                    nama={data.nama}
                    panggilan={data.panggilan}
                    no_hima={data.no_hima}
                    nim={data.nim}
                    kehadiran={100}
                    performa={97}
                    proker={data.proker}
                    progress={data.progress}
                />
            </div>
        </div>
    )
}