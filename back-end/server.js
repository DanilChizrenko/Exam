const express = require('express');
const cors = require('cors');
const path = require('path');

const app = express();
const PORT = 4000;

app.use(cors());
app.use(express.json());

const productRoutes = require('./src/routes/productsRoutes');
app.use('/api/products', productRoutes);

const userRoutes = require('./src/routes/userRoutes');
app.use('/api/users', userRoutes);

const orderRoutes = require('./src/routes/orderRoutes');
app.use('/api/orders', orderRoutes);

app.listen(PORT, () => {
  console.log(`✅ Сервер запущен: http://localhost:${PORT}`);
});
