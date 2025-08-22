"use client";

import { useEffect, useState } from "react";
import { AnimatePresence } from "framer-motion";

import MasterLayout from "@/layouts/master";
import VisiMisiLayout from "@/layouts/visimisi";
import PopupVisiLayout from "@/layouts/formvisi";
import PopupMisiLayout from "@/layouts/formmisi";
import PopupAlert from "@/layouts/popup-alert";
import { VisiType } from "@/layouts/visimisi";

import { GetVisi } from "@/services/visi";
import { DeleteMisi, GetMisi } from "@/services/misi";
import { DeleteVisi } from "@/services/visi";

interface AlertType {
  message: string;
  type: "success" | "error";
}

export default function VisiMisiPage() {
  const [isPopupVisiOpen, setPopupVisiOpen] = useState(false);
  const [isPopupMisiOpen, setPopupMisiOpen] = useState(false);
  const [alert, setAlert] = useState<AlertType | null>(null);

  const [visi, setVisi] = useState<VisiType | null>(null);
  const [misi, setMisi] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState<string | null>(null);

  const [visiMode, setVisiMode] = useState<"add" | "edit">("add");
  const [visiInitialValue, setVisiInitialValue] = useState("");
  const [visiId, setVisiId] = useState<number | null>(null)

  const [misiMode, setMisiMode] = useState<"add" | "edit">("add");
  const [misiInitialValue, setMisiInitialValue] = useState("");
  const [misiId, setMisiId] = useState<number | null>(null)

  const fetchVisiMisi = async () => {
    setLoading(true);
    setErrors(null);
    try {
      const res_visi = await GetVisi();
      const res_misi = await GetMisi();
      setVisi(res_visi[0] || null);
      setMisi(res_misi);
    } catch (error: any) {
      setErrors(error?.message || "Terjadi kesalahan saat mengambil data");
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteVisi = async (id_visi:number) => {
    setLoading(true);
    setErrors(null);
    try {
        await DeleteVisi(Number(id_visi));
        showAlert("Berhasil menghapus visi", 'success');
        await fetchVisiMisi()
    } catch (error: any) {
        showAlert(error?.message || "Gagal menghapus visi", "error");
    } finally {
      setLoading(false);
    }
  }

  const handleDeleteMisi = async(id_misi: number) => {
    setLoading(true);
    setErrors(null);
    try {
        await DeleteMisi(Number(id_misi));
        showAlert("Berhasil menghapus misi", 'success');
        await fetchVisiMisi()
    } catch (error: any) {
        showAlert(error?.message || "Gagal menghapus misi", "error");
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchVisiMisi();
  }, []);

  const showAlert = (message: string, type: "success" | "error") => {
    setAlert({ message, type });
  };

  return (
    <div>
      <MasterLayout>
        <VisiMisiLayout
          visi={visi}
          misi={misi}
          onAddVisi={() => {
            setVisiMode("add");
            setVisiInitialValue("");
            setVisiId(null);
            setPopupVisiOpen(true)
          }}
          onEditVisi={(id_visi, visi) => {
            setVisiMode("edit");
            setVisiInitialValue(visi);
            setVisiId(Number(id_visi));
            setPopupVisiOpen(true);
          }}
          onDeleteVisi={(id_visi) => handleDeleteVisi(Number(id_visi))}
          onAddMisi={() => {
            setMisiMode("add");
            setMisiInitialValue("");
            setMisiId(null);
            setPopupMisiOpen(true);
          }}
          onEditMisi={(id_misi, misi) => {
            setMisiMode("edit");
            setMisiInitialValue(misi);
            setMisiId(Number(id_misi));
            setPopupMisiOpen(true);
          }}
          onDeleteMisi={(id_misi) => handleDeleteMisi(Number(id_misi))}
          loading={loading}
          errors={errors}
        />
      </MasterLayout>

      <AnimatePresence>
        {isPopupVisiOpen && (
          <PopupVisiLayout
            isOpen={isPopupVisiOpen}
            mode={visiMode}
            initialValue={visiInitialValue}
            idVisi={Number(visiId)}
            onClose={() => setPopupVisiOpen(false)}
            onConfirm={(msg, type) => {
              showAlert(msg, type);
              fetchVisiMisi(); // 3️⃣ refresh data setelah submit
            }}
          />
        )}
      </AnimatePresence>

      <AnimatePresence>
        {isPopupMisiOpen && (
          <PopupMisiLayout
            isOpen={isPopupMisiOpen}
            mode={misiMode}
            initialValue={misiInitialValue}
            idMisi={Number(misiId)}
            onClose={() => setPopupMisiOpen(false)}
            onConfirm={(msg, type) => {
              showAlert(msg, type);
              fetchVisiMisi(); // refresh data
            }}
          />
        )}
      </AnimatePresence>

      <AnimatePresence>
        {alert && (
          <PopupAlert
            message={alert.message}
            type={alert.type}
            onClose={() => setAlert(null)}
          />
        )}
      </AnimatePresence>
    </div>
  );
}
