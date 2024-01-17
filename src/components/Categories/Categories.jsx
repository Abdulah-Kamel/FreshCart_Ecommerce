import { useContext, useEffect, useState } from "react";
import styles from "./Categories.module.css";
import { Cartcontext } from "../../Context/cartContext";
import { BeatLoader } from "react-spinners";
import { Link } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
const Categories = () => {
  // const [categories, setCategories] = useState(null);
  // const [loading, setLoading] = useState(true);
  const { getCategories } = useContext(Cartcontext);
  // const getAllCategories = async () => {
  //   const { data } = await getCategories();
  //   console.log(data);
  //   setCategories(data);
  //   setLoading(false);
  // };
  let { isLoading, data } = useQuery({
    queryKey: ["categories"],
    queryFn: getCategories,
  });
  // useEffect(() => {
  //   getAllCategories();
  // }, []);

  return (
    <section className="py-5">
      <section className="container">
        <h1>Categories:</h1>
        <section className="row g-5">
          {isLoading ? (
            <section className="d-flex justify-content-center align-items-center w-100">
              <BeatLoader color="#0aad0a" size={30} />
            </section>
          ) : (
            data?.data.map((product, index) => {
              return (
                <section className="col-md-3" key={index}>
                  <section>
                    <Link to={`/categories/${product._id}`}>
                      <img
                        src={product.image}
                        alt={product.name}
                        className="w-100 rounded"
                        height={"350px"}
                      />
                    </Link>
                    <p className="mt-3">{product.name}</p>
                  </section>
                </section>
              );
            })
          )}
        </section>
      </section>
    </section>
  );
};

export default Categories;
