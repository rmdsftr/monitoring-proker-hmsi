"use client";

import { ReactNode, useEffect } from "react";
import { userStore } from "@/store/user";
import { fetchUser } from "@/utils/cookie";

export default function UserProvider({ children }: { children: ReactNode }) {
  const setUser = userStore((state) => state.setUser);
  
  useEffect(() => {
    fetchUser();
  }, []); 
  
  return <>{children}</>;
}