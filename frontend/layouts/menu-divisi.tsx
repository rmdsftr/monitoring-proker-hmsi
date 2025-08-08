import CardDivisi from "@/components/card/menu-divisi/card"
import styles from "@/styles/layouts/menudivisi.module.css";

export default function MenuDivisi(){
    return(
        <div className={styles.wrapped}>
            <CardDivisi singkatan="PSDM" kepanjangan="Pengembangan Sumber Daya Manusia" href="/divisi/psdm"/>
            <CardDivisi singkatan="PSI" kepanjangan="Pengembangan Skill dan Intelektual" href="/divisi/psi"/>
            <CardDivisi singkatan="EKSTERNAL" kepanjangan="Eksternal" href="/divisi/eksternal"/>
            <CardDivisi singkatan="INTERNAL" kepanjangan="Internal" href="/divisi/internal"/>
            <CardDivisi singkatan="MEDKRAF" kepanjangan="Media Kreatif" href="/divisi/medkraf"/>
            <CardDivisi singkatan="BIKRAF" kepanjangan="Bisnis Kreatif" href="/divisi/bikraf"/>
            <CardDivisi singkatan="RTK" kepanjangan="Rumah Tangga dan Kesekretariatan" href="/divisi/rtk"/>
        </div>
    )
}