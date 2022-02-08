//service
const assert = require("assert");
const fs = require("fs");
const { JSDOM } = require("jsdom");
const html = fs.readFileSync("index.html", "ASCII");
const { window } = new JSDOM(html, { contentType: "text/html" });
const document = window.document;
//test prototype
const ProductManager = require("../src/script/ProductManager.js");
const productData=require('../src/script/ProductsData.js')
const BasketManager = require("../src/script/BasketManager.js");
const BasketFacade=require('../src/script/BasketFacade.js')
const BasketView = require("../src/script/BasketView.js");
const BasketController = require("../src/script/BasketController.js");
const productsData = require("../src/script/ProductsData.js");

describe('ProductManager',()=>{
  let productManager;

  beforeEach('initial',()=>{
    productManager = new ProductManager(productData);
  })
  it('has a array for store products',()=>{
    assert.equal(typeof (productManager.products), typeof Array.prototype);
  })
  it('throw Error if argument of getProductById not a string ',()=>{
    assert.throws(()=>productManager.getProductById(20), Error);
  })
  it("reutrn -1 if id of product is not exist when getProductById",()=>{
    assert.equal(productManager.getProductById('-1'),-1)
  })
  it('return product when getProductById',()=>{
    assert.deepEqual(productManager.getProductById("0"), {
      id: 0,
      image: "./public//broken_jean@2x.png",
      name: "破壞補丁修身牛仔褲",
      price: 3999,
    });
  })
})

describe('BasketManager',()=>{
  let basketManager;
  beforeEach(()=>{
    basketManager = new BasketManager({
      '0': 1,
      '1': 1,
    });
  })
  it('use Map for store id and count',()=>{
    assert( basketManager.products instanceof Map);
  })
  it("can get count of id ",()=>{
    assert.equal(basketManager.getCountById("0"), 1);
  })
  it('can set count by id',()=>{
    basketManager.setCountById("0", 10);
    assert(basketManager.getCountById("0"),10);
  })
  it('can add product count by id ',()=>{
    basketManager.addProductCountById("0");
    assert.equal(basketManager.getCountById("0"), 2);
  })
  it("can remove product count by id ",()=>{
    basketManager.setCountById("0", 5).removeProductCountById("0");
    assert.equal(basketManager.getCountById("0"), 4);
  })
})


describe('BasketFacade',()=>{
  let basketFacade;
  let basketManager;
  let productManager;
  beforeEach(()=>{
    basketManager=new BasketManager({
      '0':1,
      '1':1
    })
    productManager = new ProductManager(productData);
    basketFacade = new BasketFacade(basketManager, productManager);
  })
  
    it('should return true if addProduct success',()=>{
      assert(basketFacade.addProductById("0"));
    })
    it("should return true if removeProduct success",()=>{
      assert(basketFacade.removeProductById("0"));
    });
    it("should return false if addProduct fail", () => {
      assert.equal(basketFacade.addProductById("-1"),false);
    });
    it("should return false if removeProduct fail", () => {
      assert.equal(basketFacade.removeProductById("-1"),false);
    });
    it('get Product total by id',()=>{
      assert.equal(basketFacade.getProductTotalById('0'),3999);
    })
    it("get all product total", () => {
      assert(
        basketFacade.getAllProductsTotal() &&
          typeof basketFacade.getAllProductsTotal() === "number"
      );
    });
    it('can get all Product detail',()=>{
      basketFacade.getAllProductDetail().forEach(product=>{
        assert(product.count && typeof product.count === 'number')
        assert(product.name && typeof product.name === "string");
        assert(product.image && typeof product.image === "string");
        assert(product.id >-1 && typeof product.id === "number");
        assert(product.price > -1 && typeof product.id === "number");
      })
    })
})

describe("BasketView",()=>{
  let basketView;
  let dummyData;
  beforeEach(()=>{
    basketView = new BasketView();
    dummyData=productsData.map(data=>{
      return {
        ...data,
        count:1
      }
    })
  })
  it('can get settle template when input productData',()=>{
    assert(basketView.getSettleTemplate(dummyData[0]));
  })
  it('can get All products settle template ',()=>{
    assert(basketView.getCompletedTemplate(dummyData));
  })
});

describe('BasketController',()=>{
  let basketController;
  let basketFacade;
  let basketManager;
  let productManager;
  let basketView;
  let basketCartNode;
  beforeEach(()=>{
     basketManager = new BasketManager({
       '0': 1,
       '1': 1,
     });
     productManager = new ProductManager(productData);
     basketFacade = new BasketFacade(basketManager, productManager);
     basketView=new BasketView();
     basketCartNode = document.querySelector(".shopping-basket");
     basketController = new BasketController(
       basketCartNode,
       basketFacade,
       basketView
     );
     basketController.initial()

  })
  it('dom has two product if initial',()=>{
    
    const count = basketCartNode.querySelectorAll(".basket-product");
    assert(count.length, 2)
  })
  it('addProduct and update View',()=>{
    assert(basketController.addProductAndUpdate('0'));
  })
  it('removeProduct and update View ',()=>{
    assert(basketController.removeProductAndUpdate("0"));
  })

})