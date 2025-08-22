import { create } from "zustand";
import { persist } from "zustand/middleware";

type User = {
    id_anggota: string;
    id_pengurus: string;
    role: string;
    panggilan: string;
    id_periode: string;
    periode: string;
    id_fungsional: string;
    id_jabatan: string;
}

type userState = {
    user: User | null;
    setUser: (user: User | null) => void;
}

export const userStore = create<userState>()(
    persist(
        (set) => ({
            user: null,
            setUser: (user) => set({ user })
        }),
        {
            name: 'user-storage', 
        }
    )
);