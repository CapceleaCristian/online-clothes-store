import { useEffect, useState } from "react";
import { Pagination, Filter, Products } from "./components";
import { getProductCategories, getProductColors, getProducts } from "./api";
import "./App.css";

function App() {
  const [productsData, setProducts] = useState({});
  const [categories, setCategories] = useState([]);
  const [colors, setColors] = useState([]);
  const [priceRange, setPriceRange] = useState({
    priceStart: null,
    priceEnd: null,
  });

  const [isFilterOpened, setIsFilterOpened] = useState(false);

  const [selectedCategories, setSelectedCategories] = useState([]);
  const [selectedColors, setSelectedColors] = useState([]);

  useEffect(() => {
    if (isFilterOpened) {
      document.body.classList.add("no-scroll");
    } else document.body.classList.remove("no-scroll");
  }, [isFilterOpened]);

  useEffect(() => {
    getProductCategories().then((data) => setCategories(data));
    getProductColors().then((data) => setColors(data));
  }, []);

  useEffect(() => {
    getProducts().then((data) => setProducts(data));
  }, []);

  return (
    <div className="App">
      <Filter
        onPriceChange={(value) =>
          setPriceRange((prev) => ({ ...prev, ...value }))
        }
        onFilterApply={() => {
          getProducts({
            currentPage: 1,
            colors: selectedColors,
            categories: selectedCategories,
            ...priceRange,
          }).then((data) => setProducts(data));
          setIsFilterOpened(false);
        }}
        isFilterOpened={isFilterOpened}
        productColors={colors}
        productsCategories={categories}
        setIsFilterOpened={setIsFilterOpened}
        selectedColors={selectedColors}
        selectedCategories={selectedCategories}
        onColor={(color) =>
          setSelectedColors((prev) =>
            prev.find((el) => el === color)
              ? prev.filter((ctg) => ctg !== color)
              : [...prev, color]
          )
        }
        onCategory={(category) =>
          setSelectedCategories((prev) =>
            prev.find((el) => el === category)
              ? prev.filter((ctg) => ctg !== category)
              : [...prev, category]
          )
        }
      />
      <Products isFilterOpened={isFilterOpened} productsData={productsData} />
      <Pagination
        onChange={(page) => {
          getProducts({
            currentPage: page,
            categories: selectedCategories,
            colors: selectedColors,
            priceStart: priceRange?.priceStart,
            priceEnd: priceRange?.priceEnd,
          }).then((data) => setProducts(data));
        }}
        currentPage={productsData.currentPage}
        totalPages={productsData.totalPages}
      />
    </div>
  );
}

export default App;
