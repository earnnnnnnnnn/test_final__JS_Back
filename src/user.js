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

const Users = sequelize.define('Users', {
    user_id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    username: {
        type: Sequelize.STRING,
        allowNull: false
    },
    phone_number: {
        type: Sequelize.STRING,
        allowNull: false
    }
});

sequelize.sync();

app.get('/Users', (req, res) => {
    Users.findAll().then(users => {
        res.json(users);
    }).catch(err => {
        res.status(500).send(err);
    });
});

app.get('/Users/:id', (req, res) => {
    Users.findByPk(req.params.id).then(users => {
        if (!users) {
            res.status(404).send('users not found');
        } else {
            res.json(users);
        }
    }).catch(err => {
        res.status(500).send(err);
    });
});

app.post('/Users', (req, res) => {
    Users.create(req.body).then(users => {
        res.send(users);
    }).catch(err => {
        res.status(500).send(err);
    });
});

app.put('/Users/:id', (req, res) => {
    Users.findByPk(req.params.id).then(users => {
        if (!users) {
            res.status(404).send('Users not found');
        } else {
            users.update(req.body).then(() => {
                res.send(users);
            }).catch(err => {
                res.status(500).send(err);
            });
        }
    }).catch(err => {
        res.status(500).send(err);
    });
});

app.delete('/Users/:id', (req, res) => {
    Users.findByPk(req.params.id).then(users => {
        if (!users) {
            res.status(404).send('Users not found');
        }else {
            users.destroy().then(() => {
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