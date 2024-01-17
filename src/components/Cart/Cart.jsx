import { useContext, useEffect, useState } from "react";
import styles from "./Cart.module.css";
import { Cartcontext } from "../../Context/cartContext";
import { BeatLoader } from "react-spinners";
import { ToastContainer, toast } from "react-toastify";
import { Link } from "react-router-dom";

const Cart = () => {
  const [loading, setLoading] = useState(true);
  const [cart, setCart] = useState(null);
  const { getCart, updateCart, delteCartItem, clearCart } =
    useContext(Cartcontext);
  const getCartDetails = async () => {
    const data = await getCart()
      .then((data) => {
        setCart(data.data);
      })
      .catch((error) => {
        toast.error(error, {
          position: "top-right",
          duration: 1000,
          className: "text-white bg-danger",
        });
      });
    setLoading(false);
  };
  console.log(cart);
  const updateCartCount = async (id, count) => {
    const data = await updateCart(id, count);
    if (data.data.status == "success") {
      toast.success("Count updated successfully", {
        position: "top-right",
        duration: 1000,
        className: "text-white bg-success",
      });
    } else {
      toast.error(data.data.message, {
        position: "top-right",
        duration: 1000,
        className: "text-white bg-danger",
      });
    }
  };
  const deleteItem = async (id) => {
    const data = await delteCartItem(id);
    if (data.data.status == "success") {
      toast.success("Product deleted successfully", {
        position: "top-right",
        duration: 1000,
        className: "text-white bg-success",
      });
    } else {
      toast.error(data.data.message, {
        position: "top-right",
        duration: 1000,
        className: "text-white bg-danger",
      });
    }
  };
  const deleteCart = async () => {
    const data = await clearCart();
    toast.success("Cart cleared successfully", {
      position: "top-right",
      duration: 1000,
      className: "text-white bg-success",
    });
    setCart(null);
  };

  useEffect(() => {
    getCartDetails();
  }, [cart]);
  return (
    <>
      <ToastContainer limit={4} newestOnTop />
      <section className={`container my-5 p-4 ${styles.bg_light_dark}`}>
        <h3 className="fw-bold">Shop Cart:</h3>
        {loading ? (
          <section className="d-flex justify-content-center align-items-center w-100">
            <BeatLoader color="#0aad0a" size={30} />
          </section>
        ) : (
          <>
            {cart ? (
              <>
                <p className="text-main mt-2">
                  <span className="fw-bold me-1">Total cart price :</span>
                  <span className="me-1 text-black">
                    {cart?.data.totalCartPrice} EGP
                  </span>
                </p>
                <section className="row p-3 gy-4">
                  {cart
                    ? cart.data.products.map((product, index) => {
                        return (
                          <>
                            <section className="col-md-2" key={index}>
                              <section>
                                <img
                                  src={product.product.imageCover}
                                  alt={product.product.title}
                                  className="w-100"
                                  width={"200px"}
                                />
                              </section>
                            </section>
                            <section className="col-md-10 d-flex flex-column justify-content-center">
                              <section className=" px-0 px-md-5 d-flex flex-column align_center">
                                <p className="fw-bold fs-5 mb-1">
                                  {product.product.title}
                                </p>
                                <p className="text-main fs-5">
                                  <span className="text-black">price : </span>
                                  {product.price} EGP
                                </p>
                                <section className="row gy-4 align-items-center justify-content-between mt-1 flex-reverse">
                                  <section className="col-sm-6 d-flex juctify_center ">
                                    <button
                                      className="btn btn-outline-danger px-4 py-2 px-md-4 py-md-1"
                                      onClick={() => {
                                        deleteItem(product.product._id);
                                      }}
                                    >
                                      <i className="fa-solid fa-trash"></i>{" "}
                                      delete
                                    </button>
                                  </section>
                                  <section className="col-sm-6">
                                    <section className="d-flex align-items-center juctify_center juctify_end">
                                      <button
                                        className="btn py-2 px-4 py-sm-1 btn-outline-primary "
                                        onClick={() => {
                                          updateCartCount(
                                            product.product._id,
                                            product.count + 1
                                          );
                                        }}
                                      >
                                        +
                                      </button>
                                      <p className="mb-0 mx-2 fs-4">
                                        {product.count}
                                      </p>
                                      <button
                                        className="btn py-2 px-4 py-sm-1 btn-outline-danger"
                                        onClick={() => {
                                          updateCartCount(
                                            product.product._id,
                                            product.count - 1
                                          );
                                        }}
                                      >
                                        -
                                      </button>
                                    </section>
                                  </section>
                                </section>
                              </section>{" "}
                            </section>
                          </>
                        );
                      })
                    : null}
                  <section className="mt-5 d-flex flex-wrap justify-content-between">
                    <section>
                      <button
                        className="btn btn-danger text-white px-md-4 py-3 mb-sm-0 mb-2"
                        onClick={() => {
                          deleteCart();
                        }}
                      >
                        Clear Cart
                      </button>
                    </section>
                    <section>
                      <Link
                        to={"/checkout"}
                        className="btn bg-main text-white px-md-2 py-3"
                      >
                        Countinue to Checkout
                      </Link>
                    </section>
                  </section>
                </section>
              </>
            ) : (
              <section className="my-5">
                <h3 className="text-center">Your cart is empty</h3>
                <section className="d-flex justify-content-center align-items-center mt-3">
                  <p className="mb-0 fw-bold fs-4 me-2">Start shopping now</p>
                  <Link
                    to={"/products"}
                    className="btn bg-main text-white px-4 py-2"
                  >
                    Shop Now
                  </Link>
                </section>
              </section>
            )}
          </>
        )}
      </section>
    </>
  );
};

export default Cart;
