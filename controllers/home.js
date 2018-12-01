const Product = require('../models/product');

exports.getProducts = (req, res, next) => {
  Product.fetchAll(products => {
    res.render('home/product-list', {
      prods: products,
      pageTitle: 'All List',
      path: '/products'
    });
  });
};

exports.getProduct = (req, res, next) => {
  const prodId = req.params.productId;
  Product.findById(prodId, product => {
    res.render('home/product-detail', {
      product: product,
      path: '/products'
    });
  });
}; 

exports.getIndex = (req, res, next) => {
  Product.fetchAll(products => {
    res.render('home/index', {
      prods: products,
      pageTitle: 'Home',
      path: '/'
    });
  });
};
