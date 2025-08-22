import { Dropdown } from "@/components/dropdown/dropdown"
import { Button } from "@/components/button/button"
import { Input } from "@/components/input/input"
import { FaFilter, FaSearch, FaPlus } from "react-icons/fa"
import styles from "@/styles/layouts/pengurus.module.css";

const options = [
    {label: "2023/2024", value:"20232024"},
    {label: "2024/2025", value:"20242025"}
]

interface Props{
    onAddClick: () => void;
}

export default function PengurusNavbar({onAddClick} : Props){
    return(
        <div className={styles.container}>
            <div className={styles.filter}>
                <Dropdown 
                    options={options} 
                    placeholder="Periode"
                    iconLeft={<FaFilter size={10}/>}
                    customSize="sm"
                    variant="solid"
                />
                <Dropdown 
                    options={options} 
                    placeholder="Divisi"
                    iconLeft={<FaFilter size={10}/>}
                    customSize="sm"
                    variant="solid"
                />
                <Input 
                    type="search"
                    iconLeft={<FaSearch size={13}/>}
                    variant="solid"
                    placeholder="Cari data pengurus"
                    className={styles.search}
                />
            </div>
            <div>
                <Button iconLeft={<FaPlus size={10}/>} size="sm" onClick={onAddClick}>
                    Akun Pengurus
                </Button>
            </div>
        </div>
    )
}