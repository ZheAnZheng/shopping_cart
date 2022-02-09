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
    const collection= productManager.products;
    
    assert(collection instanceof Array);
  })
  it('throw Error if argument of getProductById not a string ',()=>{
    const id=20;
    
    assert.throws(() => productManager.getProductById(id), Error);
  })
  it("reutrn -1 if id of product is not exist when getProductById",()=>{
    const id = '-1';
    const actual = productManager.getProductById(id);
    const expect= -1;
    assert.equal(actual, expect);
  })
  it('return product when getProductById',()=>{
    const id ='0'
    const actual=productManager.getProductById(id);
    const expect = {
      id: 0,
      image: "./public//broken_jean@2x.png",
      name: "破壞補丁修身牛仔褲",
      price: 3999,
    };
    assert.deepEqual(actual, expect);
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
    const collection = basketManager.products;
    assert(collection instanceof Map);
  })
  it("can get count of id ",()=>{
    const id='0'
    const actual = basketManager.getCountById(id);
    const expect = 1;
    assert.equal(actual, expect);
  })
  it('can set count by id',()=>{
    const id='0';
    basketManager.setCountById(id, 10);
    const actual = basketManager.getCountById(id);
    const expect=10
    assert.equal(actual, expect)
  })
  it('can add product count by id ',()=>{
    const id='0';
    basketManager.addProductCountById(id);
    const actaul=basketManager.getCountById(id)
    const expect=2
    assert.equal(actaul, expect);
  })
  it("can remove product count by id ",()=>{
    const id='0'
    const newCount=5
    basketManager.setCountById(id, newCount).removeProductCountById(id);
    const actaul=basketManager.getCountById(id);
    const expect=4;
    assert.equal(actaul, expect);
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
      
      const productId = "0"
      
      const actual = basketFacade.addProductById(productId)
      const expect=true;
      assert.equal(actual, expect);
    })
    it("should return true if removeProduct success",()=>{
      const id= '0';
      const actaul = basketFacade.removeProductById(id);
      const expect=true;
      assert.equal(actaul, expect);
    });
    it("should return false if addProduct fail", () => {
      const id= '-1';
      const actaul = basketFacade.addProductById(id);
      const expect= false
      assert.equal(actaul, expect);
    });
    it("should return false if removeProduct fail", () => {
      const id ='-1'
      const actaul=basketFacade.removeProductById(id)
      const expect=false
      assert.equal(actaul, expect);
    });
    it('get Product total by id',()=>{
      const id='0';
      const actual=basketFacade.getProductTotalById(id)
      const expect=3999;
      assert.equal(actual,expect);
    })
    it("get all product total", () => {
      const actual =
        basketFacade.getAllProductsTotal() &&
        typeof basketFacade.getAllProductsTotal(); 
      const epxect = "number";

      assert.equal(actual, epxect);
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