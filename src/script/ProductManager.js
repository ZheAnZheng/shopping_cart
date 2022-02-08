const ProductManager = function (data) {
  this.products = [...data];
};
ProductManager.prototype = Object.create(Object.prototype, {
  constructor: {
    value: ProductManager,
  },
  getProductById: {
    value: function (id) {
      try {
        return this._tryGetProductById(id);
      } catch (e) {
        throw e;
      }
    },
  },
  _tryGetProductById: {
    value: function (id) {
      if (typeof id === "string") {
        id = parseInt(id);
        const product = this.products.find((product) => product.id === id);

        return this._isProductExist(product) ? product : -1;
      } else {
        throw new Error("id must be string");
      }
    },
  },
  _isProductExist: {
    value: function (product) {
      return product ? true : false;
    },
  },
});

module.exports = ProductManager;
