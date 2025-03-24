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

const Drinks = sequelize.define('Drinks', {
    drinks_id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    drink_name: {
        type: Sequelize.STRING,
        allowNull: false
    },
    category: {
        type: Sequelize.STRING,
        allowNull: false
    },
    price: {
        type: Sequelize.FLOAT,
        allowNull: false
    }
});

sequelize.sync();

app.get('/Drinks', (req, res) => {
    Drinks.findAll().then(drinks => {
        res.json(drinks);
    }).catch(err => {
        res.status(500).send(err);
    });
});

app.get('/Drinks/:id', (req, res) => {
    Drinks.findByPk(req.params.id).then(drinks => {
        if (!drinks) {
            res.status(404).send('Drinks not found');
        } else {
            res.json(drinks);
        }
    }).catch(err => {
        res.status(500).send(err);
    });
});

app.post('/Drinks', (req, res) => {
    Drinks.create(req.body).then(drinks => {
        res.send(drinks);
    }).catch(err => {
        res.status(500).send(err);
    });
});

app.put('/Drinks/:id', (req, res) => {
    Drinks.findByPk(req.params.id).then(drinks => {
        if (!drinks) {
            res.status(404).send('Drinks not found');
        } else {
            drinks.update(req.body).then(() => {
                res.send(drinks);
            }).catch(err => {
                res.status(500).send(err);
            });
        }
    }).catch(err => {
        res.status(500).send(err);
    });
});

app.delete('/Drinks/:id', (req, res) => {
    Drinks.findByPk(req.params.id).then(drinks => {
        if (!drinks) {
            res.status(404).send('Drinks not found');
        }else {
            drinks.destroy().then(() => {
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