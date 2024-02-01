import { useContext, useEffect, useState } from "react";
import Slider from "react-slick";
import styles from "./PopularCategores.module.css";
import { PulseLoader } from "react-spinners";
import { Cartcontext } from "../../Context/cartContext.jsx";
import { Link } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { LazyLoadImage } from "react-lazy-load-image-component";

const PopularCategores = () => {
  // const [loading, setLoading] = useState(true);
  // const [categories, setCategories] = useState([]);

  const { getCategories } = useContext(Cartcontext);

  // async function getAllCategories() {
  //   const data = await getCategories();
  //   setCategories(data.data);
  //   setLoading(false);
  // }
  let { isLoading, data } = useQuery({
    queryKey: ["categories"],
    queryFn: getCategories,
  });

  const settings = {
    dots: true,
    infinite: true,
    speed: 700,
    slidesToShow: 6,
    slidesToScroll: 3,
    autoplay: true,
    adaptiveHeight: true,
    arrows: false,
    autoplaySpeed: 3000,
    appendDots: (dots) => {
      return <ul>{dots}</ul>;
    },
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 4,
          slidesToScroll: 4,
          infinite: true,
          dots: true,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 3,
          initialSlide: 2,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };

  // useEffect(() => {
  //   getAllCategories();
  // }, []);

  return (
    <>
      <section className="container mt-5 py-3">
        <section>
          <h3>Shop Popular Categores</h3>
        </section>

        <Slider {...settings}>
          {data?.data.map((category) => (
            <picture key={category._id}>
              <Link to={`/categories/${category._id}`}>
                <LazyLoadImage
                  src={category.image}
                  alt={category.name}
                  className={`w-100 ${styles.slider_image}`}
                  height={200}
                />
              </Link>
              <p className="text-center">{category.name}</p>
            </picture>
          ))}
        </Slider>
      </section>
    </>
  );
};

export default PopularCategores;
