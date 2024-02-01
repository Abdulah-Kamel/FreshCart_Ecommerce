import styles from "./HomeSlider.module.css";
import Slider from "react-slick";
import {
  slider2,
  blog_2,
  slider_1,
  slider_2,
  slider_3,
  Shopping_cart_icon,
} from "../../assets/images/index.js";
import { LazyLoadImage } from "react-lazy-load-image-component";

const HomeSlider = () => {
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
  return (
    <section className="d-flex container ">
      <section className={styles.width_70}>
        <Slider {...settings}>
          <section>
            <picture>
              <LazyLoadImage
                src={slider_1}
                alt="vegtables backed in a bag"
                className="w-100 rounded rounded-end-0 h-100"
              />
            </picture>
          </section>
          <section>
            <picture>
              <LazyLoadImage
                src={slider_2}
                alt="Red vielet chocolate"
                className="w-100 rounded rounded-end-0 h-100"
                placeholderSrc={Shopping_cart_icon}
              />
            </picture>
          </section>
          <section>
            <picture>
              <LazyLoadImage
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
          <LazyLoadImage
            src={slider2}
            alt="vegtables in a basket"
            className="w-100 rounded rounded-start-0 rounded-bottom-0 h-100"
          />
        </picture>
        <picture className="h-100 pb-1">
          <LazyLoadImage
            src={blog_2}
            alt="vegtables on a table"
            className="w-100 rounded rounded-start-0 rounded-top-0 h-100"
          />
        </picture>
      </section>
    </section>
  );
};

export default HomeSlider;
