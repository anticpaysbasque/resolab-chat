const chatMessage = require("./models/chatMessage")
const User = require("./models/user")



User.hasMany(chatMessage, {as : "sender", foreignKey : "sender_id"});
User.hasMany(chatMessage, {as : "receiver", foreignKey : "receiver_id"});

