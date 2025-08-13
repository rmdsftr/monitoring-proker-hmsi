import React from "react";
import styles from "@/styles/components/textarea.module.css";
import { poppins } from "../fonts/fontname";

interface TextAreaProps {
  label?: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
  placeholder?: string;
  rows?: number;
  disabled?: boolean;
}

export default function TextArea({
  label,
  value,
  onChange,
  placeholder,
  rows = 4,
  disabled = false,
}: TextAreaProps) {
  return (
    <div className={styles.textAreaContainer}>
      {label && <label className={styles.label}>{label}</label>}
      <textarea
        className={`${poppins.variable} ${styles.textarea}`}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        rows={rows}
        disabled={disabled}
      />
    </div>
  );
}
