const { Sequelize } = require('sequelize');

const sequelize = new Sequelize('Practice-Node-Project', 'postgres', process.env.PASSWORD, {
    host: '127.0.0.1',
    dialect: 'postgres' 
});

module.exports = sequelize;