import React, { useEffect } from "react";
import { getData } from "../context/DataContext";
import FilterSection from "../components/FilterSection";
import Loading from "../assets/animation/Loading1.webm";
import ProductCard from "../components/ProductCard";
import Pagination from "../components/Pagination";
import Lottie from "lottie-react";
import notfound from "../assets/animation/No-Data.json";
import MobileFilter from "../components/MobileFilter";

const Product = () => {
  const { data, fetchAllProducts } = getData();
  const [search, setSearch] = React.useState("");
  const [category, setCategory] = React.useState("All");
  const [brand, setBrand] = React.useState("All");
  const [priceRange, setPriceRange] = React.useState([0, 5000]);
  const [page, setPage] = React.useState(1);
  const [openFilter, setOpenFilter] = React.useState(false);

  useEffect(() => {
    fetchAllProducts();
    window.scrollTo(0, 0); // Scroll to top on component mount
  }, []);

  const handleCategoryChange = (e) => {
    setCategory(e.target.value);
    setPage(1); // Reset page to 1 when category changes
    setOpenFilter(false); // Close filter on category change
  };

  const handleBrandChange = (e) => {
    setBrand(e.target.value);
    setPage(1); // Reset page to 1 when category changes
    setOpenFilter(false); // Close filter on brand change
  };

  const pageHandler = (selectedPage) => {
    setPage(selectedPage);
    window.scrollTo(0, 0); // Scroll to top on page change
  };

  const filteredData = data?.filter(
    (item) =>
      item.title.toLowerCase().includes(search.toLowerCase()) &&
      (category === "All" || item.category === category) &&
      (brand === "All" || item.brand === brand) &&
      item.price >= priceRange[0] &&
      item.price <= priceRange[1]
  );

  const dynamicPage = Math.ceil(filteredData?.length / 8);

  return (
    <div>
      <div className="max-w-6xl mx-auto px-4 mb-10">
        <MobileFilter
          openFilter={openFilter}
          setOpenFilter={setOpenFilter}
          search={search}
          setSearch={setSearch}
          brand={brand}
          setBrand={setBrand}
          priceRange={priceRange}
          setPriceRange={setPriceRange}
          category={category}
          setCategory={setCategory}
          handleCategoryChange={handleCategoryChange}
          handleBrandChange={handleBrandChange}
        />
        {data?.length > 0 ? (
          <>
            <div className="flex gap-8">
              <FilterSection
                search={search}
                setSearch={setSearch}
                brand={brand}
                setBrand={setBrand}
                priceRange={priceRange}
                setPriceRange={setPriceRange}
                category={category}
                setCategory={setCategory}
                handleCategoryChange={handleCategoryChange}
                handleBrandChange={handleBrandChange}
              />

              {filteredData?.length > 0 ? (
                <div className="flex flex-col justify-center items-center">
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-2 md:gap-7 mt-10 ">
                    {filteredData
                      ?.slice(page * 8 - 8, page * 8)
                      .map((product, index) => {
                        return <ProductCard key={index} product={product} />;
                      })}
                  </div>
                  <Pagination
                    pageHandler={pageHandler}
                    page={page}
                    dynamicPage={dynamicPage}
                  />
                </div>
              ) : (
                <div className="flex items-center justify-center md:h-[10px] md:w-[700px] mt-100 ml-40">
                  <Lottie animationData={notfound} classID="w-[5px]" />
                </div>
              )}
            </div>
          </>
        ) : (
          <div className="flex items-center justify-center h-[400px]">
            <video muted autoPlay loop>
              <source src={Loading} type="video/webm" />
            </video>
          </div>
        )}
      </div>
    </div>
  );
};

export default Product;
