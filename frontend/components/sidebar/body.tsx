import Link from "next/link"
import styles from "@/styles/components/sidebar.module.css";
import { usePathname } from "next/navigation";
import { poppins } from "../fonts/fontname";

export default function MenuList(){
    const pathname = usePathname();

    const menus = [
        {menu:"Inti", href:"/inti"},
        {menu:"Divisi", href:"/divisi"},
        {menu:"POTM", href:"/potm"},
        {menu:"SOTM", href:"/sotm"},
        {menu:"Program Kerja", href:"/proker"},
        {menu:"Timeline", href:"/timeline"},
        {menu:"Absensi", href:"/absensi"}
    ]

    return(
        <div className={styles.out}>
            {menus.map((m) => (
                <Link
                    key={m.href}
                    href={m.href}
                    className={`${poppins.variable} ${styles.gaplist} ${pathname === m.href ? styles.active:""}`}
                >
                {m.menu}
                </Link>
            ))}
        </div>
    )
}