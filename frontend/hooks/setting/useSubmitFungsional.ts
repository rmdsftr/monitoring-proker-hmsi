import { useState } from "react";
import { saveFungsional } from "@/services/setting";
import { SaveFungsionalPayload } from "@/types/divisi";

export function useSubmitFungsional(divisi: any[], selected: Record<string, string | null>) {
    const [submitting, setSubmitting] = useState(false);
    
    const submit = async (onSuccess: () => void, onError: (msg: string) => void) => {
        const payload: SaveFungsionalPayload = {
            data: divisi.flatMap((row) => {
                const choice = selected[row.fungsional];
                return choice ? [{ id_fungsional: row.id, kategori: choice }] : [];
            }),
        };
        
        setSubmitting(true);
        try {
            await saveFungsional(payload);
            onSuccess();
        } catch (err: any) {
            onError(err.message);
        } finally {
            setSubmitting(false);
        }
    };
    
    return { submit, submitting };
}
