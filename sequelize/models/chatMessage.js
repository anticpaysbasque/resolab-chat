const Sequelize = require("sequelize");
const sequelize = require("../index");

const uuidv4 = require("uuid/v4");

const chatMessage = sequelize.define(
  "chatMessage",
  {
    uuid: {
      type: Sequelize.UUID,
      allowNull: false,
      primaryKey: true,
      defaultValue: uuidv4()
    },
    message: {
      type: Sequelize.TEXT,
      allowNull: false
    },
    isRead: {
      type: Sequelize.BOOLEAN,
      allowNull: false,
      defaultValue: false
    }
  },
  { freezeTableName: true }
);

module.exports = chatMessage;
