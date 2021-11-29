import "./products.css";

export function Products({ isFilterOpened, productsData }) {
  return (
    <div className="main">
      {isFilterOpened ? <div className="main-filter-open"></div> : null}
      <div className="products">
        {productsData?.products?.length
          ? productsData?.products?.map((product) => {
              const productPrice =
                product.shopifyProductEu.variants.edges[0].node.price;
              return (
                <div className="product" key={product.name}>
                  <img
                    className="product-img"
                    src={product.thumbnailImage.file.url}
                    alt=""
                  />
                  <div className="product-details-categories">
                    {(product.categoryTags || ["No categories"]).map(
                      (category) => {
                        return (
                          <div
                            key={category}
                            className="product-details-categories-category"
                          >
                            {category}
                          </div>
                        );
                      }
                    )}
                  </div>
                  <div className="product-details-colors">
                    {(product.colorFamily || []).map((color, index) => {
                      return (
                        <div
                          key={index}
                          style={{ backgroundColor: color.name }}
                          className="product-details-colors-color"
                        ></div>
                      );
                    })}
                  </div>
                  <div className="product-details">
                    <div className="product-name">{product.name}</div>
                    <div className="product-price">${productPrice}</div>
                  </div>
                </div>
              );
            })
          : "No data"}
      </div>
    </div>
  );
}
