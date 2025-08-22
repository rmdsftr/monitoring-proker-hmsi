import PopupFormLayout from "../popup-form";
import { Button } from "@/components/button/button";
import img from "@/assets/images/sad cat.jpeg";
import Image from "next/image";
import styles from "@/styles/layouts/periode/popup-konfirmasi.module.css";
import { poppins } from "@/components/fonts/fontname";
import { useState } from "react";
import { ClosePeriode as closePeriodeService } from "@/services/periode";
import { useRouter } from "next/navigation";

interface Props {
  isOpen: boolean;
  onClose: () => void;
}

export default function PopupKonfirmasiAkhiriPeriode({
  isOpen,
  onClose,
}: Props) {
  if (!isOpen) return null;
  const router = useRouter()
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState<string | undefined>(undefined);

  const handleClosePeriode = async () => {
    setLoading(true);
    try {
      await closePeriodeService();
      router.push("/periode")
    } catch (error: any) {
      setErrors(error.message);
      setTimeout(() => setErrors(undefined), 3000);
    } finally {
      setLoading(false);
    }
  };

  return (
    <PopupFormLayout>
      <div className={styles.container}>
        <Image
          src={img}
          alt=""
          width={100}
          height={100}
          className={styles.img}
        />

        {errors ? (
          <p className={`${styles.teks} ${poppins.variable}`}>{errors}</p>
        ) : (
          <p className={`${styles.teks} ${poppins.variable}`}>
            Yakin ingin mengakhiri periode kepengurusan?
            <br />
            Tindakan ini tidak dapat di-undo
          </p>
        )}
        <div className={styles.btn}>
          <Button color="danger" variant="outline" onClick={onClose}>
            Batalkan
          </Button>
          <Button color="danger" onClick={handleClosePeriode} disabled={loading}>
            {loading ? "Loading..." : "Yakin"}
          </Button>
        </div>
      </div>
    </PopupFormLayout>
  );
}
