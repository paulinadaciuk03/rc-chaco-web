
import { useUserStore } from "@/store/userStore";
import { ReactNode } from "react";
import { Navigate } from "react-router-dom";


interface Props {
    children: ReactNode;
}

export default function ProtectedRoute({children} : Props) {
  const isLoggedIn = useUserStore(state => state.isLoggedIn)
  return isLoggedIn ? children : <Navigate to={"/"} replace></Navigate>
}
