import React, { useEffect, useRef, useState } from "react";
import carouselData from "../data/carouselData";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa";

const Carousel = () => {
  const carousel_images = useRef([]);
  carousel_images.current = [];
  const add_images = (img) => {
    if (img && !carousel_images.current.includes(img)) {
      carousel_images.current.push(img);
    }
  };
  const [count, setCount] = useState(0);
  useEffect(() => {
    carousel_images.current.forEach((item, index) => {
      item.style.left = `${index * 100}%`;
    });
  }, [carousel_images.current]);
  const previous_slide = () => {
    if (count > 0) {
      setCount(count - 1);
      slideImage();
    } else {
      setCount(carouselData.length - 1);
      slideImage();
    }
  };
  const next_slide = () => {
    if (count < carouselData.length - 1) {
      setCount(count + 1);
      slideImage();
    } else {
      setCount(0);
      slideImage();
    }
  };
  const slideImage = () => {
    carousel_images.current.forEach((img) => {
      img.style.transform = `translateX(-${count * 100}%)`;
    });
  };
  return (
    <div className="carousel-container">
      {carouselData.map((item, index) => {
        return <img src={item.img} key={index} ref={add_images} alt="" />;
      })}
      <button className="button leftarrow" onClick={previous_slide}>
        <FaArrowLeft />
      </button>
      <button className="button rightarrow" onClick={next_slide}>
        <FaArrowRight />
      </button>
    </div>
  );
};

export default Carousel;
