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
//Drinks
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

//Users
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

//Orders
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

// Orders.belongsTo(Users, { foreignKey: 'user_id' });
// Users.hasMany(Orders, { foreignKey: 'user_id' });


sequelize.sync();

//Drinks
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

//Users
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


//Orders
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
app.listen(port, () => console.log(`\x1b[44mServer running on http://localhost:${port}\x1b[0m`));