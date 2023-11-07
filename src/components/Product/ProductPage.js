import { Link, useParams, useNavigate } from "react-router-dom";
import { useGetProductByIdQuery } from "../../feature/productsApi";
import "./ProductPage.scss";
import { useState, useEffect } from "react";

import Rating from "@mui/material/Rating";
import Box from "@mui/material/Box";

import Button from "@mui/material/Button";

import { useDispatch, useSelector } from "react-redux";
import { addToCart } from "../../feature/cartSlice";
import { getTotal } from "../../feature/cartSlice";
import config from "../../router/config";
import NotFound from "../NotFound";

function ProductPage() {
  const getUserIsLogin = localStorage.getItem("user");

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { path } = useParams();

  const { data, isFetching } = useGetProductByIdQuery(path);
  const cart = useSelector((state) => state.cart);

  const [discount, setDiscount] = useState(0.15);

  useEffect(() => {
    dispatch(getTotal());
  }, [cart]);

  const handleAddToCart = (item) => {
    dispatch(addToCart(item));
  };
  return (
    <>
      {isFetching ? (
        <div className="loading-fetch">
          <p>...Loading</p>
        </div>
      ) : (
        <>
          {path == data?.id && !isFetching ? (
            <>
              <div className="product-page-header">
                <p>
                  <Link to={config.home}> Home </Link>
                  &nbsp;
                  <i className="fa-solid fa-angle-right"></i>
                  <Link to={config.routes.category + `${data.category}`}>
                    {data.category}
                  </Link>
                  &nbsp;
                  <i className="fa-solid fa-angle-right"></i>
                  &nbsp;
                  {data.title}
                </p>
              </div>
              <div className="product-page">
                <div className="product-page-item">
                  <div className="product-page-img">
                    <img src={data.image} alt={data.title} />
                  </div>
                  <div className="product-page-info">
                    <div className="product-page-info-header">
                      <h2 className="product-page-info-title">{data.title}</h2>
                      <div className="product-page-info-rating">
                        <Box
                          sx={{
                            width: "fit-content",
                            display: "flex",
                            alignItems: "center",
                            flexWrap: "wrap",
                          }}
                        >
                          <Box
                            sx={{
                              ml: 1,
                              mr: 1,
                              color: "red",
                              fontSize: 16,
                            }}
                          >
                            {data.rating.rate}
                          </Box>
                          <Rating
                            name="half-rating-read"
                            defaultValue={data.rating.rate}
                            precision={0.5}
                            readOnly
                            size="large"
                          />

                          <Box sx={{ ml: 2, width: 200, fontSize: 16 }}>
                            | Rating Count: {data.rating.count}
                          </Box>
                        </Box>
                      </div>
                    </div>
                    <div className="product-page-info-contain">
                      <h1 className="product-page-info-price">
                        $ {(data.price * discount + data.price).toFixed(2)}
                      </h1>
                      <h1 className="product-page-info-price-discount-price">
                        ${data.price}
                      </h1>
                      <div className="product-page-info-price-discount">
                        <h3>Discount : {discount * 100}%</h3>
                      </div>
                    </div>
                    <div className="product-page-info-description">
                      <h3>
                        <strong>Description:</strong> &nbsp; {data.description}
                      </h3>
                    </div>
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
                        onClick={() => handleAddToCart(data)}
                      >
                        Add to card
                      </Button>
                    )}
                  </div>
                </div>
              </div>
            </>
          ) : (
            <NotFound />
          )}
        </>
      )}
    </>
  );
}

export default ProductPage;
