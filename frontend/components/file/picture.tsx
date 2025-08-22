"use client";
import React, { useCallback, useEffect, useRef, useState } from "react";
import styles from "@/styles/components/picture.module.css";

type PictureProps = {
  /** URL awal (mis. dari server) */
  defaultUrl?: string;
  /** dipanggil saat user memilih / menghapus file */
  onChange?: (file: File | null, croppedBlob?: Blob | null) => void;
  /** batas ukuran file dalam MB (default 3 MB) */
  maxSizeMB?: number;
  /** mime yang diperbolehkan */
  accept?: string;
  /** bentuk preview: "circle" | "rounded" | "square" */
  shape?: "circle" | "rounded" | "square";
  /** ukuran sisi preview (px) */
  size?: number;
  /** disabled */
  disabled?: boolean;
  /** label untuk aksesibilitas */
  ariaLabel?: string;
};

export default function Picture({
  defaultUrl,
  onChange,
  maxSizeMB = 3,
  accept = "image/*",
  shape = "circle",
  size = 160,
  disabled = false,
  ariaLabel = "Tambahkan foto",
}: PictureProps) {
  const inputRef = useRef<HTMLInputElement | null>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const cropperRef = useRef<HTMLDivElement | null>(null);
  const [dragOver, setDragOver] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [file, setFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | undefined>(defaultUrl);
  const [showCropper, setShowCropper] = useState(false);
  const [originalImage, setOriginalImage] = useState<HTMLImageElement | null>(null);
  const [cropArea, setCropArea] = useState({ x: 0, y: 0, width: 0, height: 0 });
  const [isDragging, setIsDragging] = useState(false);
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 });

  // revoke object URL saat ganti file / unmount
  useEffect(() => {
    return () => {
      if (previewUrl && previewUrl.startsWith("blob:")) {
        URL.revokeObjectURL(previewUrl);
      }
    };
  }, [previewUrl]);

  const calculateInitialCrop = (img: HTMLImageElement) => {
    const aspectRatio = 3 / 4; // width / height
    let cropWidth, cropHeight, cropX, cropY;

    if (img.width / img.height > aspectRatio) {
      // Image is wider than 3:4, fit by height
      cropHeight = img.height;
      cropWidth = cropHeight * aspectRatio;
      cropX = (img.width - cropWidth) / 2;
      cropY = 0;
    } else {
      // Image is taller than 3:4, fit by width
      cropWidth = img.width;
      cropHeight = cropWidth / aspectRatio;
      cropX = 0;
      cropY = (img.height - cropHeight) / 2;
    }

    return { x: cropX, y: cropY, width: cropWidth, height: cropHeight };
  };

  const validateAndSet = useCallback(
    (f: File) => {
      setError(null);
      // tipe
      if (!f.type.startsWith("image/")) {
        setError("File harus berupa gambar.");
        return;
      }
      // ukuran
      const maxBytes = maxSizeMB * 1024 * 1024;
      if (f.size > maxBytes) {
        setError(`Ukuran maksimal ${maxSizeMB} MB.`);
        return;
      }

      // Load image untuk cropping
      const img = new Image();
      img.onload = () => {
        setOriginalImage(img);
        const initialCrop = calculateInitialCrop(img);
        setCropArea(initialCrop);
        setShowCropper(true);
      };
      img.src = URL.createObjectURL(f);
      setFile(f);
    },
    [maxSizeMB]
  );

  const cropImage = () => {
    if (!originalImage || !canvasRef.current) return;

    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    // Set canvas size to match preview ratio (3:4)
    const outputWidth = Math.min(600, size * 3); // Max 600px width
    const outputHeight = Math.round(outputWidth * 4 / 3); // 3:4 ratio
    canvas.width = outputWidth;
    canvas.height = outputHeight;

    // Draw cropped image
    ctx.drawImage(
      originalImage,
      cropArea.x, cropArea.y, cropArea.width, cropArea.height,
      0, 0, outputWidth, outputHeight
    );

    canvas.toBlob((blob) => {
      if (blob) {
        const croppedUrl = URL.createObjectURL(blob);
        if (previewUrl && previewUrl.startsWith("blob:")) {
          URL.revokeObjectURL(previewUrl);
        }
        setPreviewUrl(croppedUrl);
        setShowCropper(false);
        onChange?.(file, blob);
      }
    }, "image/jpeg", 0.95);
  };

  const handleMouseDown = (e: React.MouseEvent) => {
    setIsDragging(true);
    setDragStart({ x: e.clientX - cropArea.x, y: e.clientY - cropArea.y });
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging || !originalImage) return;

    const newX = Math.max(0, Math.min(e.clientX - dragStart.x, originalImage.width - cropArea.width));
    const newY = Math.max(0, Math.min(e.clientY - dragStart.y, originalImage.height - cropArea.height));

    setCropArea(prev => ({ ...prev, x: newX, y: newY }));
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  const onInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const f = e.target.files?.[0];
    if (f) validateAndSet(f);
    // reset nilai input agar bisa pilih file yang sama lagi
    if (inputRef.current) inputRef.current.value = "";
  };

  const onDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragOver(false);
    if (disabled) return;
    const f = e.dataTransfer.files?.[0];
    if (f) validateAndSet(f);
  };

  const onKeyPress = (e: React.KeyboardEvent) => {
    if (disabled) return;
    if (e.key === "Enter" || e.key === " ") {
      inputRef.current?.click();
    }
  };

  const clearImage = () => {
    setError(null);
    setFile(null);
    if (previewUrl && previewUrl.startsWith("blob:")) {
      URL.revokeObjectURL(previewUrl);
    }
    setPreviewUrl(undefined);
    setShowCropper(false);
    onChange?.(null, null);
  };

  const cancelCrop = () => {
    setShowCropper(false);
    setFile(null);
    setOriginalImage(null);
  };

  const wrapperStyle: React.CSSProperties = {
    width: size,
    height: Math.round(size * 4 / 3), // 3:4 ratio (width:height)
  };

  return (
    <div className={styles.wrapper}>
      <div
        className={[
          styles.dropzone,
          dragOver ? styles.dropzoneOver : "",
          disabled ? styles.dropzoneDisabled : "",
        ].join(" ")}
        style={wrapperStyle}
        onDragOver={(e) => {
          e.preventDefault();
          if (!disabled) setDragOver(true);
        }}
        onDragLeave={() => setDragOver(false)}
        onDrop={onDrop}
        onClick={() => !disabled && inputRef.current?.click()}
        onKeyDown={onKeyPress}
        tabIndex={disabled ? -1 : 0}
        role="button"
        aria-label={ariaLabel}
        aria-disabled={disabled}
        data-shape={shape}
      >
        {previewUrl ? (
          <>
            <img src={previewUrl} alt="Preview foto" className={styles.preview} />
            {!disabled && (
              <div className={styles.overlay}>
                <span className={styles.overlayText}>Ganti</span>
              </div>
            )}
          </>
        ) : (
          <div className={styles.placeholder}>
            <div className={styles.icon} aria-hidden>📷</div>
            <div className={styles.text}>
              <strong>Tambahkan foto</strong>
              <div className={styles.hint}>Format gambar, maks {maxSizeMB}MB</div>
            </div>
          </div>
        )}
      </div>

      <div className={styles.controls}>
        <input
          ref={inputRef}
          type="file"
          accept={accept}
          onChange={onInputChange}
          className={styles.hiddenInput}
          capture="environment"
          disabled={disabled}
        />
        {!disabled && (
          <>
            {previewUrl && (
              <button
                type="button"
                className={[styles.btn, styles.btnGhost].join(" ")}
                onClick={clearImage}
              >
                Hapus
              </button>
            )}
          </>
        )}
      </div>

      {error && <p className={styles.error}>{error}</p>}

      {/* Cropper Modal */}
      {showCropper && originalImage && (
        <div className={styles.cropperModal}>
          <div className={styles.cropperContent}>
            <h3>Sesuaikan Foto</h3>
            <div 
              className={styles.cropperContainer}
              onMouseMove={handleMouseMove}
              onMouseUp={handleMouseUp}
              onMouseLeave={handleMouseUp}
            >
              <img 
                src={originalImage.src} 
                alt="Original" 
                className={styles.cropperImage}
                draggable={false}
              />
              <div 
                className={styles.cropArea}
                style={{
                  left: `${(cropArea.x / originalImage.width) * 100}%`,
                  top: `${(cropArea.y / originalImage.height) * 100}%`,
                  width: `${(cropArea.width / originalImage.width) * 100}%`,
                  height: `${(cropArea.height / originalImage.height) * 100}%`,
                }}
                onMouseDown={handleMouseDown}
              >
                <div className={styles.cropHandle}></div>
              </div>
            </div>
            <div className={styles.cropperActions}>
              <button 
                type="button" 
                className={[styles.btn, styles.btnGhost].join(" ")}
                onClick={cancelCrop}
              >
                Batal
              </button>
              <button 
                type="button" 
                className={styles.btn}
                onClick={cropImage}
              >
                Gunakan Foto
              </button>
            </div>
          </div>
        </div>
      )}

      <canvas ref={canvasRef} style={{ display: 'none' }} />
    </div>
  );
}