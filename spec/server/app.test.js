const app = require('../../server/app.js');
const supertest = require('supertest');
const testProducts = require('./testProducts.js');
const testStyles = require('./testStyles.js');
const mongoose = require('mongoose');
const Product = require('../../database/productSchema.js');
const Style = require('../../database/styleSchema.js');


// create a test database to use without messing with the real one
beforeEach((done) => {
  mongoose.connect("mongodb://localhost:27017/JestTest",
    { useNewUrlParser: true, useUnifiedTopology: true },
    async () => {
      const posts = await Product.insertMany(testProducts);
      const styles = await Style.insertMany(testStyles);
      return done();
    });
});

afterEach((done) => {
  mongoose.connection.db.dropDatabase(() => {
    mongoose.connection.close(() => done())
  });
});

// test mongoose connection
describe('mongoose is working', () => {
  it('should find posts in database', async () => {
    const findOne = await Product.findOne({id: 10});
    expect(findOne.id).toEqual(10);
    expect(findOne.defaultPrice).toEqual('5000000');
  });
});

// test routes
describe('GET /products works', () => {
  it('should return the first five products if no other modifiers are given', async () => {
    await supertest(app).get('/products')
      .expect(200)
      .then((response) => {
        const productList = response.body
        expect(Array.isArray(productList)).toBeTruthy;
        expect(productList.length).toBe(5);
        expect(productList[0].id).toBe(1);
        expect(productList[1].id).toBe(2);
        expect(productList[2].id).toBe(3);
        expect(productList[3].id).toBe(4);
        expect(productList[4].id).toBe(5);
      });
  });
  it('should return products six thorugh ten if asked to skip to the second page', async () => {
    await supertest(app).get('/products?page=2')
      .expect(200)
      .then((response) => {
        const productList = response.body
        expect(Array.isArray(productList)).toBeTruthy;
        expect(productList.length).toBe(5);
        expect(productList[0].id).toBe(6);
        expect(productList[1].id).toBe(7);
        expect(productList[2].id).toBe(8);
        expect(productList[3].id).toBe(9);
        expect(productList[4].id).toBe(10);
      });
  });
  it('should return more than five products if asked to return more', async () => {
    await supertest(app).get('/products?count=7')
    .expect(200)
    .then((response) => {
      const productList = response.body
      expect(Array.isArray(productList)).toBeTruthy;
      expect(productList.length).toBe(7);
      expect(productList[0].id).toBe(1);
      expect(productList[1].id).toBe(2);
      expect(productList[2].id).toBe(3);
      expect(productList[3].id).toBe(4);
      expect(productList[4].id).toBe(5);
      expect(productList[5].id).toBe(6);
      expect(productList[6].id).toBe(7);
    });
  });
  it('should correctly parse both sets of query parameters if both are used at once', async () => {
    await supertest(app).get('/products?count=3&page=2')
    .expect(200)
    .then((response) => {
      const productList = response.body;
      expect(Array.isArray(productList)).toBeTruthy();
      expect(productList.length).toBe(3);
      expect(productList[0].id).toBe(4);
      expect(productList[1].id).toBe(5);
      expect(productList[2].id).toBe(6);
    });
  });
});

describe('GET /product:product_id works', () => {
  it('should return an object with product info', async () => {
    await supertest(app).get('/products/3/')
    .expect(200)
    .then((response) => {
      const productInfo = response.body;
      //console.log(productInfo);
      expect(productInfo.id).toBe(3);
      expect(productInfo.name).toBe('Morning Joggers');
      expect(productInfo.slogan).toBe('Make yourself a morning person');
      expect(productInfo.description).toBe("Whether you're a morning person or not.  Whether you're gym bound or not.  Everyone looks good in joggers.");
      expect(productInfo.category).toBe('Pants');
      expect(productInfo['default_price']).toBe('40');
      expect(productInfo.features).toEqual([
        {
          feature: 'Fabric',
          value: '100% Cotton',
            },
        {
          feature: 'Cut',
          value: 'Skinny',
            }
      ]);
    });
  });
  it('should return a 404 for nonexistent products', async () => {
    await supertest(app).get('/products/30/')
    .expect(404);
  })
});

describe('GET /product:product_id/styles works', () => {
  it('should return an object containing an array of styles', async () => {
    await supertest(app).get('/products/1/styles')
      .expect(200)
      .then((response) => {
        const productStyles = response.body;
        expect(productStyles['product_id']).toBe('1');
        expect(Array.isArray(productStyles.results)).toBeTruthy();
        expect(productStyles.results.length).toBe(6);
        const thirdStyle = productStyles.results[2];
        expect(thirdStyle['style_id']).toBe(3);
        expect(thirdStyle.name).toBe('Ocean Blue & Grey');
        expect(thirdStyle['original_price']).toBe('140');
        expect(thirdStyle['sale_price']).toBe('100');
        expect(thirdStyle['default?']).toBeFalsy();
        expect(Array.isArray(thirdStyle.photos)).toBeTruthy();
        expect(Array.isArray(thirdStyle.skus)).toBeTruthy();
      })
  });
  it('should return a 404 for nonexistent products', async () => {
    await supertest(app).get('/products/30/styles')
    .expect(404);
  })
});

describe('GET /product:product_id/related works', () => {
  it('should return an array of related product IDs', async () => {
    await supertest(app).get('/products/3/related')
      .expect(200)
      .then((response) => {
        const relatedProducts = response.body;
        expect(Array.isArray(relatedProducts)).toBeTruthy();
        expect(relatedProducts.length).toBe(5);
        expect(relatedProducts).toEqual([5, 9, 7, 2, 1]);
      })
  });
  it('should return a 404 for nonexistent products', async () => {
    await supertest(app).get('/products/30/related')
    .expect(404);
  })
});

