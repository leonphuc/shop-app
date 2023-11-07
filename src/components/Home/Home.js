import * as React from "react";
import { useGetAllProductsQuery } from "../../feature/productsApi";
import "./Home.scss";

import ProductsItems from "./ProductsItems";

function Home() {
  const { data, isFetching, isLoading } = useGetAllProductsQuery();

  return (
    <>
      {isLoading ? (
        <div className="loading-fetch">...Loading</div>
      ) : (
        <>
          <div className="header">
            <h1>New Arrivals</h1>
          </div>
          {!isFetching && (
            <ProductsItems
              data={data}
              isFetching={isFetching}
              isLoading={isLoading}
            />
          )}
        </>
      )}
    </>
  );
}

export default Home;
