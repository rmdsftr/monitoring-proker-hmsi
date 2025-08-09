"use client";

import { InputHTMLAttributes, ReactNode, useState } from "react";
import clsx from "clsx";
import styles from "@/styles/components/input.module.css";
import { poppins } from "../fonts/fontname";
import { FaEye, FaEyeSlash } from "react-icons/fa6";

interface Props extends Omit<InputHTMLAttributes<HTMLInputElement>, "type"> {
  label?: string;
  iconLeft?: ReactNode;
  error?: string;
  variant?: "outline" | "solid" | "ghost";
  color?: "primary" | "danger" | "gray";
  className?: string;
}

export function PasswordInput({
  label,
  iconLeft,
  error,
  variant = "outline",
  color = "primary",
  className,
  ...props
}: Props) {
  const [showPassword, setShowPassword] = useState(false);

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div className={clsx(`${poppins.variable} ${styles.wrapper}`, className)}>
      {label && <label className={styles.label}>{label}</label>}

      <div
        className={clsx(
          styles.inputContainer,
          styles[variant],
          styles[color],
          error && styles.error
        )}
      >
        {iconLeft && <span className={styles.iconLeft}>{iconLeft}</span>}
        
        <input 
          className={`${poppins} ${styles.input}`} 
          type={showPassword ? "text" : "password"}
          {...props} 
        />
        
        <button
          type="button"
          className={styles.iconRight}
          onClick={togglePasswordVisibility}
          style={{ 
            background: 'none', 
            border: 'none', 
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: 0
          }}
        >
          {showPassword ? (
            <FaEye size={15} color="black" />
          ) : (
            <FaEyeSlash size={15} color="black" />
          )}
        </button>
      </div>

      {error && <p className={styles.errorMessage}>{error}</p>}
    </div>
  );
}