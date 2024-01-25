import { useContext, useEffect, useState } from "react";
import styles from "./SingleCategories.module.css";
import { Cartcontext } from "../../Context/cartContext";
import { Link, Navigate, useParams } from "react-router-dom";
import { PulseLoader } from "react-spinners";
import NotFound from "../NotFound/NotFound";
import { Helmet } from "react-helmet";
const SingleCategories = () => {
  const [loading, setLoading] = useState(true);
  const [products, setProducts] = useState(null);
  const { getProducts } = useContext(Cartcontext);
  const { categoryId } = useParams();
  const getCategory = async () => {
    const data = await getProducts();
    setProducts(
      data.data.filter((proudct) => {
        return proudct.category._id === categoryId;
      })
    );
    setLoading(false);
  };
  const notFound = () => {
    Navigate("/notfound");
  };

  useEffect(() => {
    getCategory();
  }, []);
  return (
    <>
      <Helmet>
        <title>Categorie</title>
        <meta name="description" content="single category page" />
      </Helmet>
      <section className="container py-5">
        <section className="row gx-3 gy-5">
          <h1>Category Products:</h1>
          {loading ? (
            <section className="d-flex justify-content-center align-items-center w-100">
              <PulseLoader color="#0aad0a" size={30} />
            </section>
          ) : products.length > 0 ? (
            products.map((product, index) => {
              return (
                <section
                  className="col-xl-3 col-lg-4 col-md-6 overflow-hidden"
                  key={index}
                >
                  <section className="px-3 py-2 product">
                    <Link
                      to={`/products/${product._id}`}
                      className="text-decoration-none"
                    >
                      <img
                        src={product.imageCover}
                        alt={product.title}
                        className="w-100"
                      />
                    </Link>

                    <section className="mt-3">
                      <p className="text-main fw-semibold">
                        {product.category.name}
                      </p>
                      <p className="fw-bold fs-5">
                        {product.title.length > 18
                          ? product.title.slice(0, 18) + "..."
                          : product.title.slice(0, 18)}
                      </p>
                      <section className="d-flex justify-content-between align-items-center">
                        <span className="fw-bold">
                          <span>{product.price}</span>{" "}
                          <span className="ms-1">EGP</span>
                        </span>
                        <span>
                          <span>
                            <i className="fa fa-star rating-color me-1"></i>
                          </span>
                          <span>{product.ratingsAverage}</span>{" "}
                        </span>
                      </section>
                    </section>

                    <section className="mt-3 d-flex justify-content-center align-items-center">
                      <a className="btn px-3 py-2 fw-bold bg-main w-100 text-white">
                        Add To Cart
                      </a>
                    </section>
                  </section>
                </section>
              );
            })
          ) : (
            <section className="text-center">
              <p className="fs-4">Sorry no Products for this category yet</p>
            </section>
          )}
        </section>
      </section>
    </>
  );
};

export default SingleCategories;
