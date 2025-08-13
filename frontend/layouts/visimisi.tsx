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
  onEditVisi?: () => void;
  onAddVisi?: () => void;
  onEditMisi?: (id_misi: string) => void;
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
  onEditMisi,
  onDeleteMisi,
  onAddMisi
}: Props) {
  return (
    <div className={styles.container}>
      {/* VISI */}
      <div className={styles.visi}>
        <h4>VISI</h4>
        {visi ? (
          <div className={styles.vision}>
            <div
              className={`${styles.editvisi} ${styles.tooltip}`}
              onClick={onEditVisi}
              data-tooltip="Edit visi"
            >
              <FaPen size={14} />
            </div>
            <p>{visi?.visi}</p> {/* ambil string dari object */}
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

      {/* MISI */}
      <div className={styles.misi}>
        <h4>MISI</h4>
        {misi.map((item) => (
          <div className={styles.mision} key={item.id_misi}>
            <div
              className={`${styles.editmisi} ${styles.tooltip}`}
              onClick={() => onEditMisi?.(item.id_misi)}
              data-tooltip="Edit misi"
            >
              <FaPen size={14} />
            </div>
            <p>{item.misi}</p> {/* ambil string dari object */}
            <div
              className={`${styles.editmisi} ${styles.hapus} ${styles.tooltip}`}
              onClick={() => onDeleteMisi?.(item.id_misi)}
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
