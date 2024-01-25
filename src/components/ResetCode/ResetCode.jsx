import { useFormik } from "formik";
import styles from "./ResetCode.module.css";
import * as Yup from "yup";
import { Link, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import { string } from "i/lib/util";
import { PulseLoader } from "react-spinners";
import { Helmet } from "react-helmet";

const ResetCode = () => {
  const [loading, setLoading] = useState(true);
  const [submitLoading, setSubmitLoading] = useState(false);
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const baseUrl = "https://ecommerce.routemisr.com";
  async function forgetpassword(values) {
    setSubmitLoading(true);
    let { data } = await axios
      .post(`${baseUrl}/api/v1/auth/verifyResetCode`, values)
      .catch((err) => {
        setError(
          `${string.capitalize(err.response.data.statusMsg)}, ${
            err.response.data.message
          }`
        );
        setSubmitLoading(false);
      });
    if (data.status === "Success") {
      setSubmitLoading(false);
      navigate("/resetpassword");
    }
  }
  const formik = useFormik({
    initialValues: {
      resetCode: "",
    },
    onSubmit: (values) => {
      forgetpassword(values);
    },
    validationSchema: Yup.object({
      resetCode: Yup.string().required("Email is required"),
    }),
  });
  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 500);
  }, []);
  return (
    <>
      <Helmet>
      <title>Reset Code</title>
      <meta name="description" content="Reset Code page" />
    </Helmet>
      {loading ? (
        <section className="position-absolute bg-main-light top-0 end-0 bottom-0 start-0 d-flex justify-content-center align-items-center w-100 vh-100">
          <PulseLoader color="#0aad0a" size={30} />
        </section>
      ) : (
        <section className="container my-5">
          <section>
            <section className="alert alert-warning my-4">
              <p className="text-center fw-bold fs-5 mb-0">
                Reset code sent to your email.
              </p>
            </section>
            <form onSubmit={formik.handleSubmit} className="mt-4">
              <section className="mt-3">
                <label htmlFor="resetCode">reset Code:</label>
                <input
                  type="text"
                  name="resetCode"
                  id="resetCode"
                  className="form-control mt-2"
                  onBlur={formik.handleBlur}
                  onChange={formik.handleChange}
                  value={formik.values.resetCode}
                />
                {formik.touched.resetCode && formik.errors.resetCode ? (
                  <section className="alert alert-danger mt-2">
                    {formik.errors.resetCode}
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

export default ResetCode;
