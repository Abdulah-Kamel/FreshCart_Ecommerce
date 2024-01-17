import { Outlet, Navigate } from "react-router-dom";
import NavBar from "../NavBar/NavBar";
import styles from "./Layout.module.css";
import Footer from "../Footer/Footer";

const Layout = ({ userData, cartCount }) => {
  const logout = () => {
    localStorage.removeItem("userToken");
    Navigate("/login");
  };
  return (
    <>
      <NavBar logout={logout} userData={userData} cartCount={cartCount} />
      <Outlet />
      <Footer />
    </>
  );
};

export default Layout;
