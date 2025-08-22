"use client"

import MasterLayout from "@/layouts/master";
import Table from "@/components/table/table";
import styles from "@/styles/pages/pengurus.module.css";
import PengurusNavbar from "@/layouts/pengurus";
import PopupFormPengurus from "@/layouts/form-pengurus";
import { useState } from "react";
import EthelLoading from "@/components/loading/ethel";
import PopupAlert from "@/layouts/popup-alert";
import { AnimatePresence } from "framer-motion";
import PopupEditFormPengurus from "@/layouts/edit-form-pengurus";
import { Pengurus } from "@/types/pengurus";
import { usePengurus } from "@/hooks/usePengurus";


export default function PengurusPage() {
    const {dataPengurus, loading, alert, setAlert, fetchPengurusData, showAlert} = usePengurus();

    const [isPopupFormPengurusOpen, setPopupFormPengurusOpen] = useState(false);
    const [isEditPopupForm, setEditPopupForm] = useState(false);
    const [selectPengurus, setSelectPengurus] = useState<Pengurus | null>(null);

    const statusStyles: Record<
        "Aktif" | "Cuti" | "Nonaktif",
        { bg: string; color: string }
        > = {
        Aktif: { bg: "rgba(0, 255, 0, 0.2)", color: "#92bd92ff" },
        Cuti: { bg: "rgba(189, 198, 21, 0.2)", color: "#c5c5a0ff" },
        Nonaktif: { bg: "rgba(255, 0, 0, 0.2)", color: "#ba8d8dff" },
        };

        const columns = [
        { key: "nama", header: "Nama", align: "left" as const },
        { key: "noHima", header: "No. HIMA", align: "left" as const },
        { key: "nim", header: "NIM", align: "left" as const },
        { key: "panggilan", header: "Panggilan", align: "left" as const },
        { key: "divisi", header: "Divisi", align: "left" as const },
        { key: "jabatan", header: "Jabatan", align: "left" as const },
        {
            key: "status",
            header: "Status",
            align: "center" as const,
            render: (row: Pengurus) => {
            const style = statusStyles[row.status as keyof typeof statusStyles] 
                || { bg: "rgba(200, 200, 200, 0.2)", color: "#999" }; 

            return (
                <span
                style={{
                    padding: "4px 12px",
                    borderRadius: "12px",
                    fontSize: "10px",
                    fontWeight: "500",
                    backgroundColor: style.bg,
                    color: style.color,
                }}
                >
                {row.status}
                </span>
            );
            },
            },
        ];

  return (
    <MasterLayout>
      <div className={styles.konten}> 
        <PengurusNavbar
            onAddClick={() => setPopupFormPengurusOpen(true)}
        />
        <br />

        {loading ? (
            <div className={styles.cat}>
                <EthelLoading/>
            </div>
        ) : (
            <Table
                data={dataPengurus}
                columns={columns}
                hoverable={true}
                radius={12}
                ariaLabel="Tabel Data Pengurus"
                maxWidth="100%"
                showAddition
                showActions
                onEdit={(row) => {
                    const data = dataPengurus.find(item => item.id === row.id)
                    if(data){
                        setSelectPengurus(data);
                        setEditPopupForm(true);
                    } else {
                        showAlert("Data tidak ditemukan", "error");
                    }
                }}
                onDelete={(row) => console.log("Hapus:", row)}
            />
        )}
      </div>

      {isPopupFormPengurusOpen && (
        <PopupFormPengurus
            isOpen={isPopupFormPengurusOpen}
            onClose={() => setPopupFormPengurusOpen(false)}
            onConfirm={(msg, type) => {
                showAlert(msg, type);
                fetchPengurusData();
            }}
        />
      )}  

      <PopupEditFormPengurus
            isOpen={isEditPopupForm}
            onClose={() => setEditPopupForm(false)}
            dataPengurus={selectPengurus}
            onConfirm={(msg, type) => {
                showAlert(msg, type);
                fetchPengurusData();
                setEditPopupForm(false);
                setSelectPengurus(null);
            }}
            
      />

      <AnimatePresence>
        {alert && (
          <PopupAlert
            message={alert.message}
            type={alert.type}
            onClose={() => setAlert(null)}
          />
        )}
      </AnimatePresence>
    </MasterLayout>
  );
}
