import { createContext, useContext, useEffect, useState } from "react";
import axios from "axios";

export const DataContext = createContext(null);

export const DataProvider = ({ children }) => {
  const [data, setData] = useState();

  //   fetching all product from API
  const fetchAllProducts = async () => {
    try {
      const response = await axios.get(
        "https://fakestoreapi.in/api/products?limit=150"
      );
      console.log(response);
      const productsData = response.data.products;
      setData(productsData);
    } catch (error) {
      console.error("Error fetching products:", error);
    }
  };

  const getUniqueCategories = (data, property) => {
    let newVAl = data?.map((curElem) => {
      return curElem[property];
    });
    newVAl = ["All", ...new Set(newVAl)];
    return newVAl;
  };

  const categoryOnlyData = getUniqueCategories(data, "category");
  const brandOnlyData = getUniqueCategories(data, "brand");
  return (
    <DataContext.Provider
      value={{
        data,
        setData,
        fetchAllProducts,
        categoryOnlyData,
        brandOnlyData,
      }}
    >
      {children}
    </DataContext.Provider>
  );
};

export const getData = () => useContext(DataContext);
