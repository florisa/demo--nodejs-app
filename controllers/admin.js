const Product = require('../models/product');

const {validationResult} = require('express-validator/check');

const moment = require('moment');

exports.getAddProduct = (req, res, next) => {
  res.render('admin/edit-product', {
    pageTitle: 'Add Item',
    path: '/admin/add-product',
    editing: false
  });
};

exports.postAddProduct = (req, res, next) => {
  const name = req.body.name;
  const count = req.body.count;
  const time = req.body.time;
  const product = new Product(null, name, count, time);
  const errors = validationResult(req);
  if(errors.isEmpty()){
    return res.status(422).render('admin/edit-product',{
      pageTitle: 'Edit Item',
      path: '/admin/edit-product',
      errorMessage: errors.array()
    });
  }
  product.save();
  res.redirect('/admin/products');
};

exports.getEditProduct = (req, res, next) => {
  const editMode = req.query.edit;
  if (!editMode) {
    return res.redirect('/');
  }
  const prodId = req.params.productId;
  Product.findById(prodId, product => {
    if (!product) {
      return res.redirect('/');
    }
    res.render('admin/edit-product', {
      pageTitle: 'Edit Item',
      path: '/admin/edit-product',
      editing: editMode,
      product: product
    });
  });
};

exports.postEditProduct = (req, res, next) => {
  const prodId = req.body.productId;
  const updatedName = req.body.name;
  const updatedCount = req.body.count;
  const updatedTime = req.body.time;
  const updatedProduct = new Product(
    prodId,
    updatedName,
    updatedCount,
    updatedTime
  );
  updatedProduct.save();
  res.redirect('/admin/products');
};

exports.getProducts = (req, res, next) => {
  Product.fetchAll(products => {
    res.render('admin/products', {
      prods: products,
      pageTitle: 'Admin Itens',
      path: '/admin/products'
    });
  });
};

exports.postDeleteProduct = (req, res, next) => {
  const prodId = req.body.productId;
  Product.deleteById(prodId);
  res.redirect('/admin/products');
};
