//BasketManager(data)
//data參數 為自定義預設 資料格式物件key,value
const BasketManager = function () {
  this.products = (function (data) {
    const map = new Map();
    for (let i in data) {
      map.set(i, data[i]);
    }

    return map;
  })(arguments[0]);
};
BasketManager.prototype = Object.create(Object.prototype, {
  contructor: {
    value: BasketManager,
  },
  addProductCountById: {
    value: function (id) {
      if (this.products.has(id)) {
        let val = this.products.get(id);
        this.products.set(id, ++val);
      } else {
        this.products.set(id, 1);
      }
    },
  },
  removeProductCountById: {
    value: function (id) {
      if (this.products.get(id) === 1) {
        //不減少
      } else {
        //減少商品個數
        let val = this.products.get(id);
        this.products.set(id, --val);
      }
    },
  },
  setCountById: {
    value: function (id, newCount) {
      this.products.set(id, newCount);
      return this;
    },
  },
  getCountById: {
    value: function (id) {
      return this.products.get(id);
    },
  },
  isIdExist: {
    value: function (id) {
      return this.products.has(id);
    },
  },
});

module.exports = BasketManager;
