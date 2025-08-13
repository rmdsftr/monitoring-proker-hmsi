import PopupFormLayout from "./popup-form";
import TextArea from "@/components/textarea/textarea";
import { Button } from "@/components/button/button";
import { useState } from "react";
import styles from "@/styles/layouts/popup-visi.module.css";
import { AddVisi } from "@/services/visi";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";

interface Props {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: (message: string, type: "success" | "error") => void;
}

export default function PopupVisiLayout({ isOpen, onClose, onConfirm }: Props) {
  if (!isOpen) return null;

  const router = useRouter();
  const [visi, setVisi] = useState("");
  const [loading, setLoading] = useState(false);

  const handleAddVisi = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      await AddVisi(visi);
      onConfirm("Berhasil menambahkan visi", "success");
      onClose();
      router.push('/m/visimisi');
    } catch (error) {
        const message = error instanceof Error ? error.message : "Gagal menambahkan visi";
        onConfirm(message, "error"); 
        console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <PopupFormLayout>
      <div className={styles.content}>
        <form onSubmit={handleAddVisi}>
          <TextArea
            placeholder="Visi HMSI adalah..."
            rows={5}
            value={visi}
            onChange={(e) => setVisi(e.target.value)}
          />

          <br />

          <div className={styles.btn}>
            <Button
              color="secondary"
              variant="outline"
              className={styles.cancel}
              onClick={onClose}
              type="button"
            >
              Cancel
            </Button>
            <Button
              color="secondary"
              variant="solid"
              type="submit"
              disabled={loading}
              className={styles.save}
            >
              {loading ? "Menyimpan..." : "Simpan"}
            </Button>
          </div>
        </form>
      </div>
    </PopupFormLayout>
  );
}
