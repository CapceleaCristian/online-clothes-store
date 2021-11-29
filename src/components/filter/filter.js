import "./filter.css";

export function Filter({
  onFilterApply,
  isFilterOpened,
  productColors,
  productsCategories,
  setIsFilterOpened,
  selectedColors,
  selectedCategories,
  onCategory,
  onColor,
  onPriceChange,
}) {
  return (
    <div
      className={`filter ${!isFilterOpened ? `filter-open` : `filter-closed`}`}
    >
      <div className="filter-wrapper">
        <button
          onClick={() => setIsFilterOpened((prev) => !prev)}
          className={`filter-button filter-button-${
            isFilterOpened ? "open" : "close"
          }`}
        >
          <span>
            {!isFilterOpened ? "Open Filter" : "Close Filter"} (
            {selectedColors.length + selectedCategories.length})
          </span>
        </button>
        <div className="filter-apply">
          <button onClick={onFilterApply}>Apply</button>
        </div>
        <div className="colors">
          <div className="colors-title">Colors:</div>
          <div className="colors-map">
            {productColors.map((color) => {
              const isColorSelected = selectedColors.find((el) => el === color);
              return (
                <div
                  onClick={() => onColor(color)}
                  className={`color ${isColorSelected ? "color-selected" : ""}`}
                  key={color}
                >
                  <div
                    className="color-hex"
                    style={{ backgroundColor: color }}
                  ></div>
                  {color}
                </div>
              );
            })}
          </div>
        </div>
        <div className="categories">
          <div className="categories-title">Categories:</div>
          <div className="categories-map">
            {productsCategories.map((category) => {
              const isCategorySelected = selectedCategories.find(
                (el) => el === category
              );
              return (
                <div
                  key={category}
                  className={`category ${
                    isCategorySelected ? "category-selected" : ""
                  }`}
                  onClick={() => onCategory(category)}
                >
                  {category}
                </div>
              );
            })}
          </div>
        </div>
        <div className="price">
          <div className="price-title">Price:</div>
          <div className="price-inputs">
            <div>
              <input
                onChange={(e) =>
                  onPriceChange({ priceStart: Number(e.target.value) })
                }
                type="number"
              />
            </div>
            <div>
              <input
                onChange={(e) =>
                  onPriceChange({ priceEnd: Number(e.target.value) })
                }
                type="number"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
