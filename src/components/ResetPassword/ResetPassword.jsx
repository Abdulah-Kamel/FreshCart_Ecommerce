import { useFormik } from "formik";
import styles from "./ResetPassword.module.css";
import * as Yup from "yup";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import { string } from "i/lib/util";
import { PulseLoader } from "react-spinners";

const ResetPassword = () => {
  const [loading, setLoading] = useState(true);
  const [submitLoading, setSubmitLoading] = useState(false);
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const baseUrl = "https://ecommerce.routemisr.com";
  async function resetPassword(values) {
    setSubmitLoading(true);
    let { data } = await axios
      .put(`${baseUrl}/api/v1/auth/resetPassword`, values)
      .catch((err) => {
        setError(
          `${string.capitalize(err.response.data.statusMsg)}, ${
            err.response.data.message
          }`
        );
        setSubmitLoading(false);
      });
    console.log(data);
    if (data.token) {
      setSubmitLoading(false);
      navigate("/login");
    }
  }
  const formik = useFormik({
    initialValues: {
      email: "",
      newPassword: "",
    },
    onSubmit: (values) => {
      resetPassword(values);
    },
    validationSchema: Yup.object({
      email: Yup.string().email().required("Email is required"),
      newPassword: Yup.string()
        .matches(
          /^[A-Z][A-Za-z0-9!@#$%^&*]{7,}$/,
          "Password should start with uppercase and have at least 8 characters"
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
        <section className="position-absolute top-0 start-0 end-0 bottom-0 bg-main-light d-flex justify-content-center align-items-center w-100 vh-100">
          <PulseLoader color="#0aad0a" size={30} />
        </section>
      ) : (
        <section className="container my-5">
          <section>
            <h2>Reset Password</h2>
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
                  value={formik.values.email.trim()}
                />
                {formik.touched.email && formik.errors.email ? (
                  <section className="alert alert-danger mt-2">
                    {formik.errors.email}
                  </section>
                ) : null}
              </section>
              <section className="mt-3">
                <label htmlFor="password">New Password:</label>
                <input
                  type="password"
                  name="newPassword"
                  id="password"
                  className="form-control mt-2"
                  onBlur={formik.handleBlur}
                  onChange={formik.handleChange}
                  value={formik.values.newPassword.trim()}
                />
                {formik.touched.newPassword && formik.errors.newPassword ? (
                  <section className="alert alert-danger mt-2">
                    {formik.errors.newPassword}
                  </section>
                ) : null}
              </section>
              {error ? (
                <section className="alert alert-danger my-4">
                  <p className="text-center fw-bold fs-5 mb-0">{error}</p>
                </section>
              ) : null}
              <section className="mt-3 d-flex justify-content-end align-items-center">
                <button
                  type="submit"
                  className={`btn bg-main text-white ms-auto px-3 py-2`}
                  disabled={!formik.isValid}
                >
                  {submitLoading ? (
                    <i className="fas fa-spinner fa-spin"></i>
                  ) : (
                    "submit"
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

export default ResetPassword;
