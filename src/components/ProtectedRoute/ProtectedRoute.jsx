import { Navigate } from "react-router-dom"
import styles from "./ProtectedRoute.module.css"
const ProtectedRoute = ({children}) => {
  if(!localStorage.getItem("userToken")){
    return <Navigate to={"/login"}/>;
  }
  else{
    return children;
  }
}

export default ProtectedRoute