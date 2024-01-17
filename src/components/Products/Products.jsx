import { useContext, useEffect } from "react";
import styles from "./Products.module.css";
import { Cartcontext } from "../../Context/cartContext";
import HomeProducts from "../HomeProducts/HomeProducts";
const Products = () => {
  return (
    <section className="container py-5">
      <h1 className="mb-4">Our Products:</h1>
      <HomeProducts />
    </section>
  );
};

export default Products;
