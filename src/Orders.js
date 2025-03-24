require("dotenv").config();
const express = require('express');
const Sequelize = require('sequelize');
const app = express();

app.use(express.json());

const sequelize = new Sequelize('database', 'username', 'password', {
    host: 'localhost',
    dialect: 'sqlite',
    storage: './Database/database.sqlite'
});

const Orders = sequelize.define('Orders', {
    order_id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    Users_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
            model: Users,
            key: 'user_id'
        }
    },
    total_price: {
        type: Sequelize.FLOAT,
        allowNull: false
    }
});

sequelize.sync();

app.get('/Orders', (req, res) => {
    Orders.findAll().then(orders => {
        res.json(orders);
    }).catch(err => {
        res.status(500).send(err);
    });
});

app.get('/Orders/:id', (req, res) => {
    Orders.findByPk(req.params.id).then(orders => {
        if (!orders) {
            res.status(404).send('Orders not found');
        } else {
            res.json(orders);
        }
    }).catch(err => {
        res.status(500).send(err);
    });
});

app.post('/Orders', (req, res) => {
    Orders.create(req.body).then(orders => {
        res.send(orders);
    }).catch(err => {
        res.status(500).send(err);
    });
});

app.put('/Orders/:id', (req, res) => {
    Orders.findByPk(req.params.id).then(orders => {
        if (!orders) {
            res.status(404).send('Orders not found');
        } else {
            orders.update(req.body).then(() => {
                res.send(orders);
            }).catch(err => {
                res.status(500).send(err);
            });
        }
    }).catch(err => {
        res.status(500).send(err);
    });
});

app.delete('/Orders/:id', (req, res) => {
    Orders.findByPk(req.params.id).then(orders => {
        if (!orders) {
            res.status(404).send('Orders not found');
        }else {
            orders.destroy().then(() => {
                res.send({});
            }).catch(err => {
                res.status(500).send(err);
            });
        }
    }).catch(err => {
        res.status(500).send(err);
    });
});

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Example app listening at http://localhost:${port}`));