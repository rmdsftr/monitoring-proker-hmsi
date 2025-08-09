import Image, { StaticImageData } from "next/image";
import img1 from "@/assets/images/logo-hmsi.png";
import img2 from "@/assets/images/logo-unand.png";
import styles from "@/styles/layouts/watermark.module.css";

interface LogoProps{
    img: StaticImageData;
    size:number;
}

function LogoWatermark({img, size} : LogoProps){
    return(
        <div>
            <Image
            src={img}
            alt=""
            height={size}
        />
        </div>
    )
}

export default function Watermark(){
    return(
        <div className={styles.background}>
            <LogoWatermark img={img1} size={30}/>
            <LogoWatermark img={img2} size={30}/>
        </div>
    )
}