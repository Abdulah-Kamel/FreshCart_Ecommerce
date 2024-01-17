import styles from "./HomeSlider.module.css";
import Slider from "react-slick";
import {
  slider2,
  blog_2,
  slider_1,
  slider_2,
  slider_3,
} from "../../assets/images/index.js";
import { useEffect, useState } from "react";
import { BeatLoader } from "react-spinners";
const HomeSlider = () => {
  const [loading, setLoading] = useState(true);
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    adaptiveHeight: true,
    arrows: false,
    autoplaySpeed: 3000,
    appendDots: (dots) => {
      return <ul>{dots}</ul>;
    },
  };
  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 1000);
  });
  return (
    <section className="d-flex container ">
      {loading ? (
        <section className="d-flex justify-content-center align-items-center w-100">
          <BeatLoader color="#0aad0a" size={30} />
        </section>
      ) : (
        <>
          <section className={styles.width_70}>
            <Slider {...settings}>
              <section>
                <picture>
                  <img
                    src={slider_1}
                    alt="vegtables backed in a bag"
                    className="w-100 rounded rounded-end-0 h-100"
                  />
                </picture>
              </section>
              <section>
                <picture>
                  <img
                    src={slider_2}
                    alt="Red vielet chocolate"
                    className="w-100 rounded rounded-end-0 h-100"
                  />
                </picture>
              </section>
              <section>
                <picture>
                  <img
                    src={slider_3}
                    alt="lasta bancakes"
                    className="w-100 rounded rounded-end-0 h-100"
                  />
                </picture>
              </section>
            </Slider>
          </section>
          <section className={` ${styles.width_30} d-flex flex-column`}>
            <picture className="h-100">
              <img
                src={slider2}
                alt="vegtables in a basket"
                className="w-100 rounded rounded-start-0 rounded-bottom-0 h-100"
              />
            </picture>
            <picture className="h-100 pb-1">
              <img
                src={blog_2}
                alt="vegtables on a table"
                className="w-100 rounded rounded-start-0 rounded-top-0 h-100"
              />
            </picture>
          </section>
        </>
      )}
    </section>
  );
};

export default HomeSlider;
