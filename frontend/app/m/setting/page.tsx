"use client";

import MasterLayout from "@/layouts/master";
import ManajemenFungsionalLayout from "@/layouts/manajemenFungsional";
import ManajemenJabatanLayout from "@/layouts/manajemenJabatan";
import styles from "@/styles/pages/setting.module.css";
import { poppins } from "@/components/fonts/fontname";
import { Button } from "@/components/button/button";
import { useState } from "react";
import PopupKonfirmasiAkhiriPeriode from "@/layouts/periode/popup-konfirmasi";
import { AnimatePresence } from "framer-motion";
import PopupAlert from "@/layouts/popup-alert";

interface AlertType {
  message: string;
  type: "success" | "error";
}

export default function SettingPage(){
    const [typeFungsionalPage, setTypeFungsionalPage] = useState<"before" | "after">("after");
    const [typeJabatanPage, setTypeJabatanPage] = useState<"before" | "after">("after");

    const [isPopupPeriodeOpen ,setPopupPeriodeOpen] = useState(false);
    const [alert, setAlert] = useState<AlertType | null>(null);
    const showAlert = (message: string, type: "success" | "error") => {
        setAlert({ message, type });
    };

    return(
        <div>
            <MasterLayout>
                <div className={styles.content}>
                    <h2 className={`${poppins.variable} ${styles.title}`}>Manajemen Sistem</h2>
                    <div className={`${poppins.variable} ${styles.container}`}>
                        <ManajemenFungsionalLayout 
                            mode={typeFungsionalPage} 
                            onChange={setTypeFungsionalPage} 
                            onEdit={() => setTypeFungsionalPage("before")}
                            onAlert={(msg, type) => showAlert(msg, type)}
                            onConfirm={(msg, type) => showAlert(msg, type)}
                            
                        />
                        <ManajemenJabatanLayout 
                            mode={typeJabatanPage}
                            onChange={setTypeJabatanPage}
                            onEdit={() => setTypeJabatanPage("before")}
                            onAlert={(msg, type) => showAlert(msg, type)}
                            onConfirm={(msg, type) => showAlert(msg, type)}
                        />
                    </div>
                    <Button variant="outline" color="danger" size="sm" 
                        className={styles.end}
                        onClick={() => setPopupPeriodeOpen(true)}
                        >Akhiri periode kepengurusan
                    </Button>
                    <br /><br />
                </div>
            </MasterLayout>

            {isPopupPeriodeOpen && (
                <PopupKonfirmasiAkhiriPeriode
                    isOpen={isPopupPeriodeOpen}
                    onClose={() => setPopupPeriodeOpen(false)}
                    
                />
            )}

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
    )   
}