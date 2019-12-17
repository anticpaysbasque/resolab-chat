const Sequelize = require("sequelize");
const sequelize = require("../index");

const user = sequelize.define(
    "user",
    {
    id: {
        type: Sequelize.INTEGER(11),
        allowNull: false,
        primaryKey: true,
        autoIncrement : true
    },
    username : {
        type : Sequelize.STRING(180),
        allowNull : false,
        index : true
    },
    roles : {
        type : Sequelize.TEXT('long'),
        allowNull : false,
    },
    password : {
        type : Sequelize.STRING(255),
        allowNull: false
    },
    is_active : {
        type : Sequelize.BOOLEAN,
        allowNull : false
    },
    firstname : {
        type : Sequelize.STRING(255),
        allowNull : false
    },
    lasttname : {
        type : Sequelize.STRING(255),
        allowNull : false
    },
    gender : {
        type : Sequelize.STRING(6),
        allowNull : false
    },
    birthday : {
        type : Sequelize.DATE,
        allowNull : true
    },
    time : {
        type : Sequelize.FLOAT(2,2),
        allowNull : true
    },
    },
    {freezeTableName: true,}
);

module.exports = user;