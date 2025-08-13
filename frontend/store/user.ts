import { create } from "zustand";

type User = {
    id_anggota:string;
    no_hima:string;
    nim:string;
    role:string;
    panggilan:string;
    id_periode:string;
    id_divisi:string;
    id_jabatan:string;
}

type userState = {
    user: User | null;
    setUser: (user: User | null) => void;
}

export const userStore = create<userState>((set) => ({
    user: null,
    setUser: (user) => set({user})
}))