const chatMessage = require("./models/chatMessage")
const user = require("./models/user")



user.hasMany(chatMessage, {as : "sender", foreignKey : "sender_id"});
user.hasMany(chatMessage, {as : "receiver", foreignKey : "receiver_id"});

