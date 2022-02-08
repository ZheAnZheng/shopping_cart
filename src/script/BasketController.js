const BasketController = function (node, basketFacade, basketView) {
  this.el = node;
  this.basketFacade = basketFacade;
  this.basketView = basketView;
};
BasketController.prototype = Object.create(Object.prototype, {
  constructor: {
    value: BasketController,
  },
  initial: {
    value: function () {
      try {
        this._showProduct();
        return true;
      } catch (_) {
        return false;
      }
    },
  },

  addProductAndUpdate: {
    value: function (id) {
      this.basketFacade.addProductById(id);
      return this._updateBasket(id);
    },
  },
  removeProductAndUpdate: {
    value: function (id) {
      this.basketFacade.removeProductById(id);

      return this._updateBasket(id);
    },
  },
  _updateBasket: {
    value: function (id) {
      const newCount = this.basketFacade.getProdcutById(id).count;

      this._updateCurrentProductTotal(id);
      this._updateAllProductsTotal();
      return this._updateCount(id, newCount);
    },
  },
  _updateCurrentProductTotal: {
    value: function (id) {
      const prodcutCost = this.basketFacade.getProductTotalById(id);

      const cartProduct = this._getCartPorudctDiv(id);
      const totalSpan = cartProduct.querySelector(".product-price");

      return (totalSpan.innerHTML = `$${prodcutCost}`);
    },
  },
  _getproductCostSpan: {
    value: function (id) {
      return this.el.querySelector(`[data-id="${id}"]`);
    },
  },
  _updateAllProductsTotal: {
    value: function () {
      const AllProductsTotal = this.basketFacade.getAllProductsTotal();

      const totalSpan = this._getBasketTotalSpan();
      return (totalSpan.innerHTML = `$${AllProductsTotal}`);
    },
  },
  _updateCount: {
    value: function (id, newCount) {
      const countSpan = this._getProductCountSpan(id);

      return (countSpan.innerHTML = newCount);
    },
  },
  _getBasketTotalSpan: {
    value: function () {
      return this.el.querySelector(".total");
    },
  },
  _getProductsCartDiv: {
    value: function () {
      return this.el.querySelector(".productsCart");
    },
  },
  _getCartPorudctDiv: {
    value: function (id) {
      const cart = this._getProductsCartDiv();

      return cart.querySelector(`[data-id="${id}"]`);
    },
  },
  _getProductCountSpan: {
    value: function (id) {
      const product = this._getCartPorudctDiv(id);

      return product.querySelector(".product-count");
    },
  },
  _showProduct: {
    value: function () {
      const productsData = this.basketFacade.getAllProductDetail();

      const completedtTmplate =
        this.basketView.getCompletedTemplate(productsData);
      const productCartDiv = this._getProductsCartDiv();

      return (productCartDiv.innerHTML = completedtTmplate.join(""));
    },
  },
});

module.exports = BasketController;
