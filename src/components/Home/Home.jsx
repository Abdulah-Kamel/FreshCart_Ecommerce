import { useContext, useEffect } from "react";
import HomeProducts from "../HomeProducts/HomeProducts";
import HomeSlider from "../HomeSlider/HomeSlider";
import PopularCategores from "../PopularCategores/PopularCategores";
import styles from "./Home.module.css";
import { Cartcontext } from "../../Context/cartContext";
import { PulseLoader } from "react-spinners";
import { Helmet } from "react-helmet";

const Home = () => {
  const { homeLoading, setHomeLoading } = useContext(Cartcontext);
  useEffect(() => {
    setTimeout(() => {
      setHomeLoading(false);
    }, 2000);
  }, []);
  return (
    <>
      <Helmet>
        <title>Fresh Cart</title>
        <meta name="description" content="Home page" />
      </Helmet>
      {homeLoading ? (
        <section className="position-absolute bg-main-light top-0 end-0 bottom-0 start-0 d-flex justify-content-center align-items-center w-100 vh-100">
          <PulseLoader color="#0aad0a" size={30} />
        </section>
      ) : (
        <>
          <section className="py-4">
            <HomeSlider />
            <section className="mt-3">
              <PopularCategores />
            </section>
            <section className="mt-5">
              <section className="container">
                <HomeProducts />
              </section>
            </section>
          </section>
        </>
      )}
    </>
  );
};

export default Home;
