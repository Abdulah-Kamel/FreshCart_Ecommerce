import styles from "./NavBar.module.css";
import { Link, Navigate } from "react-router-dom";
import { Logo } from "../../assets/images/index.js";
import { useContext, useEffect, useState } from "react";
import { Cartcontext } from "../../Context/cartContext.jsx";

const NavBar = ({ logout, userData }) => {
  const { cartCount } = useContext(Cartcontext);

  useEffect(() => {}, [cartCount]);
  return (
    <nav className="navbar navbar-expand-lg bg-main-light">
      <div className="container-fluid">
        <Link className="navbar-brand" to="/">
          <img src={Logo} alt="Fresh cart logo" className="w-100" />
        </Link>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            <li className="nav-item">
              <Link className="nav-link active" aria-current="page" to="/">
                Home
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="products">
                Products
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="categories">
                Categories
              </Link>
            </li>
          </ul>
          <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
            <li className="nav-item d-flex align-items-center">
              <Link to="https://facebook.com">
                <i className="fab fa-facebook text-black mx-2"></i>
              </Link>
              <Link to="https://twitter.com">
                <i className="fab fa-twitter text-black mx-2"></i>
              </Link>
              <Link to="https://facebook.com">
                <i className="fab fa-instagram text-black mx-2"></i>
              </Link>
              <Link to="https://tiktok.com">
                <i className="fab fa-tiktok text-black mx-2"></i>
              </Link>
              <Link to="https://youtube.com">
                <i className="fab fa-youtube text-black mx-2"></i>
              </Link>
            </li>
            <li className="nav-item d-flex align-items-center me-4">
              <Link className="nav-link" to="cart">
                <section className="position-relative">
                  <i className="fa-solid fa-cart-shopping fs-5 bg-light"></i>
                  <span className="rounded px-2 position-absolute start-100 fw-bold text-main bg-main text-white">
                    {cartCount}
                  </span>
                </section>
              </Link>
            </li>
            {userData == null ? (
              <>
                <li className="nav-item">
                  <Link className="nav-link" aria-current="page" to="/register">
                    Register
                  </Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to="login">
                    Login
                  </Link>
                </li>
              </>
            ) : (
              <li className="nav-item dropdown me-lg-5 me-0">
                <a
                  className="nav-link dropdown-toggle"
                  href="#"
                  role="button"
                  data-bs-toggle="dropdown"
                  aria-expanded="false"
                >
                  {userData.name}
                </a>
                <ul className="dropdown-menu bg-main-light">
                  <li className="dropdown-item">
                    <Link className="nav-link" to={"/allorders"}>
                      Allorders
                    </Link>
                  </li>
                  <li className="dropdown-item">
                    <Link className="nav-link" onClick={logout}>
                      Logout
                    </Link>
                  </li>
                </ul>
              </li>
            )}
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default NavBar;
