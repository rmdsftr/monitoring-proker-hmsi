import CardDivisi from "@/components/card/menu-divisi/card"
import styles from "@/styles/layouts/menudivisi.module.css";
import { useEffect, useState } from "react";
import { GetDivisi } from "@/services/divisi";
import { GetDivisiInterface } from "@/types/divisi";
import EthelLoading from "@/components/loading/ethel";

export default function MenuDivisi(){
    const [loading, setLoading] = useState(false);
    const [divisi, setDivisi] = useState<GetDivisiInterface[]>([]);

    useEffect(() => {
        setLoading(true);
        async function fetchDivisi(){
            try {
                const res = await GetDivisi();
                setDivisi(res);
            } catch (error) {
                throw error;
            } finally {
                setLoading(false)
            }
        }

        fetchDivisi();
    }, [])

    if(loading){
        return(
            <div className={styles.cat}>
                <EthelLoading/>
            </div>
        )
    }

        return(
            <div className={styles.wrapped}>
                {divisi.map((d) => (
                    <CardDivisi 
                        key={d.id_divisi}
                        singkatan={d.id_divisi} 
                        kepanjangan={d.divisi} 
                        href={`/divisi/${d.id_divisi}`} 
                    />
                ))}
            </div>
        )
}