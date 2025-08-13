import Image, { StaticImageData } from "next/image";
import styles from "@/styles/components/profil-corner.module.css";
import { poppins } from "../fonts/fontname";
import { ChevronDown } from "lucide-react";

interface Props{
    foto: StaticImageData;
    nickname: string;
}

export default function ProfilCornerMaster({foto, nickname} : Props){
    return(
        <div className={`${poppins.variable} ${styles.corner}`}>
            <Image
                src={foto}
                alt=""
                width={20}
                height={20}
                className={styles.foto}
            />
            <p>{nickname}</p>
            <ChevronDown color="black" size={20}/>
        </div>
    )
}