import Image from "next/image";
import logo from "@/assets/images/logo-hmsi.png";
import styles from "@/styles/components/sidebar.module.css";
import { maname } from "../fonts/fontname";

interface HeadProps{
    periode:string;
}

interface LogoProps{
    size:number;
}

export function Logo({size} : LogoProps){
    return(
        <Image
            src={logo}
            alt="logo hmsi"
            width={size+50}
            height={size}
        />
    )
}

export function Title({periode} : {periode:string}){
    return(
        <div className={styles.gap}>
            <h5 className={`${maname.variable} ${styles.font}`}>HMSI {periode}</h5>
        </div>
    )
}

export default function Head({periode}: HeadProps){
    return(
        <div className={styles.middle}>
            <Logo size={50}/>
            <Title periode={periode} />
            <hr className={styles.line} />
        </div>
    )
}