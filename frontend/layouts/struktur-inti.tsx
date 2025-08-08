import ContentLeft from "@/components/card/struktur-inti/kiri"
import RightContent from "@/components/card/struktur-inti/kanan"
import inti from "@/assets/images/kahim.jpg";
import styles from "@/styles/layouts/menuinti.module.css";

export default function StrukturIntiLayout(){
    return(
        <div className={styles.main}>
            <div>
                <ContentLeft jabatan="Ketua Himpunan" link="/inti/kahim"/>
                <ContentLeft jabatan="Wakil Ketua Himpunan" link="/inti/wakahim"/>
                <div className={styles.sejajar}>
                    <ContentLeft jabatan="Bendahara Umum" link="/inti/bendum"/>
                    <ContentLeft jabatan="Sekretaris Umum" link="/inti/sekum"/>
                </div>
            </div>
            <RightContent gambar={inti} periode="2024/2025"/>
        </div>
    )
}