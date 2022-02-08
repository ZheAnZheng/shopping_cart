const BasketView = function () {};
BasketView.prototype = Object.create(Object.prototype, {
  constructor: {
    value: BasketView,
  },
  _productCardTemplate: {
    value: function (product) {
      return `
            <div class="basket-product" data-id="${product.id}">
              <img class="basket-product-img" src="${product.image}" />
              <div class="product-content">
                <h3>${product.name}</h3>
                <div class="product-setting">
                  <span class="count-btn removeBtn"></span>
                  <span class="product-count">${product.count}</span>
                  <span class="count-btn addBtn"></span>
                </div>               
                <span class="product-price">$${product.price}</span>
              </div>
            </div>
            `;
    },
  },
  getSettleTemplate: {
    value: function (product) {
      return this._productCardTemplate(product);
    },
  },
  getCompletedTemplate: {
    value: function (productsArray) {
      return this._applyProductInTemplateAndGet(productsArray);
    },
  },
  _applyProductInTemplateAndGet: {
    value: function (productsArray) {
      const completedProductsTemplate = productsArray.map((product) => {
        return this.getSettleTemplate(product);
      });
      return completedProductsTemplate;
    },
  },
});

module.exports = BasketView;
