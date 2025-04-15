const Product = require('../models/Product');
const db = require('../config/db');

exports.createProduct = async (req, res) => {
  const { title, description, content, category, price, image_url, published_at } = req.body;

  try {
    const [product] = await db('products')
      .insert({
        title,
        description,
        content,
        category,
        price,
        image_url,
        published_at
      })
      .returning('*');
    res.status(201).json(product);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

exports.getProductsById = async (req, res) => {
  try {
    const products = await db('products').where({ id: req.params.id });
    res.json(products);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.getAllProducts = async (req, res) => {
  try {
    const products = await db('products').select('*');
    res.json(products);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.deleteProduct = async (req, res) => {
  const { id } = req.params;
  try {
    const deletedProduct = await db('products')
      .where({ id})
      .del();

    if (!deletedProduct) return res.status(404).json({ message: 'Product not found' });
    res.json({ message: 'Product deleted successfully' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};