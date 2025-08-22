"use client";
import React from "react";
import styles from "@/styles/components/radio.module.css";

interface RadioProps {
  label: string;
  name: string;
  value: string;
  checked?: boolean;
  onChange: (value: string) => void;
  disabled?: boolean;
  variant?: "primary" | "secondary" | "success" | "danger";
}

const Radio: React.FC<RadioProps> = ({
  label,
  name,
  value,
  checked = false,
  onChange,
  disabled = false,
  variant = "primary",
}) => {
  return (
    <label className={styles.radioWrapper}>
      <input
        type="radio"
        name={name}
        value={value}
        checked={checked}
        onChange={() => onChange(value)}
        disabled={disabled}
        className={styles.radioInput}
      />
      <span className={`${styles.customRadio} ${styles[variant]}`}></span>
      <span className={styles.radioLabel}>{label}</span>
    </label>
  );
};

export default Radio;
