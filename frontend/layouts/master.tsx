import { poppins } from "@/components/fonts/fontname";
import NavbarMaster from "@/components/master/background"
import styles from "@/styles/layouts/master.module.css";

interface Props{
    children: React.ReactNode;
}

export default function MasterLayout({children} : Props){
    return(
        <div className={styles.container}>
            <NavbarMaster periode="2024/2025"/>
            <div className={`${poppins.variable} ${styles.content}`}>
                {children}
            </div>
        </div>
    )
}