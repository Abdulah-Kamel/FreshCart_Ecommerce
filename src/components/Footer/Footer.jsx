import styles from "./Footer.module.css";
import {
  paypal,
  americanExpress,
  masterCard,
  amazonPay,
  googlePlay,
  appleStore,
} from "../../assets/images";
const Footer = () => {
  return (
    <section className="bg-main-light py-5">
      <section className="container">
        <section>
          <h4 className="fw-bold fs-3">Get The FreshCart app</h4>
          <p className="text-secondary">
            We will send you a link, open it on your phone to download the app.
          </p>
        </section>
        <section className="row justify-content-between align-items-center px-3 mt-4">
          <section className="col col-md-8 col-lg-10">
            <input
              type="text"
              className="form-control w-100 py-2"
              placeholder="Email .."
            />
          </section>
          <section className="col col-md-4 col-lg-2">
            <button className="btn bg-main text-white px-2 px-sm-3 py-2">
              Share App Link
            </button>
          </section>
        </section>
        <section className="row mt-4 border border-3 border-end-0 border-start-0">
          <section className="d-flex flex-wrap align-items-center py-4 col-md-6">
            <p className="fw-bold mb-0">Payment Partners</p>
            <img
              src={amazonPay}
              alt="amazon pay logo"
              width={"70px"}
              className="ms-3"
              height={"50px"}
            />
            <img
              src={americanExpress}
              alt="american express logo"
              width={"70px"}
              height={"70px"}
              className="ms-2"
            />
            <img
              src={masterCard}
              alt="master card logo"
              width={"70px"}
              className="ms-2"
              height={"50px"}
            />
            <img
              src={paypal}
              alt="paypal logo"
              width={"70px"}
              height={"50px"}
              className="ms-2"
            />
          </section>
          <section className="d-flex flex-wrap align-items-center col-md-6 mb-md-0 mb-4">
            <p className="fw-bold me-2 mb-0">Get deliveries with FreshCart</p>
            <img src={appleStore} alt="apple store logo" width={"120px"} />
            <img src={googlePlay} alt="google play logo" width={"120px"} />
          </section>
        </section>
      </section>
    </section>
  );
};

export default Footer;
