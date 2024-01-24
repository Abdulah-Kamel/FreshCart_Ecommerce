import styles from "./Wishlist.module.css";
import { useContext, useEffect, useState } from "react";
import { Cartcontext } from "../../Context/cartContext";
import { PulseLoader } from "react-spinners";
import { ToastContainer, toast } from "react-toastify";
import { Link } from "react-router-dom";
const Wishlist = () => {
  // const [page, setPage] = useState(1);

  const { getWishList, deleteFromWishlist } = useContext(Cartcontext);
  const [isLoading, setIsLoading] = useState(true);
  const [wishList, setWishList] = useState(null);
  // let { data, isLoading, isError } = useQuery({
  //   queryKey: ["wishlist"],
  //   queryFn: () => getWishList(),
  // });
  // console.log(data);

  const getwishList = async () => {
    const data = await getWishList();
    console.log(data);
    setWishList(data.data.data);
    setIsLoading(false);
  };

  const removeProduct = async (id) => {
    toast.warning("Removing...", {
      className: "text-white bg-primary",
      position: "top-right",
      duration: 500,
    });
    const data = await deleteFromWishlist(id);
    console.log(data);
    if (data.data.status == "success") {
      toast.success(data.data.message, {
        position: "top-right",
        duration: 500,
        className: "text-white bg-success",
      });
    } else {
      toast.error(data.data.message, {
        position: "top-right",
        duration: 500,
        className: "text-white bg-danger",
      });
    }
  };

  useEffect(() => {
    getwishList();
  }, [wishList]);
  return (
    <section>
      <ToastContainer />
      {isLoading ? (
        <section className="position-absolute bg-main-light top-0 end-0 bottom-0 start-0 d-flex justify-content-center align-items-center w-100 vh-100">
          <PulseLoader color="#0aad0a" size={30} />
        </section>
      ) : (
        <section className="container  my-5 p-4 rounded">
          <h1>Wish List:</h1>
          <section className="row g-4 mt-3">
            {wishList.length > 0 ? (
              wishList.map((product, index) => {
                return (
                  <section
                    className="col-xl-3 col-lg-4 col-sm-6 overflow-hidden position-relative"
                    key={index}
                  >
                    <section className="px-3 py-2 product">
                      <Link to={`/products/${product._id}`}>
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
                          {product.title.split(" ").slice(0, 2).join(" ")}
                        </p>
                        <section className="d-flex justify-content-between align-items-center">
                          <span className="fw-bold">
                            <span>{product.price}</span>
                            <span className="ms-1">EGP</span>
                          </span>
                          <span>
                            <span>
                              <i className="fa fa-star rating-color me-1"></i>
                            </span>
                            <span>{product.ratingsAverage}</span>
                          </span>
                        </section>
                      </section>

                      <section className="mt-3 d-flex justify-content-center align-items-center">
                        <a
                          className="btn px-3 py-2 fw-bold btn-danger w-100 text-white"
                          onClick={() => removeProduct(product._id)}
                        >
                          Delete from WishList
                        </a>
                      </section>
                    </section>
                  </section>
                );
              })
            ) : (
              <section className="d-flex justify-content-center align-items-center w-100">
                <p className="mb-0 me-2 fs-4">No Wish List Found</p>
                <Link className="btn bg-main text-white " to={"/products"}>
                  Add Products
                </Link>
              </section>
            )}
          </section>
        </section>
      )}
    </section>
  );
};

export default Wishlist;
