"use client";

import styles from "@/styles/pages/home.module.css";
import { Logo } from "@/components/sidebar/head";
import { TopRight } from "@/layouts/navbar";
import Link from "next/link";
import { Welcome } from "@/layouts/landing";
import { poppins } from "@/components/fonts/fontname";

export default function Home() {

  const misiData = [
    "Meningkatkan kualitas dan profesionalitas anggota HMSI melalui pengembangan kompetensi dasar dan soft skills.",
    "Membangun budaya organisasi yang berintegritas, inovatif, dan berorientasi pada hasil untuk menciptakan periode kepengurusan yang berkualitas.",
    "Memperkuat jejaring dan kerjasama dengan berbagai pihak, baik internal maupun eksternal kampus, untuk meningkatkan peluang pengembangan diri anggota HMSI.",
    "Mengoptimalkan fungsi HMSI sebagai wadah aspirasi, kreativitas, dan pengembangan potensi mahasiswa Sistem Informasi.",
    "Menyelenggarakan program kerja yang berfokus pada peningkatan kualitas akademik, non akademik, dan pengabdian.",
    "Meningkatkan peran HMSI dalam pengembangan kompetensi teknologi informasi dan kewirausahaan.",
    "Memfasilitasi dan mendorong anggota HMSI untuk aktif dalam kegiatan akademik, non-akademik, dan pengabdian masyarakat yang relevan dengan bidang Sistem Informasi."
  ];

  return (
    <div>
      <div>
        <div className={styles.container}>
          <Link href="/inti" className={styles.link}>
            <Logo size={30} />
          </Link>

          <div className={styles.float}>
              <Link href="/login" style={{ textDecoration: "none" }}>
                <TopRight />
              </Link>
          </div>
        </div>

        <div className={styles.landing}>
          <Welcome 
            periode="2024/2025"
            visi="Mewujudkan HMSI Universitas Andalas sebagai organisasi yang memiliki integritas dan profesionalitas dalam mengoptimalkan potensi mahasiswa Sistem Informasi melalui keunggulan akademik, non akademik, dan ketaqwaan."
            misi={
            <ul className={`${poppins.variable} ${styles.two}`}>
              {misiData.map((item, idx) => (
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
