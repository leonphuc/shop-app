import { useGetProductByCategoriesQuery } from "../../feature/productsApi";
import "./Category.scss";
import * as React from "react";

import { useParams } from "react-router-dom";
import NotFound from "../NotFound";
import ProductsItems from "../Home/ProductsItems";

function Category() {
  const { path } = useParams();

  const { data, isFetching, isLoading } = useGetProductByCategoriesQuery(path);

  // console.log("path", data[0].category);

  return (
    <>
      {isFetching && isLoading ? (
        <div className="loading-fetch">...Loading</div>
      ) : (
        <>
          {!isFetching && path !== data[0]?.category ? (
            <>
              <NotFound />
            </>
          ) : (
            <>
              {!isFetching && path === data[0]?.category && (
                <>
                  <div className="header">
                    <h1>{data[0]?.category}</h1>
                  </div>
                  <>
                    <ProductsItems
                      data={data}
                      isFetching={isFetching}
                      isLoading={isLoading}
                    />
                  </>
                </>
              )}
            </>
          )}
        </>
      )}
    </>
  );
}

export default Category;
