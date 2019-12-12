const Sequelize = require("sequelize");
const sequelize = require("../index");

const chatMessage = sequelize.define(
  "chatMessage",
  {
    uuid: {
      type: Sequelize.UUID,
      allowNull: false,
      primaryKey: true,
      defaultValue: Sequelize.UUIDV4
    },
    message: {
      type: Sequelize.TEXT,
      allowNull: false
    },
    isRead: {
      type: Sequelize.BOOLEAN,
      allowNull: false,
      defaultValue : false
    },
  },
  {}
);

module.exports = chatMessage;
