import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import { useSelector } from "react-redux";
import "./Header.scss";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { useGetAllProductsQuery } from "../../feature/productsApi";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import config from "../../router/config";

import { useEffect, useState, useCallback } from "react";
import { jwtDecode } from "jwt-decode";

import { logoutUser } from "../../feature/UserSlice";
import { useDispatch } from "react-redux";

import { useDebounce } from "use-debounce";
import _, { debounce } from "lodash";

function Header() {
  const { data, isFetching } = useGetAllProductsQuery();
  const getUserIsLogin = localStorage.getItem("user");

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user);

  const { cartTotalQuantity } = useSelector((state) => state.cart);

  const [limitSearchResult, setLimitSearchResult] = useState(5);
  const [searchValue, setSearchValue] = useState("");
  const [userData, setUserData] = useState();

  const [searchResult, setSearchResult] = useState([]);
  const [searchResultDebounced] = useDebounce(searchResult, 500);

  const isLoggedIn = Boolean(localStorage.getItem("user"));

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
  }, [user]);

  const handleSearch = (e) => {
    const term = e.target.value.toLowerCase();
    if (!term.startsWith(" ") && data?.length > 0) {
      setSearchValue(term);
      const value = data?.filter((item) =>
        term.toLowerCase() === "" ? "" : item.title.toLowerCase().includes(term)
      );
      setSearchResult(value);
    }
  };

  const handleNavigateToProduct = () => {
    setSearchValue("");
    setSearchResult([]);
  };

  const handleLogoutUser = () => {
    dispatch(logoutUser());
    setUserData("");
    navigate("/");
  };

  return (
    <>
      <Navbar
        expand="lg"
        className="bg-body-tertiary"
        bg="dark"
        data-bs-theme="dark"
      >
        <Container>
          <Navbar.Brand>
            <NavLink to={config.routes.home} className="nav-link">
              Shopee
            </NavLink>
          </Navbar.Brand>

          <Navbar.Toggle aria-controls="basic-navbar-nav" />

          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="me-auto">
              <NavLink to={config.routes.home} className="nav-link">
                Home
              </NavLink>
              <NavLink to={config.routes.cart} className="nav-link">
                Cart
              </NavLink>
              {getUserIsLogin ? (
                <NavLink to={config.routes.admin} className="nav-link">
                  Admin
                </NavLink>
              ) : null}
            </Nav>

            <Form className="search d-flex me-5">
              <Form.Control
                type="search"
                placeholder="Search products..."
                className="me-2 fs-5"
                aria-label="Search"
                onChange={(e) => handleSearch(e)}
                value={searchValue}
              />
              <Button variant="primary" className="fs-5">
                Search
              </Button>
              {searchResultDebounced.length < 0 ? null : (
                <div className="search-result">
                  {searchResultDebounced
                    .slice(
                      0,
                      limitSearchResult
                        ? limitSearchResult
                        : searchResult.length
                    )
                    .map((item) => (
                      <div key={item.id}>
                        <Link
                          to={config.routes.products + `${item.id}`}
                          onClick={handleNavigateToProduct}
                        >
                          <div className="search-result-item">
                            <img
                              src={item.image}
                              alt={item.title}
                              className="search-result-img"
                            />
                            <div className="search-result-info">
                              <p className="search-result-info-title">
                                {item.title}
                              </p>
                              <p className="search-result-info-price">
                                ${item.price}
                              </p>
                            </div>
                          </div>
                        </Link>
                      </div>
                    ))}
                </div>
              )}
            </Form>
            {!isLoggedIn ? (
              <NavLink to={config.routes.cart} className="nav-link">
                <div className="cart-icon">
                  {/* {cartTotalQuantity === 0 ? null : (
                    <p className="cart-quantity">{cartTotalQuantity}</p>
                  )} */}
                  <i className="fa-solid fa-cart-shopping"></i>
                </div>
              </NavLink>
            ) : (
              <NavLink to={config.routes.cart} className="nav-link">
                <div className="cart-icon">
                  {cartTotalQuantity === 0 ? null : (
                    <p className="cart-quantity">{cartTotalQuantity}</p>
                  )}
                  <i className="fa-solid fa-cart-shopping"></i>
                </div>
              </NavLink>
            )}

            {!userData ? (
              <Link to={config.routes.login} className="header-login">
                Login
              </Link>
            ) : (
              <div className="header-user">
                <p>{userData?.user}</p>

                <Button onClick={handleLogoutUser}>Logout</Button>
              </div>
            )}
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </>
  );
}

export default Header;
