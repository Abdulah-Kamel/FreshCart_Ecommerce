import { useContext, useEffect, useState } from "react";
import styles from "./Categories.module.css";
import { Cartcontext } from "../../Context/cartContext";
import { PulseLoader } from "react-spinners";
import { Link } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { Helmet } from "react-helmet";
import { LazyLoadImage } from "react-lazy-load-image-component";
import { Shopping_cart_icon } from "../../assets/images";
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
    <>
      <Helmet>
        <title>Categories</title>
        <meta name="description" content="Categories page" />
      </Helmet>
      {isLoading ? (
        <section className="position-absolute bg-main-light top-0 end-0 bottom-0 start-0 d-flex justify-content-center align-items-center w-100 vh-100">
          <PulseLoader color="#0aad0a" size={30} />
        </section>
      ) : (
        <section className="py-5">
          <section className="container">
            <h1>Categories:</h1>
            <section className="row g-5">
              {data?.data.map((product, index) => {
                return (
                  <section className="col-md-3" key={index}>
                    <section>
                      <Link to={`/categories/${product._id}`}>
                        <LazyLoadImage
                          src={product.image}
                          alt={product.name}
                          className="w-100 rounded"
                          height={"350px"}
                          placeholderSrc={Shopping_cart_icon}
                          effect="blur"
                        />
                      </Link>
                      <p className="mt-3">{product.name}</p>
                    </section>
                  </section>
                );
              })}
            </section>
          </section>
        </section>
      )}
    </>
  );
};

export default Categories;
