import React, { useEffect, useState } from "react";
import Table from "@/components/table/table";
import { FaTrash, FaPen, FaPlus, FaArrowRight } from "react-icons/fa";
import styles from "@/styles/layouts/manajemen-sistem.module.css";
import { Button } from "@/components/button/button";
import Radio from "@/components/button/radio";
import { useDivisiList } from "@/hooks/setting/useDivisiList";
import { useSelectedFungsional } from "@/hooks/setting/useSelectedFungsional";
import { useSubmitFungsional } from "@/hooks/setting/useSubmitFungsional";
import { useManajemenFungsional } from "@/hooks/setting/useManajemenFungsional";
import { BeforeProps } from "@/types/setting";
import { ManajemenProps } from "@/types/setting";

function BeforeLayout({ onSave, onConfirm, onRefresh }: BeforeProps) {
    const { divisi, loading } = useDivisiList();
    const { selected, toggleSelection } = useSelectedFungsional(divisi);
    const { submit, submitting } = useSubmitFungsional(divisi, selected);
    
    const handleSubmit = () => {
        submit(
            () => {
                onRefresh();
                onSave();
                onConfirm("Fungsional berhasil dipilih", "success");
            },
            (msg) => onConfirm(msg, "error")
        );
    };
    
    const columns = [
        { key: "fungsional", header: "Fungsional", align: "left" as const },
        {
            key: "inti",
            header: "Inti",
            align: "center" as const,
            render: (row: any) => (
                <Radio
                label=""
                name={`radio-${row.fungsional}`}
                value="inti"
                checked={selected[row.fungsional] === "inti"}
                onChange={() => toggleSelection(row.fungsional, "inti")}
                variant="primary"
                disabled={submitting}
                />
            ),
        },
        {
            key: "divisi",
            header: "Divisi",
            align: "center" as const,
            render: (row: any) => (
                <Radio
                label=""
                name={`radio-${row.fungsional}`}
                value="divisi"
                checked={selected[row.fungsional] === "divisi"}
                onChange={() => toggleSelection(row.fungsional, "divisi")}
                variant="primary"
                disabled={submitting}
                />
            ),
        },
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
        
        <Table data={divisi} columns={columns} maxWidth="100%" />
        
        <div className={`${styles.action} ${styles.gap}`}>
        <Button size="sm" variant="outline" className={styles.btn} iconLeft={<FaPlus size={11} />}>
        Fungsional
        </Button>
        {divisi.length > 0 && (
            <Button
            size="sm"
            className={`${styles.btn}`}
            onClick={handleSubmit}
            disabled={submitting || loading}
            >
            {submitting ? "Menyimpan..." : "Simpan Perubahan"}
            </Button>
        )}
        </div>
        </div>
    );
}



export default function ManajemenFungsionalLayout({
    mode,
    onChange,
    onEdit,
    onConfirm,
    onAlert,
}: ManajemenProps) {
    const { divisi, loading, fetchDivisi, handleDelete } = useManajemenFungsional(onConfirm);
    
    return (
        <div className={styles.container}>
        <h4>Kelola fungsional periode saat ini</h4>
        <p className={styles.desc}>
        Fungsional merupakan entitas yang nantinya akan memiliki dan menjalankan
        program kerja. Dalam sistem ini, divisi dan inti dianggap sebagai entitas
        fungsional. Kelola apa saja inti dan divisi yang akan relevan pada
        periode saat ini.
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
            
            {divisi.map((item) => (
                <div key={item.id} className={styles.card}>
                <p className={styles.flag}>{item.tipe}</p>
                <p>{item.fungsional}</p>
                <div
                className={`${styles.tooltip} ${styles.trash}`}
                data-tooltip="Hapus fungsional"
                onClick={() => handleDelete(item.id)}
                >
                {item.id !== 'kahim' && (
                    <FaTrash size={13} />
                )}
                </div>
                </div>
            ))}
            </div>
        ) : (
            <BeforeLayout
            onSave={() => onChange("after")}
            onConfirm={(msg, type) => onAlert(msg, type)}
            onRefresh={fetchDivisi}
            />
        )}
        </div>
    );
}
