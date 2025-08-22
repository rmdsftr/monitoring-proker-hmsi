import PopupFormLayout from "./popup-form";
import TextArea from "@/components/textarea/textarea";
import { Button } from "@/components/button/button";
import { useState } from "react";
import styles from "@/styles/layouts/popup-visi.module.css";
import { AddMisi } from "@/services/misi";
import { useRouter } from "next/navigation";
import { EditMisi } from "@/services/misi";

interface Props {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: (message: string, type: "success" | "error") => void;
  mode: "add" | "edit";
  initialValue?: string;
  idMisi?: number;
}

export default function PopupMisiLayout({ isOpen, onClose, onConfirm, mode, initialValue="", idMisi }: Props) {
  if (!isOpen) return null;
  const router = useRouter();

  const [misi, setMisi] = useState(initialValue);
  const [loading, setLoading] = useState(false);

  const handleSubmitMisi = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      if(mode === "add"){
        await AddMisi(misi);
        onConfirm("Berhasil menambahkan misi", "success");
      } else {
        await EditMisi(idMisi!, misi);
        onConfirm("Berhasil mengubah misi", "success");
      }

      onClose();
      router.push('/m/visimisi')
    } catch (error) {
        const message = error instanceof Error ? error.message : "Gagal menyimpan misi";
        onConfirm(message, "error"); 
        console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <PopupFormLayout>
      <div className={styles.content}>
        <form onSubmit={handleSubmitMisi}>
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
              {loading 
              ? "Menyimpan..." : mode === "add"
              ?"Simpan" : "Update"}
            </Button>
          </div>
        </form>
      </div>
    </PopupFormLayout>
  );
}
