const fs = require('fs');
const path = require('path');
const usersPath = path.join(__dirname, '../data/users.json');

const readUsers = () => {
    if (!fs.existsSync(usersPath)) fs.writeFileSync(usersPath, '[]');
    return JSON.parse(fs.readFileSync(usersPath, 'utf-8'));
};

const writeUsers = (users) => {
    fs.writeFileSync(usersPath, JSON.stringify(users, null, 2));
};

exports.register = (req, res) => {
    const { name, email, password } = req.body;
    if (!name || !email || !password)
        return res.status(400).json({ message: 'Заполните все поля' });

    const users = readUsers();
    if (users.find(u => u.email === email)) {
        return res.status(409).json({ message: 'Пользователь уже существует' });
    }

    const newUser = {
        id: Date.now().toString(),
        name,
        email,
        password
    };

    users.push(newUser);
    writeUsers(users);
    res.status(201).json({ id: newUser.id, name: newUser.name });
};

exports.signIn = (req, res) => {
    const { email, password } = req.body;
    const users = readUsers();
    const user = users.find(u => u.email === email && u.password === password);
    if (!user) {
        return res.status(401).json({ message: 'Неверный email или пароль' });
    }
    res.json({ id: user.id, name: user.name });
};