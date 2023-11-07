import "../Home.scss";
import "./ProductsItems.scss";
import * as React from "react";
import Button from "@mui/material/Button";
import { useDispatch } from "react-redux";
import { getTotal } from "../../../feature/cartSlice";
import { addToCart } from "../../../feature/cartSlice";

import { useSelector } from "react-redux";
import { useEffect, useState } from "react";

import { Link, useNavigate, useParams } from "react-router-dom";
import Rating from "@mui/material/Rating";
import Box from "@mui/material/Box";
import config from "../../../router/config";

import Select from "react-select";

const optionsSort = [
  { value: "all", label: "All Products" },
  { value: "lowToHigh", label: "Price: Low to High" },
  { value: "highToLow", label: "Price: High to Low" },
  { value: "rateLowToHigh", label: "Rating: Low to High" },
  { value: "rateHighToLow", label: "Rating: High to Low" },
  { value: "a-z", label: "A - Z" },
  { value: "z-a", label: "Z - A" },
];

function ProductsItems(props) {
  const { path } = useParams();
  const getUserIsLogin = localStorage.getItem("user");
  const { data, isFetching, isLoading } = props;

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const cart = useSelector((state) => state.cart);

  const [selectedOption, setSelectedOption] = useState(optionsSort[0]);
  const [newData, setNewData] = useState([]);

  function dataSort() {
    if (!isFetching) {
      let newData = [...data];

      if (selectedOption.value === "all") {
        setNewData([...data]);
      }
      //////////Price
      if (selectedOption.value === "lowToHigh") {
        let newDataSort = [...newData];
        newDataSort.sort((a, b) => a.price - b.price);
        setNewData(newDataSort);
      }

      if (selectedOption.value === "highToLow") {
        let newDataSort = [...newData];
        newDataSort.sort((a, b) => b.price - a.price);
        setNewData(newDataSort);
      }
      /////////////Alpha
      if (selectedOption.value === "a-z") {
        let newDataSort = [...newData];
        newDataSort.sort((a, b) => a.title.localeCompare(b.title));
        setNewData(newDataSort);
      }

      if (selectedOption.value === "z-a") {
        let newDataSort = [...newData];
        newDataSort.sort((a, b) => b.title.localeCompare(a.title));
        setNewData(newDataSort);
      }
      //////////////Rating
      if (selectedOption.value === "rateLowToHigh") {
        let newDataSort = [...newData];
        newDataSort.sort((a, b) => a.rating.rate - b.rating.rate);
        setNewData(newDataSort);
      }

      if (selectedOption.value === "rateHighToLow") {
        let newDataSort = [...newData];
        newDataSort.sort((a, b) => b.rating.rate - a.rating.rate);
        setNewData(newDataSort);
      }
    }
  }

  useEffect(() => {
    if (!isFetching) {
      setNewData([...data]);
      dataSort();
    }
  }, [selectedOption, path]);

  useEffect(() => {
    dispatch(getTotal());
  }, [cart]);

  const handleAddToCart = (item) => {
    dispatch(addToCart(item));
  };

  const handleNavigateToProduct = (item) => {
    navigate(`${config.routes.products + item.id}`);
  };

  return (
    <>
      {!isFetching && !isLoading && (
        <>
          <div className="sort-features">
            <label htmlFor="">Sort</label>
            <Select
              value={selectedOption}
              onChange={setSelectedOption}
              options={optionsSort}
              className="sort-features-select"
              theme={(theme) => ({
                ...theme,
                borderRadius: 0,
                colors: {
                  ...theme.colors,
                  neutral50: "grey",
                  primary: "black",
                },
              })}
            />
          </div>
          <div className="product">
            {!isFetching &&
              newData.map((item) => (
                <div className="product-item" key={item.id}>
                  <Link to={config.routes.products + `${item.id}`}>
                    <img loading="lazy" alt={item.title} src={item.image} />
                  </Link>
                  <div className="product-item-title">
                    <p> {item.title}</p>
                  </div>
                  <div className="product-item-price">
                    <p>
                      <strong>Price</strong>:&nbsp; ${item.price}
                    </p>
                  </div>
                  <div className="product-item-rating">
                    <Box
                      sx={{
                        width: 200,
                        display: "flex",
                        alignItems: "center",
                        flexWrap: "wrap",
                        justifyContent: "space-evenly",
                      }}
                    >
                      <Box sx={{ ml: 1, mr: 1, color: "red", fontSize: 20 }}>
                        {item.rating.rate}
                      </Box>
                      <Rating
                        name="half-rating-read"
                        defaultValue={item.rating.rate}
                        precision={0.5}
                        readOnly
                        size="large"
                      />
                    </Box>
                  </div>
                  <div className="product-item-btn">
                    <Button
                      className="product-btn-add-to-card"
                      variant="contained"
                      onClick={() => handleNavigateToProduct(item)}
                    >
                      Details
                    </Button>
                    {!getUserIsLogin ? (
                      <Button
                        className="product-btn-add-to-card"
                        variant="contained"
                        onClick={() => navigate(`${config.routes.login}`)}
                      >
                        Add to card
                      </Button>
                    ) : (
                      <Button
                        className="product-btn-add-to-card"
                        variant="contained"
                        onClick={() => handleAddToCart(item)}
                      >
                        Add to card
                      </Button>
                    )}
                  </div>
                </div>
              ))}
          </div>
        </>
      )}
    </>
  );
}

export default ProductsItems;
