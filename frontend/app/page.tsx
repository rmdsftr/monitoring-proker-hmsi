import Image from "next/image";
import img from "@/assets/images/unand.webp";
import styles from "@/styles/pages/home.module.css";
import { Logo } from "@/components/sidebar/head";
import { TopRight } from "@/layouts/navbar";
import Link from "next/link";
import { Welcome } from "@/layouts/navbar";
import Footer from "@/layouts/footer";

export default function Home() {
  return (
    <div>
        <div className={styles.wallpaper} style={{backgroundImage: `url(${img.src})`}}>
        <div className={styles.container}>
          <Link href="/inti" className={styles.link}>
                <Logo size={30}/>
          </Link>
          <div className={styles.float}>
            <TopRight/>
          </div>
        </div>
        <div className={styles.welcome}>
            <Welcome periode="2024/2025"></Welcome>
        </div>
      </div>
      <div>
          <Footer/>
      </div>
    </div>
  );
}
