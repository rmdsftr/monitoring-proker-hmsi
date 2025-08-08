import Image from "next/image";
import { StaticImageData } from "next/image";
import styles from "@/styles/components/card-struktur-inti.module.css";
import { poppins } from "@/components/fonts/fontname";

interface ContentRightProps {
  periode: string;
  gambar: StaticImageData;
}

export default function RightContent({ periode, gambar }: ContentRightProps) {
  return (
    <div className={styles.container}>
      <Image
        src={gambar}
        alt="inti"
        height={450}
        width={450}
        className={styles.img}
      />
      <div className={`${poppins.variable} ${styles.identity}`}>
        <h6>Presidium Inti Periode {periode}</h6>
      </div>
    </div>
  );
}
