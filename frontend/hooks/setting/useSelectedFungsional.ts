// hooks/useSelectedFungsional.ts
import { useEffect, useState } from "react";

export function useSelectedFungsional(divisi: any[]) {
    const [selected, setSelected] = useState<
    Record<string, "inti" | "divisi" | null>
    >({});
    
    useEffect(() => {
        if (divisi.length > 0) {
            setSelected(Object.fromEntries(divisi.map((d) => [d.fungsional, null])));
        }
    }, [divisi]);
    
    const toggleSelection = (
        fungsional: string,
        value: "inti" | "divisi"
    ) => {
        setSelected((prev) => {
            const current = prev[fungsional];
            return { ...prev, [fungsional]: current === value ? null : value };
        });
    };
    
    return { selected, toggleSelection };
}
