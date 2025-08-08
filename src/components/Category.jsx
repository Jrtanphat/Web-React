import React, { useEffect } from "react";
import { getData } from "../context/DataContext";
import { useNavigate } from "react-router-dom";

const Category = () => {
  // const { categoryOnlyData } = getData(); 
  const navigte = useNavigate();
  const {data} = getData()

   const getUniqueCategories = (data, property) => {
    let newVAl = data?.map((curElem) => {
      return curElem[property];
    });
    newVAl = [...new Set(newVAl)];
    return newVAl;
  };

  const categoryOnlyData = getUniqueCategories(data, "category");

  // console.log(categoryOnlyData);

  // useEffect(() => {
  //   fetchAllProducts();
  // }, []);

  return (
    <div className="bg-[#101829]">
      <div className="max-w-7xl mx-auto flex gap-4 items-center justify-around py-7 px-4">
        {categoryOnlyData.map((item, index) => {
          return (
            <div key={index}>
              <button
                onClick={() => navigte(`/category/${item}`)}
                className="uppercase bg-gradient-to-r from-red-500 to-purple-500
               text-white px-3 py-1 rounded-md cursor-pointer"
              >
                {item}
              </button>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Category;
