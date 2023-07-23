import React, { useEffect, useState } from "react";

const Reviews = () => {
  const [testimonial, setTestimonial] = useState([]);
  const getTestimonial = async () => {
    try {
      const res = await fetch(`https://thenightsuitco.com/betadmin/Api/home`);
      const data = await res.json();
      setTestimonial(data.testimonial);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    getTestimonial();
  }, []);
  return (
    <div className="container-fluid py-5 p-0 text-center gradient-bg">
      <div
        id="testimonial-control"
        className="carousel slide"
        data-bs-ride="carousel"
      >
        <div className="container carousel-inner">
          {testimonial.map((item, index) => {
            return (
              <div
                className={
                  index === 0 ? "carousel-item active" : "carousel-item"
                }
                key={index}
              >
                <div className="user-img">
                  <img
                    src={`https://thenightsuitco.com/betadmin/public/img/testimonial_images/${item.photo}`}
                    alt=""
                  />
                </div>
                <h2>{item.name}</h2>
                <p>{item.description}</p>
              </div>
            );
          })}
        </div>
        <button
          className="carousel-control-prev"
          type="button"
          data-bs-target="#testimonial-control"
          data-bs-slide="prev"
        >
          <span
            className="carousel-control-prev-icon"
            aria-hidden="true"
          ></span>
          <span className="visually-hidden">Previous</span>
        </button>
        <button
          className="carousel-control-next"
          type="button"
          data-bs-target="#testimonial-control"
          data-bs-slide="next"
        >
          <span
            className="carousel-control-next-icon"
            aria-hidden="true"
          ></span>
          <span className="visually-hidden">Next</span>
        </button>
      </div>
    </div>
  );
};

export default Reviews;
