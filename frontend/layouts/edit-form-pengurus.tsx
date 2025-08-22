"use client";

import PopupFormLayout from "./popup-form";
import { Dropdown } from "@/components/dropdown/dropdown";
import { Button } from "@/components/button/button";
import styles from "@/styles/layouts/form-pengurus.module.css";
import { ChevronDown } from "lucide-react";
import React, { useEffect, useState } from "react";
import Picture from "@/components/file/picture";
import styling from "@/styles/layouts/editpengurus.module.css";
import { GetAllDivisi } from "@/services/divisi";
import { GetJabatan } from "@/services/jabatan";
import { statusPengurusOptions } from "@/types/status";
import { Pengurus } from "@/types/pengurus";
import { EditPengurus } from "@/services/pengurus";
import { EditPengurusPayload } from "@/types/pengurus";
import { GetFotoPengurus } from "@/services/pengurus";

interface Props {
  isOpen: boolean;
  onClose: () => void;
  dataPengurus: Pengurus | null;
  onConfirm: (message: string, type: "success" | "error") => void;
}

export default function PopupEditFormPengurus({
  isOpen,
  onClose,
  dataPengurus,
  onConfirm,
}: Props) {
  if (!isOpen) return null;

  const [loading, setLoading] = useState(false);
  const [options, setOptions] = useState<{ label: string; value: string }[]>([]);
  const [jabatanOptions, setJabatanOptions] = useState<{ label: string; value: string }[]>([]);
  
  const [selectedDivisi, setSelectedDivisi] = useState<string>("");
  const [selectedJabatan, setSelectedJabatan] = useState<string>("");
  const [selectedStatus, setSelectedStatus] = useState<string>("");
  const [photoUrl, setPhotoUrl] = useState<string | undefined>(undefined);
  const [photoFile, setPhotoFile] = useState<File | null>(null);

  
  useEffect(() => {
    if (dataPengurus && isOpen) {
      setSelectedDivisi(dataPengurus.divisi || "");
      setSelectedJabatan(dataPengurus.id_jabatan || "");
      setSelectedStatus(dataPengurus.status || "");
      setPhotoUrl(dataPengurus.foto);
      setPhotoFile(null); 
    } else if (!isOpen) {
      setSelectedDivisi("");
      setSelectedJabatan("");
      setSelectedStatus("");
      setPhotoUrl(undefined);
      setPhotoFile(null);
    }
  }, [dataPengurus, isOpen]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const divisiData = await GetAllDivisi();
        const mappedDivisi = divisiData.map((item: any) => ({
          label: item.id_divisi, 
          value: item.id_divisi,
        }));
        setOptions(mappedDivisi);

        const jabatanData = await GetJabatan();
        const mappedJabatan = jabatanData.map((item: any) => ({
          label: item.jabatan,
          value: item.id_jabatan,
        }));
        setJabatanOptions(mappedJabatan);
      } catch (error) {
        console.error("Error fetching dropdown data:", error);
        onConfirm("Gagal memuat data dropdown", "error");
      }
    };

    if (isOpen) {
      fetchData();
    }
  }, [isOpen, onConfirm]);

  const validateForm = (): boolean => {
    if (!selectedDivisi) {
      onConfirm("Divisi harus dipilih", "error");
      return false;
    }
    if (!selectedJabatan) {
      onConfirm("Jabatan harus dipilih", "error");
      return false;
    }
    if (!selectedStatus) {
      onConfirm("Status harus dipilih", "error");
      return false;
    }
    return true;
  };

  const handleEditSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!dataPengurus) {
      onConfirm("Data pengurus tidak ditemukan", "error");
      return;
    }

    if (!validateForm()) return;

    setLoading(true);

    try {
      const payload: EditPengurusPayload = {
        id_divisi: selectedDivisi,
        id_jabatan: selectedJabatan,
        status_anggota: selectedStatus,
        foto: photoFile, 
      };

      await EditPengurus(String(dataPengurus.id), payload);
      onConfirm("Berhasil mengupdate data pengurus", "success");
      onClose();
    } catch (error) {
      const message = error instanceof Error ? error.message : "Gagal mengupdate data pengurus";
      onConfirm(message, "error");
    } finally {
      setLoading(false);
    }
  };

  const handlePhotoChange = (file: File | null) => {
    setPhotoFile(file);
    if (file) {
      const objectUrl = URL.createObjectURL(file);
      setPhotoUrl(objectUrl);
      
      return () => URL.revokeObjectURL(objectUrl);
    } else {
      setPhotoUrl(dataPengurus?.foto);
    }
  };

  const handleClose = () => {
    if (!loading) {
      onClose();
    }
  };

  return (
    <PopupFormLayout>
      <div>
        <form onSubmit={handleEditSubmit} className={styling.content}>
          <div>
            <Picture 
              shape="rounded" 
              defaultUrl={photoUrl}
              onChange={handlePhotoChange}
            />
          </div>
          
          <div className={styles.container}>
            <div>
              <div>
                <Dropdown
                  options={options}
                  placeholder="Pilih Divisi"
                  value={selectedDivisi}
                  onChange={(val) => setSelectedDivisi(val.target.value)}
                  className={styles.full}
                  iconRight={<ChevronDown />}
                  disabled={loading}
                />
              </div>
              <br />
              
              <div>
                <Dropdown
                  options={jabatanOptions}
                  placeholder="Pilih Jabatan"
                  value={selectedJabatan}
                  onChange={(val) => setSelectedJabatan(val.target.value)}
                  className={styles.full}
                  iconRight={<ChevronDown />}
                  disabled={loading}
                />
              </div>
              <br />
              
              <div>
                <Dropdown
                  options={statusPengurusOptions}
                  placeholder="Pilih Status Pengurus"
                  value={selectedStatus}
                  onChange={(val) => setSelectedStatus(val.target.value)}
                  className={styles.full}
                  iconRight={<ChevronDown />}
                  disabled={loading}
                />
              </div>
            </div>
            
            <div className={`${styles.rata} ${styles.btn}`}>
              <Button
                variant="ghost"
                color="secondary"
                size="md"
                className={styles.full}
                onClick={handleClose}
                type="button"
                disabled={loading}
              >
                Batal
              </Button>
              <Button
                variant="solid"
                color="secondary"
                size="md"
                type="submit"
                className={styles.full}
                disabled={loading}
              >
                {loading ? "Menyimpan..." : "Simpan Perubahan"}
              </Button>
            </div>
          </div>
        </form>
      </div>
    </PopupFormLayout>
  );
}