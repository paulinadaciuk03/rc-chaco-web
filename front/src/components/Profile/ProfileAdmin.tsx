import { useNavigate } from "react-router-dom";
import Header from "../Header/Header";
import { isLoggedIn } from "@/services/AuthService";
import { useEffect } from "react";

export default function ProfileAdmin() {
const navigate = useNavigate();

useEffect(() => {
  if (!isLoggedIn()){
    navigate('/')
  }
}, [])

  return (
    
    <div>
      <Header></Header>
      <h1>admin</h1>
    </div>
  )
}
