import React from "react";
import styles from "@/styles/layouts/popup-form.module.css";
import { motion } from "framer-motion";

interface Props{
    children: React.ReactNode
}

export default function PopupFormLayout({children} : Props){
    return(
        <div className={styles.background}>
            <motion.div 
                initial={{ scale: 0.6, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.6, opacity: 0 }}
                transition={{
                    type: "spring",
                    stiffness: 500,
                    damping: 25,
                }}
                className={styles.container}
            >
                {children}
            </motion.div>
        </div>
    )
}