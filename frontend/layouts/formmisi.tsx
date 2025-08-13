import PopupFormLayout from "./popup-form";
import TextArea from "@/components/textarea/textarea";
import { Button } from "@/components/button/button";
import { useState } from "react";
import styles from "@/styles/layouts/popup-visi.module.css";
import { AddMisi, GetMisi } from "@/services/misi";
import { GetVisi } from "@/services/visi";
import { useRouter } from "next/navigation";

interface Props {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: (message: string, type: "success" | "error") => void;
}

export default function PopupMisiLayout({ isOpen, onClose, onConfirm }: Props) {
  if (!isOpen) return null;
  const router = useRouter();

  const [misi, setMisi] = useState("");
  const [loading, setLoading] = useState(false);

  const handleAddMisi = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      await AddMisi(misi);
      onConfirm("Berhasil menambahkan misi", "success");
      onClose();
      router.push('/m/visimisi');
    } catch (error) {
        const message = error instanceof Error ? error.message : "Gagal menambahkan misi";
        onConfirm(message, "error"); 
        console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <PopupFormLayout>
      <div className={styles.content}>
        <form onSubmit={handleAddMisi}>
          <TextArea
            placeholder="Masukkan poin misi di sini"
            rows={5}
            value={misi}
            onChange={(e) => setMisi(e.target.value)}
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
