import React, { useContext, useEffect, useRef, useState } from "react";
import { FaFilter, FaTimes } from "react-icons/fa";
import { IoIosArrowDown } from "react-icons/io";
import { ProductContext } from "../context/ProductContext";
//
import { color, category, fabric } from "../data/searchfilter";

const SearchFilter = () => {
  const { products, newProducts, setNewProducts } = useContext(ProductContext);
  const searchfilter = useRef(null);
  const [toggle, setToggle] = useState(false);
  const toggleSearchFilter = () => {
    setToggle(!toggle);
  };
  useEffect(() => {
    toggle
      ? searchfilter.current.classList.add("active")
      : searchfilter.current.classList.remove("active");
  }, [toggle]);
  //
  const [search, setSearch] = useState("");
  const [range, setRange] = useState(0);
  const [colors, setcolors] = useState([]);
  const addcolor = (e, color) => {
    if (e.target.checked) {
      const colorExist = colors.find((item) => {
        return item === color;
      });
      if (!colorExist) {
        setcolors([...colors, color.replace(/\s/g, "")]);
      }
    }
    if (!e.target.checked) {
      const filtered = colors.filter((item) => {
        return item !== color.replace(/\s/g, "");
      });
      setcolors(filtered);
    }
  };
  const [categories, setCategories] = useState([]);
  const addCategory = (e, category) => {
    if (e.target.checked) {
      const categoryExist = categories.find((item) => {
        return item === category;
      });
      if (!categoryExist) {
        setCategories([...categories, category.replace(/\s/g, "")]);
      }
    }
    if (!e.target.checked) {
      const filtered = categories.filter((item) => {
        return item !== category.replace(/\s/g, "");
      });
      setCategories(filtered);
    }
  };
  const [fabrics, setfabrics] = useState([]);
  const addFabric = (e, category) => {
    if (e.target.checked) {
      const categoryExist = fabrics.find((item) => {
        return item === category;
      });
      if (!categoryExist) {
        setfabrics([...fabrics, category.replace(/\s/g, "")]);
      }
    }
    if (!e.target.checked) {
      const filtered = fabrics.filter((item) => {
        return item !== category.replace(/\s/g, "");
      });
      setfabrics(filtered);
    }
  };
  //
  const applyFilter = () => {
    let updated = products;
    //
    if (search !== "") {
      updated = updated.filter((item) => {
        return (
          item.color.toLowerCase().includes(search.toLowerCase()) ||
          item.name.toLowerCase().includes(search.toLowerCase())
        );
      });
    }
    //
    if (range > 0) {
      updated = updated.filter((item) => {
        return parseFloat(item.price) <= parseFloat(range);
      });
    }
    //
    if (colors.length !== 0) {
      updated = updated.filter((item) => {
        return colors.includes(item.color.toLowerCase());
      });
    }
    //
    if (categories.length !== 0) {
      updated = updated.filter((item) => {
        return categories.includes(item.category.toLowerCase());
      });
    }
    //
    if (fabrics.length !== 0) {
      updated = updated.filter((item) => {
        return fabrics.includes(item.fabric.toLowerCase());
      });
    }
    //
    setNewProducts(updated);
  };
  useEffect(() => {
    applyFilter();
  }, [search, range, colors, categories, fabrics]);
  //
  //
  // clear filters
  const clear = () => {
    setSearch("");
    setRange(0);
    setcolors([]);
    setCategories([]);
    //
    let colors_element = document.querySelectorAll(".colors_element input");
    colors_element.forEach((item) => {
      item.checked = false;
    });
    //
    let category_element = document.querySelectorAll(".category_element input");
    category_element.forEach((item) => {
      item.checked = false;
    });
  };
  //
  const rotateArrow = (e) => {
    if (e.target.dataset.arrow === e.target.childNodes[1].dataset.arrow) {
      e.target.childNodes[1].classList.toggle("rotate_arrow");
    }
  };
  return (
    <>
      <div className="container-fluid p-2 gradient-bg">
        <div className="d-flex align-items-sm-center align-items-stretch justify-content-between flex-sm-row flex-column gap-2">
          <p>Search & Filter</p>
          <div className="d-flex align-items-center justify-content-between gap-2">
            <input
              type="text"
              className="input"
              placeholder="Search..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              style={{ border: "none" }}
            />
            <button className="button" onClick={toggleSearchFilter}>
              <FaFilter className="SVGdisable" />
            </button>
          </div>
        </div>
      </div>
      <div
        className="searchfilter gradient-bg border-start p-2"
        ref={searchfilter}
      >
        <div className="d-flex align-items-center justify-content-between">
          <button className="button" onClick={clear}>
            Clear
          </button>
          <button className="button" onClick={toggleSearchFilter}>
            <FaTimes className="SVGdisable" />
          </button>
        </div>
        {/*  */}
        <p className="mt-4">
          Showing {newProducts.length}{" "}
          {newProducts.length <= 1 ? "product" : "products"}
        </p>
        {/*  */}
        <div className="mt-4">
          <div>
            <div className="d-flex align-items-center justify-content-between gap-2">
              <input
                type="range"
                min="0"
                max="5000"
                className="form-range"
                id="price-range"
                value={range}
                onChange={(e) => setRange(e.target.value)}
              />
              <div style={{ cursor: "pointer" }} onClick={() => setRange(0)}>
                <FaTimes />
              </div>
            </div>
            <div className="d-flex align-items-center justify-content-between">
              <p>
                Rs.<strong>0</strong>
              </p>
              {range === 0 ? (
                <p>
                  Rs.<strong>5000</strong>
                </p>
              ) : (
                <p>
                  Rs.<strong>{range}</strong>
                </p>
              )}
            </div>
          </div>
        </div>
        {/*  */}
        <div className="mt-4 colors_element">
          <div
            className="d-flex align-items-center justify-content-between"
            data-bs-toggle="collapse"
            href="#color_collapse"
            role="button"
            aria-expanded="false"
            aria-controls="color_collapse"
            data-arrow="color_collapse"
            onClick={(e) => rotateArrow(e)}
          >
            <p className="fw-bold no-pointer">Color</p>
            <div className="arrow no-pointer" data-arrow="color_collapse">
              <IoIosArrowDown />
            </div>
          </div>
          <div className="collapse" id="color_collapse">
            {color.map((item, index) => {
              return (
                <div
                  className="d-flex align-items-center justify-content-between"
                  key={index}
                >
                  <label className="text-capitalize">
                    {item}
                    <input
                      type="checkbox"
                      name={item.replace(/\s/g, "")}
                      onClick={(e) => addcolor(e, item)}
                    />
                  </label>
                </div>
              );
            })}
          </div>
        </div>
        {/*  */}
        <div className="mt-4 category_element">
          <div
            className="d-flex align-items-center justify-content-between"
            data-bs-toggle="collapse"
            href="#category_collapse"
            role="button"
            aria-expanded="false"
            aria-controls="category_collapse"
            data-arrow="category_collapse"
            onClick={(e) => rotateArrow(e)}
          >
            <p className="fw-bold no-pointer">Category</p>
            <div className="arrow no-pointer" data-arrow="category_collapse">
              <IoIosArrowDown />
            </div>
          </div>
          <div className="collapse" id="category_collapse">
            {category.map((item, index) => {
              return (
                <div
                  className="d-flex align-items-center justify-content-between"
                  key={index}
                >
                  <label className="text-capitalize">
                    {item}
                    <input
                      type="checkbox"
                      name={item.replace(/\s/g, "")}
                      onClick={(e) => addCategory(e, item)}
                    />
                  </label>
                </div>
              );
            })}
          </div>
        </div>
        {/*  */}
        <div className="mt-4 fabric_element">
          <div
            className="d-flex align-items-center justify-content-between"
            data-bs-toggle="collapse"
            href="#fabric_collapse"
            role="button"
            aria-expanded="false"
            aria-controls="fabric_collapse"
            data-arrow="fabric_collapse"
            onClick={(e) => rotateArrow(e)}
          >
            <p className="fw-bold no-pointer">fabric</p>
            <div className="arrow no-pointer" data-arrow="fabric_collapse">
              <IoIosArrowDown />
            </div>
          </div>
          <div className="collapse" id="fabric_collapse">
            {fabric.map((item, index) => {
              return (
                <div
                  className="d-flex align-items-center justify-content-between"
                  key={index}
                >
                  <label className="text-capitalize">
                    {item}
                    <input
                      type="checkbox"
                      name={item.replace(/\s/g, "")}
                      onClick={(e) => addFabric(e, item)}
                    />
                  </label>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </>
  );
};

export default SearchFilter;
