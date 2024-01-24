import { useFormik } from "formik";
import styles from "./Login.module.css";
import * as Yup from "yup";
import { Link, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import { string } from "i/lib/util";
import { PulseLoader } from "react-spinners";

const Login = ({ saveUserData }) => {
  const [loading, setLoading] = useState(true);
  const [loginLodaing, setLoginLodaing] = useState(false);
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const baseUrl = "https://ecommerce.routemisr.com";
  async function handleLogin(values) {
    setLoginLodaing(true);
    let { data } = await axios
      .post(`${baseUrl}/api/v1/auth/signin`, values)
      .catch((err) => {
        setError(
          `${string.capitalize(err.response.data.statusMsg)}, ${
            err.response.data.message
          }`
        );
        setLoginLodaing(false);
      });
    if (data.message === "success") {
      setLoginLodaing(false);
      localStorage.setItem("userToken", data.token);
      navigate("/");
      saveUserData();
    }
  }
  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    onSubmit: (values) => {
      handleLogin(values);
    },
    validationSchema: Yup.object({
      email: Yup.string()
        .email("Invalid email address")
        .required("Email is required"),
      password: Yup.string()
        .matches(
          /^[A-Z][A-Za-z0-9]{7,}/,
          "Password must be at least 8 characters long and contain at least one uppercase letter"
        )
        .required("Password is required"),
    }),
  });
  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 500);
  }, []);
  return (
    <>
      {loading ? (
        <section className="position-absolute bg-main-light top-0 end-0 bottom-0 start-0 d-flex justify-content-center align-items-center w-100 vh-100">
          <PulseLoader color="#0aad0a" size={30} />
        </section>
      ) : (
        <section className="container my-5">
          <section>
            <h2 className="fw-bold">Login</h2>
            <form onSubmit={formik.handleSubmit} className="mt-4">
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
              {error ? (
                <section className="alert alert-danger my-4">
                  <p className="text-center fw-bold fs-5 mb-0">{error}</p>
                </section>
              ) : null}
              <section className="mt-3 d-flex justify-content-end align-items-center">
                <p>
                  <span>Forget your password?</span>{" "}
                  <Link to="/forgetpassword" className="text-main register">
                    reset password
                  </Link>
                </p>
                <button
                  type="submit"
                  className={`btn bg-main text-white ms-auto px-3 py-2`}
                  disabled={!formik.isValid}
                >
                  {loginLodaing ? (
                    <i className="fas fa-spinner fa-spin"></i>
                  ) : (
                    "Login"
                  )}
                </button>
              </section>
            </form>
          </section>
        </section>
      )}
    </>
  );
};

export default Login;
