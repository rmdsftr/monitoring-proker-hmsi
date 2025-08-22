import PopupFormLayout from "./popup-form";
import TextArea from "@/components/textarea/textarea";
import { Button } from "@/components/button/button";
import React, { useState } from "react";
import styles from "@/styles/layouts/popup-visi.module.css";
import { AddVisi } from "@/services/visi";
import { useRouter } from "next/navigation";
import { EditVisi } from "@/services/visi";

interface Props {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: (message: string, type: "success" | "error") => void;
  mode: "add" | "edit";
  initialValue?:string;
  idVisi?:number;
}

export default function PopupVisiLayout({ isOpen, onClose, onConfirm, mode, initialValue="", idVisi }: Props) {
  if (!isOpen) return null;

  const router = useRouter();
  const [visi, setVisi] = useState(initialValue);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async(e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      if(mode === "add"){
        await AddVisi(visi);
        onConfirm("Berhasil menambahkan visi", "success");
      } else {
        await EditVisi(idVisi!, visi);
        onConfirm("Berhasil mengubah visi", "success");
      }

      onClose();
      router.push('/m/visimisi');
    } catch (error) {
      const message = error instanceof Error ? error.message : "Gagal menyimpan visi";
      onConfirm(message, "error");
      console.error(error);
    } finally {
      setLoading(false);
    }
  }

  return (
    <PopupFormLayout>
      <div className={styles.content}>
        <form onSubmit={handleSubmit}>
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
              {loading 
              ? "Menyimpan..." : mode === "add"
              ? "Simpan" : "Update"}
            </Button>
          </div>
        </form>
      </div>
    </PopupFormLayout>
  );
}
