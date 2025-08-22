import Table from "@/components/table/table";
import { FaPlus, FaPen, FaTimes, FaArrowRight } from "react-icons/fa";
import styles from "@/styles/layouts/manajemen-sistem.module.css";
import Checkbox from "@/components/input/checkbox";
import { Button } from "@/components/button/button";
import { GetAllJabatan } from "@/services/jabatan";
import { useEffect, useState } from "react";
import { BeforeProps } from "@/types/setting";
import { ManajemenProps } from "@/types/setting";
import { saveJabatan } from "@/services/setting";
import { GetSelectedJabatan } from "@/services/jabatan";
import { deleteSelectedInti, deleteSelectedPres, deleteSelected } from "@/services/jabatan";

interface Jabatan {
  key: string;
  jabatan: string;
}

function BeforeLayout({ onSave, onRefresh, onConfirm }: BeforeProps) {
  const [jabatan, setJabatan] = useState<Jabatan[]>([]);
  const [checkedState, setChecked] = useState<Record<string, {
    pilih: string;
    inti: boolean;
    presidium: boolean;
  }>>({});
  const [submitting, setSubmitting] = useState(false);
  
  const fetchJabatan = async () => {
    try {
      const data = await GetAllJabatan();
      const mapped = data.map((item: any) => ({
        jabatan: item.jabatan,
        key: item.id_jabatan
      }));
      
      const initialState: Record<string, any> = {};
      mapped.forEach((j: Jabatan) => {
        initialState[j.key] = { pilih: "", inti: false, presidium: false };
      });
      
      setJabatan(mapped);
      setChecked(initialState);
    } catch (error) {
      console.error(error);
    }
  };
  
  useEffect(() => {
    fetchJabatan();
  }, []);
  
  
  const handleCheckboxChange = (id: string, field: "pilih" | "inti" | "presidium") => {
    setChecked(prev => {
      const current = prev[id];
      if (!current) return prev;
      
      switch (field) {
        case "pilih":
        return { ...prev, [id]: { ...current, pilih: current.pilih ? "" : "ya" } };
        case "inti":
        return current.inti
        ? { ...prev, [id]: { ...current, inti: false, presidium: false } }
        : { ...prev, [id]: { ...current, inti: true, presidium: true } };
        case "presidium":
        return current.presidium
        ? { ...prev, [id]: { ...current, presidium: false } }
        : { ...prev, [id]: { ...current, inti: false, presidium: true } };
        default:
        return prev;
      }
    });
  };
  
  const handleSubmit = async () => {
    const payload = jabatan.flatMap(j => {
      const checked = checkedState[j.key];
      if (!checked?.pilih) return []; 
      
      let is_inti = false;
      let is_presidium = false;
      
      if (checked.inti) {
        is_inti = true;
        is_presidium = true; 
      } else if (checked.presidium) {
        is_presidium = true;
      }
      
      return [{
        id_jabatan: j.key,
        is_inti,
        is_presidium
      }];
    });
    
    if (payload.length === 0) {
      onConfirm("Tidak ada data yang dipilih", "error");
      return;
    }
    
    setSubmitting(true);
    try {
      await saveJabatan({data: payload});
      
      onConfirm("Jabatan berhasil disimpan", "success");
      onRefresh();
      onSave();
    } catch (error: any) {
      onConfirm(error.message || "Terjadi kesalahan", "error");
    } finally {
      setSubmitting(false);
    }
  };
  
  
  const columns = [
    {
      key: "pilih",
      header: "Pilih",
      align: "center" as const,
      render: (row: Jabatan) => (
        <Checkbox
        color="green"
        checked={checkedState[row.key]?.pilih === "ya"}
        onChange={() => handleCheckboxChange(row.key, "pilih")}
        />
      )
    },
    { key: "jabatan", header: "Jabatan", align: "left" as const },
    {
      key: "inti",
      header: "Inti",
      align: "center" as const,
      render: (row: Jabatan) => (
        <Checkbox
        color="orange"
        checked={checkedState[row.key]?.inti || false}
        onChange={() => handleCheckboxChange(row.key, "inti")}
        />
      )
    },
    {
      key: "presidium",
      header: "Presidium",
      align: "center" as const,
      render: (row: Jabatan) => (
        <Checkbox
        color="orange"
        checked={checkedState[row.key]?.presidium || false}
        onChange={() => handleCheckboxChange(row.key, "presidium")}
        />
      )
    }
  ];
  
  return (
    <div className={styles.save}>
    <Button
    size="sm"
    variant="ghost"
    className={styles.back}
    onClick={onSave}
    >
    <FaArrowRight size={12} color="orange" />
    </Button>
    
    <Table data={jabatan} columns={columns} maxWidth="100%" />
    
    <br />
    <div className={styles.action}>
    <Button size="sm" variant="outline" className={styles.btn} iconLeft={<FaPlus size={11} />}>
    Jabatan
    </Button>
    {jabatan.length > 0 && (
      <Button
      size="sm"
      className={styles.btn}
      onClick={handleSubmit}
      disabled={submitting}
      >
      {submitting ? "Menyimpan..." : "Simpan Perubahan"}
      </Button>
    )}
    </div>
    </div>
  );
}


export default function ManajemenJabatanLayout({
  mode, onChange, onEdit, onAlert, onConfirm
}: ManajemenProps) {
  
  const [jabatan, setJabatan] = useState<any[]>([]);
  
  const fetchSelectedJabatan = async () => {
    try {
      const data = await GetSelectedJabatan();
      const mapped = data.map((item: any) => ({
        id: item.id_jabatan,
        jabatan: item.jabatan,
        is_inti: item.is_inti,
        is_presidium: item.is_presidium
      }));
      setJabatan(mapped);
    } catch (error) {
      console.error("error fetching jabatan : ", error);
    }
  };

  const handleDeleteInti = async(id:string) => {
    try {
        await deleteSelectedInti(id);
        await fetchSelectedJabatan();
        onConfirm("Berhasil dihapus dari inti", "success");
    } catch (err: any) {
        onConfirm(err.message, "error");
    }
  }

  const handleDeletePres = async(id:string) => {
    try {
        await deleteSelectedPres(id);
        await fetchSelectedJabatan();
        onConfirm("Berhasil dihapus dari presidium", "success");
    } catch (err: any) {
        onConfirm(err.message, "error");
    }
  }

  const handleDelete = async(id:string) => {
    try {
        await deleteSelected(id);
        await fetchSelectedJabatan();
        onConfirm("Berhasil dihapus dari jabatan", "success");
    } catch (err: any) {
        onConfirm(err.message, "error");
    }
  }
  
  useEffect(() => {
    fetchSelectedJabatan();
  }, []);
  
  return (
    <div className={styles.container}>
    <h4>Kelola jabatan periode saat ini</h4>
    <p className={styles.desc}>
    Jabatan merupakan entitas struktural dalam suatu organisasi. Dalam sistem ini,
    pilih mana saja jabatan yang akan berlaku dalam periode ini sesuai levelnya. Sebagai contoh,
    jabatan Kahim merupakan inti dan juga presidium. Maka pilih Kahim dan centang kedua checkbox Inti dan Presidium.
    </p>
    
    {mode === "after" ? (
      <div className={styles.after}>
      <Button
      size="sm"
      variant="outline"
      className={styles.edit}
      iconLeft={<FaPen size={11} />}
      onClick={() => onEdit(mode)}
      >
      Edit
      </Button>
      
      {jabatan.map((item:any) => (
        <div key={item.id} className={styles.card}>
        <p>{item.jabatan}</p>
        <div className={styles.options}>
        {item.is_presidium && (
          <div className={styles.selected}>
          <p>presidium</p>
          <div
          className={`${styles.tooltip} ${styles.trash}`}
          data-tooltip="Hapus dari presidium"
          >
          {item.id !== 'kahim' && (
            <FaTimes size={10} onClick={() => handleDeletePres(item.id)}/>
          )}
          </div>
          </div>
        )}
        {item.is_inti && (
          <div className={styles.selected}>
          <p>inti</p>
          <div
          className={`${styles.tooltip} ${styles.trash}`}
          data-tooltip="Hapus dari inti"
          >
          {item.id !== 'kahim' && (
            <FaTimes size={10} onClick={() => handleDeleteInti(item.id)}/>
          )}
          </div>
          </div>
        )}
        <div className={styles.all}>
          <div
          className={`${styles.tooltip} ${styles.trash}`}
          data-tooltip="Hapus dari jabatan"
          >
          {item.id !== 'kahim' && (
            <FaTimes size={10} color="white" onClick={() => handleDelete(item.id)}/>
          )}
          </div>
          </div>
        </div>
        </div>
      ))}
      </div>
    ) : (
      <BeforeLayout
      onSave={() => onChange("after")}
      onConfirm={(msg, type) => onAlert(msg, type)}
      onRefresh={() => fetchSelectedJabatan()}
      />
    )}
    </div>
  );
}
