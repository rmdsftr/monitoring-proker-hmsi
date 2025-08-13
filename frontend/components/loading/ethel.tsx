import Image from "next/image";
import ethel from "@/assets/icons/ethel-spin.gif";
import styles from "@/styles/components/loading.module.css";
import { poppins } from "../fonts/fontname";

export default function EthelLoading(){
    return(
        <div className={`${poppins.variable} ${styles.ethel}`}>
            <Image
                src={ethel}
                alt=""
                width={60}
                height={60}
                className={styles.cat}
            />
            <p>Loading...</p>
        </div>
    )
}