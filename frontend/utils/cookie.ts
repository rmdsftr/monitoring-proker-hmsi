import { userStore } from "@/store/user";

export async function fetchUser(){
    try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/me`, {
            credentials: 'include'
        })
        if(!res.ok) throw new Error("Not logged in");
        const data = await res.json();
        userStore.getState().setUser(data);
        return data;
    } catch {
        userStore.getState().setUser(null);
        return null;
    }
}


export async function refreshUser() {
    return await fetchUser();
}