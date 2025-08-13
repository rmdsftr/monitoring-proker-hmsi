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
import { GetMisi } from "@/services/misi";

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

  // 1️⃣ Definisikan fetchVisiMisi di sini, bukan di useEffect
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

  // 2️⃣ Jalankan fetchVisiMisi saat mount
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
          onAddVisi={() => setPopupVisiOpen(true)}
          onAddMisi={() => setPopupMisiOpen(true)}
          loading={loading}
          errors={errors}
        />
      </MasterLayout>

      <AnimatePresence>
        {isPopupVisiOpen && (
          <PopupVisiLayout
            isOpen={isPopupVisiOpen}
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
