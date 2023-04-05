import React from "react";

const Tile = ({ title }) => {
  return (
    <div className="container-fluid gradient-tile">
      <h2>{title}</h2>
    </div>
  );
};

export default Tile;
