import config from "../config";

import { HeaderOnly } from "../../Layout/HeaderOnly";
//Layouts HeaderOnly
import Cart from "../../components/Cart";
import NotFound from "../../components/NotFound";
import AdminPage from "../../components/AdminPage";

//Layouts
import Home from "../../components/Home";
import Category from "../../components/Category/Category";
import ProductPage from "../../components/Product";
import LoginPage from "../../components/Login/Login";

//Public routes
const publicRoutes = [
  { path: "/", component: Home },
  { path: "/products/category/:path", component: Category },
  { path: "/login", component: LoginPage, layout: HeaderOnly },
  {
    path: "/products/:path",
    component: ProductPage,
    layout: HeaderOnly,
  },
  // { path: "/cart", component: Cart, layout: HeaderOnly },
  { path: "*", component: NotFound, layout: HeaderOnly },
];

const privateRoutes = [
  { path: "/cart", component: Cart, layout: HeaderOnly },
  { path: "/admin", component: AdminPage, layout: HeaderOnly },
];

export { publicRoutes, privateRoutes };
