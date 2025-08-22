import { FaPen, FaTrash, FaPlus } from "react-icons/fa";
import styles from "@/styles/layouts/visimisi.module.css";

export type VisiType = {
  id_visi: string;
  visi: string;
  id_periode: string;
  created_at: string;
  updated_at: string;
};

type MisiType = {
  id_misi: string;
  misi: string;
};

type Props = {
  visi?: VisiType | null;
  misi: MisiType[];
  onEditVisi?: (id_visi:string, visi:string) => void;
  onAddVisi?: () => void;
  onDeleteVisi?: (id_visi:string) => void;

  onEditMisi?: (id_misi: string, misi:string) => void;
  onDeleteMisi?: (id_misi: string) => void;
  onAddMisi?: () => void;
  loading?: boolean;
  errors?: string | null;
};

export default function VisiMisiLayout({
  visi,
  misi,
  onEditVisi,
  onAddVisi,
  onDeleteVisi,

  onEditMisi,
  onDeleteMisi,
  onAddMisi
}: Props) {
  return (
    <div className={styles.container}>
    
      <div className={styles.visi}>
        <h4>VISI</h4>
        {visi ? (
          <div className={styles.vision}>
            <div
              className={`${styles.editvisi} ${styles.tooltip}`}
              onClick={() => onEditVisi?.(visi.id_visi, visi.visi)}
              data-tooltip="Edit visi"
            >
              <FaPen size={14} />
            </div>
            <p>{visi?.visi}</p> 
            <div
              className={`${styles.editmisi} ${styles.hapus} ${styles.tooltip}`}
              onClick={() => visi && onDeleteVisi?.(visi?.id_visi)}
              data-tooltip="Hapus visi"
            >
              <FaTrash size={14} />
            </div>
          </div>
        ) : (
          <div
            className={`${styles.add} ${styles.tooltip}`}
            onClick={onAddVisi}
            data-tooltip="Tambah visi baru"
          >
            <FaPlus size={14} />
            <p>Tambah visi</p>
          </div>
        )}
      </div>

    
      <div className={styles.misi}>
        <h4>MISI</h4>
        {misi.map((item) => (
          <div className={styles.mision} key={item.id_misi}>
            <div
              className={`${styles.editmisi} ${styles.tooltip}`}
              onClick={() => onEditMisi?.(item.id_misi, item.misi)}
              data-tooltip="Edit misi"
            >
              <FaPen size={14} />
            </div>
            <p>{item.misi}</p> 
            <div
              className={`${styles.editmisi} ${styles.hapus} ${styles.tooltip}`}
              onClick={() => misi && onDeleteMisi?.(item.id_misi)}
              data-tooltip="Hapus misi"
            >
              <FaTrash size={14} />
            </div>
          </div>
        ))}
        <div
          className={`${styles.add} ${styles.tooltip}`}
          onClick={onAddMisi}
          data-tooltip="Tambah misi baru"
        >
          <FaPlus size={14} />
          <p>Tambah misi</p>
        </div>
      </div>
    </div>
  );
}
