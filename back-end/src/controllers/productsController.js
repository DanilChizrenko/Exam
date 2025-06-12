const path = require('path');
const fs = require('fs');

exports.getProducts = (req, res) => {
  const filePath = path.join(__dirname, '../data/electronic/products.json');
  try {
    const data = fs.readFileSync(filePath, 'utf-8');
    const products = JSON.parse(data);
    res.json(products);
  } catch (err) {
    console.error('Ошибка чтения products.json:', err);
    res.status(500).json({ error: 'Ошибка чтения файла' });
  }
};
