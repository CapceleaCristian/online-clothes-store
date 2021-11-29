import json from "../miista-export.json";
const data = json.data.allContentfulProductPage.edges;

export function getProducts(props) {
  const {
    currentPage = 1,
    pageSize = 10,
    colors = [],
    categories = [],
    priceStart = null,
    priceEnd = null,
  } = props || {};
  const filteredData = data.filter((product) => {
    const productPrice =
      product.node.shopifyProductEu.variants.edges[0].node.price;

    const matchColors = (product.node.colorFamily || []).find((el) =>
      colors.includes(el.name)
    );

    const matchCategories = (product.node.categoryTags || []).find((el) =>
      categories.includes(el)
    );

    if (
      colors.length &&
      categories.length &&
      priceStart !== null &&
      priceEnd !== null
    ) {
      return (
        matchColors &&
        matchCategories &&
        productPrice > priceStart &&
        productPrice < priceEnd
      );
    }

    if (colors.length && categories.length && priceStart !== null) {
      return matchColors && matchCategories && productPrice > priceStart;
    }

    if (colors.length && categories.length && priceEnd !== null) {
      return matchColors && matchCategories && productPrice < priceEnd;
    }

    if (categories.length && priceStart !== null && priceEnd !== null) {
      return (
        matchCategories && productPrice > priceStart && productPrice < priceEnd
      );
    }

    if (colors.length && priceStart !== null && priceEnd !== null) {
      return (
        matchColors && productPrice > priceStart && productPrice < priceEnd
      );
    }

    if (colors.length && categories.length) {
      return matchColors && matchCategories;
    }

    if (categories.length && priceStart !== null) {
      return matchCategories && productPrice > priceStart;
    }

    if (categories.length && priceEnd !== null) {
      return matchCategories && productPrice < priceEnd;
    }

    if (colors.length && priceEnd !== null) {
      return matchColors && productPrice < priceEnd;
    }

    if (priceStart !== null && priceEnd !== null) {
      return productPrice > priceStart && productPrice < priceEnd;
    }

    if (colors.length && priceStart !== null) {
      return matchColors && productPrice > priceStart;
    }

    if (colors.length) {
      return matchColors;
    }
    if (categories.length) {
      return matchCategories;
    }
    if (priceStart !== null) {
      return productPrice > priceStart;
    }
    if (priceEnd !== null) {
      return productPrice < priceEnd;
    }
    return true;
  });

  const endPage = currentPage * pageSize;
  const startPage = endPage - pageSize;

  return new Promise((resolve) => {
    resolve({
      currentPage,
      totalPages: Math.ceil(filteredData.length / pageSize),
      products: filteredData.slice(startPage, endPage).map((p) => p.node),
    });
  });
}

export function getProductCategories() {
  return new Promise((resolve) => {
    resolve([
      ...new Set(
        data.reduce((acc, current) => {
          return [
            ...acc,
            ...(current.node.categoryTags ? current.node.categoryTags : []),
          ];
        }, [])
      ),
    ]);
  });
}

export function getProductColors() {
  return new Promise((resolve) => {
    resolve([
      ...new Set(
        data
          .reduce((acc, current) => {
            return [
              ...acc,
              ...(current.node.colorFamily ? current.node.colorFamily : []),
            ];
          }, [])
          .map((el) => el.name)
      ),
    ]);
  });
}
