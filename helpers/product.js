const priceNewProducts = (products) => {
    const newProducts = products.map((item) => {
        item.priceNew = (
          (item.price * (100 - item.discountPercentage)) /
          100
        ).toFixed(0);
        return item;
      });
      return newProducts;
  }
const priceNewProduct = (product) => {
  product.priceNew = parseInt(((product.price * (100 - product.discountPercentage)) / 100).toFixed(0))
}

module.exports = {
    priceNewProducts,
    priceNewProduct,
}