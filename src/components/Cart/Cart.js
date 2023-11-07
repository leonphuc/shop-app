import { Button } from "@mui/material";
import Container from "react-bootstrap/Container";
import { useSelector } from "react-redux";
import { Link, Navigate } from "react-router-dom";
import "./Cart.scss";
import { useDispatch } from "react-redux";
import {
  removeFromCart,
  decreaseCart,
  addToCart,
  clearCart,
  getTotal,
} from "../../feature/cartSlice";
import { useEffect, useState } from "react";
import config from "../../router/config";
import { useGetCartByUserIdQuery } from "../../feature/CartFeature/CartFeature";
import { jwtDecode } from "jwt-decode";
import { useGetAllProductsQuery } from "../../feature/productsApi";

function Cart() {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user);
  const cart = useSelector((state) => state.cart);

  const [userData, setUserData] = useState();

  const getCartByUserId = useGetCartByUserIdQuery(userData?.sub);
  const getAllProducts = useGetAllProductsQuery();

  const [cartItemsData, setCartItemsData] = useState([]);

  const [getUserCart, setGetUserCart] = useState([]);

  // function cartList(getCartByUserId, getAllProducts) {
  //   let arr = [];
  //   getCartByUserId.data?.forEach((i) => {
  //     let products = i.products;
  //     products.forEach((j) => {
  //       let typeId = j.productId;
  //       let listCartById = getAllProducts?.data.filter(
  //         (item) => item.id === typeId
  //       );
  //       arr.push({
  //         userId: i.userId,
  //         data: listCartById,
  //       });
  //     });
  //   });
  //   return arr;
  // }

  useEffect(() => {
    let token = user.user?.token;
    try {
      if (user) {
        const decoded = jwtDecode(token);
        setUserData(decoded);
      } else {
        token = null;
      }
    } catch (error) {
      // console.log(error);
    }

    // const cartListAll = cartList(getCartByUserId, getAllProducts);
    // setCartItemsData(cartListAll);
  }, [user]);

  useEffect(() => {
    dispatch(getTotal());
    // idQuantity();
  }, [cart]);

  const handleRemoveFromCart = (cartItem) => {
    dispatch(removeFromCart(cartItem));
  };

  const handleDecreaseCart = (cartItem) => {
    dispatch(decreaseCart(cartItem));
  };

  const handleIncreaseCart = (cartItem) => {
    dispatch(addToCart(cartItem));
  };

  const handleClearCart = () => {
    dispatch(clearCart());
  };

  // const idQuantity = () => {
  //   const result = cartItemsData?.reduce((accumulator, currentValue) => {
  //     const existingItem = accumulator.find(
  //       (item) => item.data[0].id === currentValue.data[0].id
  //     );
  //     if (existingItem) {
  //       existingItem.quantity += 1;
  //     } else {
  //       accumulator.push({ ...currentValue, quantity: 1 });
  //     }
  //     return accumulator;
  //   }, []);

  //   setGetUserCart(result);
  // };

  // console.log("getUserCart", getUserCart);
  // console.log("cartItemsData", cartItemsData);

  return (
    <>
      {/* <Container>
        <div>
          <h1 className="cart-header">Shopping Cart</h1>
        </div>
        <div>
          {getUserCart?.length === 0 ? (
            <div className="cart-empty">
              <p>Your cart is currently empty</p>
              <Link to={config.routes.home} className="continue">
                <p>
                  <i className="fa-solid fa-arrow-left-long"></i> &nbsp;Continue
                  Shopping
                </p>
              </Link>
            </div>
          ) : (
            <>
              <div className="titles">
                <h3 className="product-title">Product</h3>
                <h3 className="product-price">Price</h3>
                <h3 className="product-quantity">Quantity</h3>
                <h3 className="product-total">Total</h3>
              </div>
              <div className="cart-items">
                {getUserCart?.map((cartItem) => (
                  <div className="cart-item" key={cartItem.data[0].id}>
                    <div className="cart-product">
                      <Link
                        to={config.routes.products + `${cartItem.data[0].id}`}
                      >
                        <img
                          src={cartItem.data[0].image}
                          alt={cartItem.data[0].title}
                        />
                      </Link>

                      <div className="cart-product-info">
                        <h3>{cartItem.data[0].title}</h3>
                        <Button
                          className="cart-btn-remove"
                          onClick={() => handleRemoveFromCart(cartItem.data[0])}
                        >
                          Remove
                        </Button>
                      </div>
                    </div>
                    <div className="cart-product-price">
                      ${cartItem.data[0].price}
                    </div>
                    <div className="cart-product-quantity">
                      <button
                        className="cart-btn-count"
                        onClick={() => handleDecreaseCart(cartItem)}
                      >
                        -
                      </button>
                      <div className="cart-product-quantity-count">
                        {cartItem.quantity}
                      </div>
                      <button
                        className="cart-btn-count"
                        onClick={() => handleIncreaseCart(cartItem)}
                      >
                        +
                      </button>
                    </div>
                    <div className="cart-product-total-price">
                      ${(cartItem.data[0].price * cartItem.quantity).toFixed(2)}
                    </div>
                  </div>
                ))}
              </div>
              <div className="cart-summary">
                <Button
                  className="clear-cart-btn"
                  variant="outlined"
                  color="error"
                  onClick={() => handleClearCart()}
                >
                  Clear Cart
                </Button>
                <div className="cart-checkout">
                  <div className="subtotal">
                    <span>Subtotal &nbsp;</span>
                    <span className="amount">${cart.cartTotalAmount}</span>
                  </div>
                  <p>Taxes and shopping calculated at checkout</p>
                  <Button className="check-out" variant="contained">
                    Check Out
                  </Button>
                  <Link to={config.routes.home} className="continue">
                    <p>
                      <i className="fa-solid fa-arrow-left-long"></i>{" "}
                      &nbsp;Continue Shopping
                    </p>
                  </Link>
                </div>
              </div>
            </>
          )}
        </div>
      </Container> */}

      <Container>
        <div>
          <h1 className="cart-header">Shopping Cart</h1>
        </div>
        <div>
          {cart.cartItems.length === 0 ? (
            <div className="cart-empty">
              <p>Your cart is currently empty</p>
              <Link to={config.routes.home} className="continue">
                <p>
                  <i className="fa-solid fa-arrow-left-long"></i> &nbsp;Continue
                  Shopping
                </p>
              </Link>
            </div>
          ) : (
            <>
              <div className="titles">
                <h3 className="product-title">Product</h3>
                <h3 className="product-price">Price</h3>
                <h3 className="product-quantity">Quantity</h3>
                <h3 className="product-total">Total</h3>
              </div>
              <div className="cart-items">
                {cart.cartItems?.map((cartItem) => (
                  <div className="cart-item" key={cartItem.id}>
                    <div className="cart-product">
                      <Link to={config.routes.products + `${cartItem.id}`}>
                        <img src={cartItem.image} alt={cartItem.title} />
                      </Link>

                      <div className="cart-product-info">
                        <h3>{cartItem.title}</h3>
                        <Button
                          className="cart-btn-remove"
                          onClick={() => handleRemoveFromCart(cartItem)}
                        >
                          Remove
                        </Button>
                      </div>
                    </div>
                    <div className="cart-product-price">${cartItem.price}</div>
                    <div className="cart-product-quantity">
                      <button
                        className="cart-btn-count"
                        onClick={() => handleDecreaseCart(cartItem)}
                      >
                        -
                      </button>
                      <div className="cart-product-quantity-count">
                        {cartItem.cartQuantity}
                      </div>
                      <button
                        className="cart-btn-count"
                        onClick={() => handleIncreaseCart(cartItem)}
                      >
                        +
                      </button>
                    </div>
                    <div className="cart-product-total-price">
                      ${(cartItem.price * cartItem.cartQuantity).toFixed(2)}
                    </div>
                  </div>
                ))}
              </div>
              <div className="cart-summary">
                <Button
                  className="clear-cart-btn"
                  variant="outlined"
                  color="error"
                  onClick={() => handleClearCart()}
                >
                  Clear Cart
                </Button>
                <div className="cart-checkout">
                  <div className="subtotal">
                    <span>Subtotal &nbsp;</span>
                    <span className="amount">${cart.cartTotalAmount}</span>
                  </div>
                  <p>Taxes and shopping calculated at checkout</p>
                  <Button className="check-out" variant="contained">
                    Check Out
                  </Button>
                  <Link to={config.routes.home} className="continue">
                    <p>
                      <i className="fa-solid fa-arrow-left-long"></i>{" "}
                      &nbsp;Continue Shopping
                    </p>
                  </Link>
                </div>
              </div>
            </>
          )}
        </div>
      </Container>
    </>
  );
}

export default Cart;
