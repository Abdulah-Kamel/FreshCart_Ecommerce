import { useContext, useEffect, useState } from "react";
import styles from "./AllOrders.module.css";
import { Cartcontext } from "../../Context/cartContext";
import { Link } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { PulseLoader } from "react-spinners";
import { toast } from "react-toastify";
import { Helmet } from "react-helmet";
import { LazyLoadImage } from "react-lazy-load-image-component";
import { Shopping_cart_icon } from "../../assets/images";
const AllOrders = () => {
  // const [orders, setOrders] = useState(null);
  // const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);

  const { getAllOrders } = useContext(Cartcontext);

  let { data, isLoading, isError } = useQuery({
    queryKey: ["orders", page],
    queryFn: () => getAllOrders(page),
    keepPreviousData: true,
  });

  console.log(data?.data.data);

  isError
    ? toast.error(isError, {
        position: "top-right",
        duration: 1000,
        className: "text-white bg-danger",
      })
    : null;
  // const getOrders = async (page) => {
  //   setLoading(true);
  //   const data = await getAllOrders(page);
  //   setOrders(data.data.data);
  //   console.log(data.data.metadata);
  //   setCurrentPage(data.data.metadata.currentPage);
  //   setNextPage(data.data.metadata.nextPage);
  //   setPrevPage(data.data.metadata.prevPage);
  //   console.log(orders);
  //   setLoading(false);
  // };
  // useEffect(() => {
  //   getOrders();
  // }, []);
  return (
    <section>
      <Helmet>
        <title>All Orders</title>
        <meta name="description" content="All orders page" />
      </Helmet>
      {isLoading ? (
        <section className="position-absolute bg-main-light top-0 end-0 bottom-0 start-0 d-flex justify-content-center align-items-center w-100 vh-100">
          <PulseLoader color="#0aad0a" size={30} />
        </section>
      ) : (
        <section className="container bg-main-light my-5 p-4 rounded">
          <h1>All Orders:</h1>
          <section className="row g-3">
            {data?.data.data.slice(0, 10).map((order, index) => {
              return (
                <section key={index} className="mt-5">
                  <section>
                    <p>
                      <span className="fw-bold me-1">Order Date:</span>{" "}
                      {order.createdAt}
                    </p>
                    <p>
                      <span className="fw-bold me-1">Status:</span>{" "}
                      {order.isDelivered ? "Delivered" : "Not Delivered"}
                    </p>
                    <p>
                      <span className="fw-bold me-1">paymentMethod:</span>{" "}
                      {order.paymentMethodType}
                    </p>
                    <p>
                      <span className="fw-bold me-1">Total:</span> $
                      {order.totalOrderPrice}
                    </p>
                    <section>
                      <p className="fw-bold">Products:</p>
                      <section className="d-flex align-items-center">
                        {order.cartItems.map((product, index) => {
                          return (
                            <picture key={index} className="me-2">
                              <LazyLoadImage
                                src={product.product.imageCover}
                                alt=""
                                width={"100px"}
                                placeholderSrc={Shopping_cart_icon}
                                effect="blur"
                              />
                            </picture>
                          );
                        })}
                      </section>
                    </section>
                  </section>
                </section>
              );
            })}
          </section>
          {isLoading ? null : (
            <nav
              aria-label="..."
              className="d-flex justify-content-center mt-3"
            >
              <ul className="pagination">
                <li
                  className={`page-item ${
                    data?.data.metadata.prevPage ? "" : "disabled"
                  }`}
                >
                  <button
                    className="page-link"
                    onClick={() => setPage(data?.data.metadata.prevPage)}
                  >
                    Previous
                  </button>
                </li>
                {data?.data.metadata.prevPage ? (
                  <li className="page-item">
                    <button
                      className="page-link"
                      onClick={() => setPage(data?.data.metadata.prevPage)}
                    >
                      {data?.data.metadata.prevPage}
                    </button>
                  </li>
                ) : null}

                <li className="page-item bg-main" aria-current="page">
                  <button
                    className="page-link bg-main text-white"
                    onClick={() => setPage(data?.data.metadata.currentPage)}
                  >
                    {data?.data.metadata.currentPage}
                  </button>
                </li>
                {data?.data.metadata.nextPage ? (
                  <li className="page-item">
                    <button
                      className="page-link"
                      onClick={() => setPage(data?.data.metadata.nextPage)}
                    >
                      {data?.data.metadata.nextPage}
                    </button>
                  </li>
                ) : null}

                <li className="page-item">
                  <button
                    className="page-link"
                    onClick={() => setPage(data?.data.metadata.nextPage)}
                  >
                    Next
                  </button>
                </li>
              </ul>
            </nav>
          )}
        </section>
      )}
    </section>
  );
};

export default AllOrders;
