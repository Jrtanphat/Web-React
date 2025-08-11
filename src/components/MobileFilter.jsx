import React from "react";
import { FaFilter } from "react-icons/fa6";
import { getData } from "../context/DataContext";

const MobileFilter = ({
  openFilter,
  setOpenFilter,
  search,
  setSearch,
  brand,
  setBrand,
  priceRange,
  setPriceRange,
  category,
  setCategory,
  handleCategoryChange,
  handleBrandChange,
}) => {
  const { categoryOnlyData, brandOnlyData } = getData();

  const toggleFilter = () => {
    setOpenFilter(!openFilter);
  };
  return (
    <>
      <div className="bg-gray-100 flex justify-between items-center md:hidden px-4 p-2 mt-5">
        <h1 className="text-xl font-semibold">Filters</h1>
        <FaFilter onClick={() => toggleFilter()} className="text-gray-800" />
      </div>
      {openFilter ? (
        <div className="bg-gray-100 p-2 md:hidden">
          <input
            type="text"
            placeholder="Search.."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="bg-white p-2 rounded-md border-gray-400 border-2 w-full"
          />
          {/* Category only data */}
          <h1 className="mt-5 font-semibold text-xl">Category</h1>
          <div className="flex flex-col gap-2 mt-3">
            {categoryOnlyData?.map((item, index) => {
              return (
                <div key={index} className="flex gap-2">
                  <input
                    type="checkbox"
                    name={item}
                    checked={category === item}
                    value={item}
                    onChange={handleCategoryChange}
                  />
                  <button className="cursor-pointer uppercase">{item}</button>
                </div>
              );
            })}
          </div>
          {/* brand only data */}
          <h1 className="mt-5 font-semibold text-xl">Brand</h1>
          <select
            name=""
            id=""
            className="bg-white w-full p-2 border-gray-200 border-2 rounded-md"
            value={brand}
            onChange={handleBrandChange}
          >
            {brandOnlyData?.map((item, index) => {
              return (
                <option key={index} value={item}>
                  {item.toUpperCase()}
                </option>
              );
            })}
          </select>

          {/* Price Range */}
          <h1 className="mt-5 font-semibold text-xl">Price Range</h1>
          <div className="flex flex-col gap-2">
            <label htmlFor="">
              Price Range: ${priceRange[0]} - ${priceRange[1]}
            </label>
            <input
              type="range"
              min="0"
              max="5000"
              value={priceRange[1]}
              onChange={(e) =>
                setPriceRange([priceRange[0], Number(e.target.value)])
              }
              className="transition-all  w-[200px]"
            />
            <button
              className="bg-red-500 text-white rounded-md px-3 py-1 mt-5 cursor-pointer"
              onClick={() => {
                setPriceRange([0, 5000]);
                setSearch("");
                setCategory("All");
                setBrand("All");
                setOpenFilter(false); // Close filter on reset
              }}
            >
              Reset filter
            </button>
          </div>
        </div>
      ) : null}
    </>
  );
};

export default MobileFilter;
