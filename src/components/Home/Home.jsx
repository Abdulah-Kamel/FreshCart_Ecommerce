import HomeProducts from "../HomeProducts/HomeProducts";
import HomeSlider from "../HomeSlider/HomeSlider";
import PopularCategores from "../PopularCategores/PopularCategores";
import styles from "./Home.module.css";

const Home = () => {
  return (
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
  );
};

export default Home;
