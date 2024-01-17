import { useContext, useEffect, useState } from "react";
import Slider from "react-slick";
import styles from "./PopularCategores.module.css";
import { BeatLoader } from "react-spinners";
import { Cartcontext } from "../../Context/cartContext.jsx";
import { Link } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";

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
        {isLoading ? (
          <section className="d-flex justify-content-center align-items-center w-100">
            <BeatLoader color="#0aad0a" size={30} />
          </section>
        ) : (
          <Slider {...settings}>
            {data?.data.map((category) => (
              <picture key={category._id}>
                <Link to={`/categories/${category._id}`}>
                  <img
                    src={category.image}
                    alt=""
                    className="w-100"
                    height={200}
                  />
                </Link>
                <p className="text-center">{category.name}</p>
              </picture>
            ))}
          </Slider>
        )}
      </section>
    </>
  );
};

export default PopularCategores;
