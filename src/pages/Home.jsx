import React from "react";
import Carousel from "../components/Carousel";
import Feature from "../components/Feature";
import AlertModal from "../components/AlertModal";
import Reviews from "../components/Reviews";
import about1 from "../images/about1.jpg";
import about2 from "../images/about2.jpg";

const Home = () => {
  return (
    <>
      <AlertModal />
      <Carousel />
      <>
        <div className="about container py-4">
          <div>
            <h1 className="text-capitalize mb-2">The Night suit co</h1>
            <p>
              Lorem ipsum dolor sit amet consectetur, adipisicing elit.
              Repellendus modi facilis sit harum rerum itaque sapiente? Quidem,
              repellendus explicabo perferendis, expedita laboriosam nam quis
              maiores ex adipisci inventore atque quo.
            </p>
          </div>
          <div>
            <img src={about1} alt="" />
          </div>
          <div>
            <img src={about2} alt="" />
          </div>
        </div>
      </>
      <Feature />
    </>
  );
};

export default Home;
