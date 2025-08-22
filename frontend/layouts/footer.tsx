import { FaInstagram, FaLinkedin, FaGlobe, FaFacebook } from "react-icons/fa"
import { poppins } from "@/components/fonts/fontname"
import styles from "@/styles/layouts/footer.module.css";
import Image from "next/image";
import logounand from "@/assets/images/logo-unand.png";


export default function Footer(){
    return(
        <div className={`${poppins.variable} ${styles.container}`}>
            <div className={styles.info}>
                <div className={styles.rata}>
                    <div>
                        <Image
                            src={logounand}
                            alt=""
                            height={75}
                            className={styles.unand}
                        />
                    </div>
                    <div>
                        <p>Himpunan Mahasiswa Sistem Informasi</p>
                        <p>Departemen Sistem Informasi</p>
                        <p>Fakultas Teknologi Informasi</p>
                        <p>Universitas Andalas</p>
                        <p>Limau manis, Pauh, Padang, Sumatera Barat</p>
                    </div>
                </div>
                <div>
                    <div className={styles.rata}>
                        <FaInstagram size={17} color="#DA7629"/>
                        <a href="https://www.instagram.com/hmsi_unand">hmsi_unand</a>
                    </div>
                    <div className={styles.rata}>
                        <FaLinkedin size={17} color="#DA7629"/>
                        <a href="https://www.linkedin.com/in/hmsi-unand">HMSI Unand</a>
                    </div>
                    <div className={styles.rata}>
                        <FaGlobe size={17} color="#DA7629"/>
                        <a href="https://www.hmsi.si.fti.unand.ac.id/">hmsi.si.fti.unand.ac.id</a>
                    </div>
                    <div className={styles.rata}>
                        <FaFacebook size={17} color="#DA7629"/>
                        <a href="https://www.facebook.com/people/Hmsi-Unand/">Hmsi Unand</a>
                    </div>
                </div>
            </div>
            <div className={styles.credit}>
                <p>© Himpunan Mahasiswa Sistem Informasi 2025. All rights reserved</p>
            </div>
        </div>
    )
}