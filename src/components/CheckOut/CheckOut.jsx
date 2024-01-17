import styles from "./CheckOut.module.css";
import { useFormik } from "formik";
import * as Yup from "yup";
import { Link } from "react-router-dom";
import { useContext, useEffect, useState } from "react";
import { BeatLoader } from "react-spinners";
import { Cartcontext } from "../../Context/cartContext";

const CheckOut = () => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [checkOutLodaing, setCheckOutLodaing] = useState(false);
  const { checkOut, cartId } = useContext(Cartcontext);
  const handelCheckOut = async (values) => {
    setCheckOutLodaing(true);
    const data = await checkOut(cartId, values);
    setCheckOutLodaing(false);
    if (data?.data.status === "success") {
      window.location.href = data.data.session.url;
    }
  };
  const formik = useFormik({
    initialValues: {
      details: "",
      phone: "",
      city: "",
    },
    onSubmit: (values) => {
      handelCheckOut(values);
    },
    validationSchema: Yup.object({
      details: Yup.string().required("Details is required"),
      phone: Yup.string()
        .required("Phone is required")
        .matches(/^01[0125][0-9]{8}$/gm, "Phone number is not valid"),
      city: Yup.string().required("City is required"),
    }),
  });
  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 500);
  }, []);
  return (
    <section className="container my-5">
      {loading ? (
        <section className="d-flex justify-content-center align-items-center w-100 vh-100">
          <BeatLoader color="#0aad0a" size={30} />
        </section>
      ) : (
        <section>
          <h2 className="fw-bold">CheckOut</h2>
          <form onSubmit={formik.handleSubmit} className="mt-4">
            <section className="mt-3">
              <label htmlFor="details">Details:</label>
              <input
                type="details"
                name="details"
                id="details"
                className="form-control mt-2"
                onBlur={formik.handleBlur}
                onChange={formik.handleChange}
                value={formik.values.details}
              />
              {formik.touched.details && formik.errors.details ? (
                <section className="alert alert-danger mt-2">
                  {formik.errors.details}
                </section>
              ) : null}
            </section>
            <section className="mt-3">
              <label htmlFor="phone">Phone:</label>
              <input
                type="phone"
                name="phone"
                id="phone"
                className="form-control mt-2"
                onBlur={formik.handleBlur}
                onChange={formik.handleChange}
                value={formik.values.phone}
              />
              {formik.touched.phone && formik.errors.phone ? (
                <section className="alert alert-danger mt-2">
                  {formik.errors.phone}
                </section>
              ) : null}
            </section>
            {error ? (
              <section className="alert alert-danger my-4">
                <p className="text-center fw-bold fs-5 mb-0">{error}</p>
              </section>
            ) : null}
            <section className="mt-3">
              <label htmlFor="city">City:</label>
              <input
                type="city"
                name="city"
                id="city"
                className="form-control mt-2"
                onBlur={formik.handleBlur}
                onChange={formik.handleChange}
                value={formik.values.city}
              />
              {formik.touched.city && formik.errors.city ? (
                <section className="alert alert-danger mt-2">
                  {formik.errors.city}
                </section>
              ) : null}
            </section>
            {error ? (
              <section className="alert alert-danger my-4">
                <p className="text-center fw-bold fs-5 mb-0">{error}</p>
              </section>
            ) : null}
            <section className="mt-3 d-flex justify-content-end">
              <button className="btn bg-main text-white px-4 py-2">
                {checkOutLodaing ? (
                  <i className="fa fa-spinner fa-spin"></i>
                ) : (
                  "Submit"
                )}
              </button>
            </section>
          </form>
        </section>
      )}
    </section>
  );
};

export default CheckOut;
