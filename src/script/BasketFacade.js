function BasketFacade(basketManager, productManager) {
  this.basketManager = basketManager;
  this.productManager = productManager;
}
BasketFacade.prototype = Object.create(Object.prototype, {
  contructor: {
    value: BasketFacade,
  },
  addProductById: {
    value: function (id) {
      try {
        this._tryAddProductById(id);
        return true;
      } catch (_) {
        return false;
      }
    },
  },
  removeProductById: {
    value: function (id) {
      try {
        this._tryRemoveProductById(id);
        return true;
      } catch (_) {
        return false;
      }
    },
  },
  getProductTotalById: {
    value: function (id) {
      const detail = this.productManager.getProductById(id);
      const count = this.basketManager.getCountById(id);
      const price = detail.price;

      return count * price;
    },
  },
  getAllProductsTotal: {
    value: function () {
      let total = 0;
      this.basketManager.products.forEach((_, id) => {
        const sum = this.getProductTotalById(id);
        total += sum;
      });
      return total;
    },
  },
  getProdcutById: {
    value: function (id) {
      const product = this.productManager.getProductById(id);
      const count = this.basketManager.getCountById(id);
      return {
        ...product,
        count,
      };
    },
  },
  getAllProductDetail: {
    value: function () {
      const result = [];
      this.basketManager.products.forEach((count, id) => {
        const product = this.productManager.getProductById(id);
        result.push({
          ...product,
          count,
        });
      });
      return result;
    },
  },
  _tryAddProductById: {
    value: function (id) {
      if (this.basketManager.isIdExist(id)) {
        this.basketManager.addProductCountById(id);
      } else {
        throw new Error();
      }
    },
  },
  _tryRemoveProductById: {
    value: function (id) {
      if (this.basketManager.isIdExist(id)) {
        this.basketManager.removeProductCountById(id);
      } else {
        throw new Error();
      }
    },
  },
});
module.exports = BasketFacade;
