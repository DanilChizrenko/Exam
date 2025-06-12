const fs = require('fs');
const path = require('path');
const ordersPath = path.join(__dirname, '../data/orders.json');

const readOrders = () => {
if (!fs.existsSync(ordersPath)) fs.writeFileSync(ordersPath, '[]');
return JSON.parse(fs.readFileSync(ordersPath, 'utf-8'));
};

const writeOrders = (orders) => {
fs.writeFileSync(ordersPath, JSON.stringify(orders, null, 2));
};

exports.addOrder = (req, res) => {
const { userId, items, total } = req.body;

if (!userId || !Array.isArray(items) || typeof total !== 'number') {
return res.status(400).json({ message: 'Неверный формат заказа' });
}

const orders = readOrders();
const newOrder = {
id: Date.now().toString(),
userId,
items,
total,
date: new Date().toISOString()
};

orders.push(newOrder);
writeOrders(orders);

res.status(201).json({ message: 'Заказ добавлен', orderId: newOrder.id });
};

exports.getOrdersByUser = (req, res) => {
const userId = req.params.idUser;
const orders = readOrders();
const userOrders = orders.filter(o => o.userId === userId);
res.json(userOrders);
};