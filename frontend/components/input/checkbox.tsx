import React from "react";
import styles from "@/styles/components/checkbox.module.css";

interface CheckboxProps {
  checked?: boolean;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  label?: string;
  color?: "orange" | "blue" | "green"; // bisa ditambah variant warna lain
  className?: string;
}

const Checkbox: React.FC<CheckboxProps> = ({
  checked,
  onChange,
  label,
  color = "orange",
  className,
}) => {
  return (
    <label className={`${styles.checkboxWrapper} ${className || ""}`}>
      <input
        type="checkbox"
        checked={checked}
        onChange={onChange}
        className={styles.input}
      />
      <span className={`${styles.customCheckbox} ${styles[color]}`} />
      {label && <span className={styles.label}>{label}</span>}
    </label>
  );
};

export default Checkbox;
