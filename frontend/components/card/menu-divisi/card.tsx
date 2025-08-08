import styles from "@/styles/components/card-divisi.module.css";
import { poppins } from "@/components/fonts/fontname";
import Link from "next/link";

interface CardProps{
    singkatan:string;
    kepanjangan:string;
    href:string;
}

export default function CardDivisi({ singkatan, kepanjangan, href }: CardProps) {
  return (
    <Link href={href} className={styles.linkWrapper}>
      <div className={`${poppins.variable} ${styles.content}`}>
        <h1 className={styles.pendek}>{singkatan}</h1>
        <hr className={styles.line} />
        <h6 className={styles.panjang}>{kepanjangan}</h6>
      </div>
    </Link>
  );
}


