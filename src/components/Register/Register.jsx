import { useFormik } from "formik";
import styles from "./Register.module.css";
import * as Yup from "yup";
import { useEffect, useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { string } from "i/lib/util";
import {BeatLoader} from "react-spinners"

const Register = () => {
  const [loading, setLoading] = useState(true);
  const [registerLoading, setRegisterLoading] = useState(false);
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const baseUrl = "https://ecommerce.routemisr.com";
  async function handleRegister(values) {
    setRegisterLoading(true);
    let { data } = await axios
      .post(`${baseUrl}/api/v1/auth/signup`, values)
      .catch((err) => {
        setError(
          `${string.capitalize(err.response.data.statusMsg)}, ${
            err.response.data.message
          }`
        );
        setRegisterLoading(false);
      });
    if (data.message === "success") {
      setRegisterLoading(false);
      navigate("/login");
    }
  }
  const formik = useFormik({
    initialValues: {
      name: "",
      email: "",
      password: "",
      rePassword: "",
      phone: "",
    },
    onSubmit: (values) => {
      handleRegister(values);
    },
    validationSchema: Yup.object({
      name: Yup.string()
        .min(3, "Must be 3 characters or more")
        .max(15, " Must be 15 characters or less")
        .required("Name is required"),
      email: Yup.string()
        .email("Invalid email address")
        .required("Email is required"),
      password: Yup.string()
        .matches(
          /^[A-Z][A-Za-z0-9]{7,}/,
          "Password must be at least 8 characters long and contain at least one uppercase letter"
        )
        .required("Password is required"),
      rePassword: Yup.string()
        .oneOf([Yup.ref("password"), null], "Password must match")
        .required("Re-Password is required"),
      phone: Yup.string()
        .matches(/^01[0125][0-9]{8}$/, "Invalid phone number")
        .required("Phone is required"),
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
          <BeatLoader color="#0aad0a" size={30}/>
        </section>
      ) : (
        <section>
          <h2 className="fw-bold">Register Now</h2>
          <form onSubmit={formik.handleSubmit} className="mt-3">
            <section className="mt-3">
              <label htmlFor="name">Name:</label>
              <input
                type="text"
                name="name"
                id="name"
                className="form-control mt-2"
                onBlur={formik.handleBlur}
                onChange={formik.handleChange}
                value={formik.values.name}
              />
              {formik.touched.name && formik.errors.name ? (
                <section className="alert alert-danger mt-2">
                  {formik.errors.name}
                </section>
              ) : null}
            </section>
            <section className="mt-3">
              <label htmlFor="email">Email:</label>
              <input
                type="email"
                name="email"
                id="email"
                className="form-control mt-2"
                onBlur={formik.handleBlur}
                onChange={formik.handleChange}
                value={formik.values.email}
              />
              {formik.touched.email && formik.errors.email ? (
                <section className="alert alert-danger mt-2">
                  {formik.errors.email}
                </section>
              ) : null}
            </section>
            <section className="mt-3">
              <label htmlFor="password">Password:</label>
              <input
                type="password"
                name="password"
                id="password"
                className="form-control mt-2"
                onBlur={formik.handleBlur}
                onChange={formik.handleChange}
                value={formik.values.password}
              />
              {formik.touched.password && formik.errors.password ? (
                <section className="alert alert-danger mt-2">
                  {formik.errors.password}
                </section>
              ) : null}
            </section>
            <section className="mt-3">
              <label htmlFor="rePassword">rePassword:</label>
              <input
                type="password"
                name="rePassword"
                id="rePassword"
                className="form-control mt-2"
                onBlur={formik.handleBlur}
                onChange={formik.handleChange}
                value={formik.values.rePassword}
              />
              {formik.touched.rePassword && formik.errors.rePassword ? (
                <section className="alert alert-danger mt-2">
                  {formik.errors.rePassword}
                </section>
              ) : null}
            </section>
            <section className="mt-3">
              <label htmlFor="phone">Phone:</label>
              <input
                type="tel"
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
            <section className="mt-3 d-flex justify-content-end align-items-center">
            <p>
                <span>have an account?</span>{" "}
                <Link to="/login" className="text-main register">
                  Login Now
                </Link>
              </p>
              <button
                type="submit"
                className={`btn bg-main text-white ms-auto px-3 py-2`}
                disabled={!(formik.isValid && formik.dirty)}
              >
                {registerLoading ? (
                  <i className="fas fa-spinner fa-spin"></i>
                ) : (
                  "Register"
                )}
              </button>
            </section>
          </form>
        </section>
      )}
    </section>
  );
};

export default Register;
