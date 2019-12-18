let chai = require("chai");
let chaiHttp = require("chai-http");
let should = chai.should();

let server = require("../index");

const sequelize = require("../sequelize");
const User = require("../sequelize/models/user");
const Chatmessage = require("../sequelize/models/chatMessage");

const user1 = {
  username: "toto",
  roles: "ROLE_STUDENT",
  password: "totopass",
  is_active: true,
  firstname: "john",
  lastname: "doe",
  gender: "male"
};

const user2 = {
  username: "jb",
  roles: "ROLE_STUDENT",
  password: "cssforlife",
  is_active: true,
  firstname: "jules",
  lastname: "bonnnnnard",
  gender: "male"
};

const user3 = {
  username: "bv",
  roles: "ROLE_MODERATOR",
  password: "phpsaynuljssaymieux",
  is_active: true,
  firstname: "basile",
  lastname: "v",
  gender: "male"
};

const message1 = {
  message: "css c'est la vie",
  isRead: true,
  sender_id: 2,
  receiver_id: 3
};

const message2 = {
  message: "non ça pue",
  isRead: true,
  sender_id: 3,
  receiver_id: 2
};

const message3 = {
  message: "c'est vrai, le SASS c'est encore mieux",
  isRead: true,
  sender_id: 2,
  receiver_id: 3
};

const message4 = {
  message: "JS rule them all",
  isRead: true,
  sender_id: 3,
  receiver_id: 2
};

const message5 = {
  message: "tu peux m'aider pour un flex around ?",
  isRead: true,
  sender_id: 1,
  receiver_id: 2
};

chai.use(chaiHttp);

let users;
let messages;
let token;

describe("Usermessage", () => {
  before(async () => {
    await sequelize.sync({ force: true });
    users = await Promise.all([
      User.create(user1),
      User.create(user2),
      User.create(user3)
    ]);
    messages = await Promise.all([
      Chatmessage.create(message1),
      Chatmessage.create(message2),
      Chatmessage.create(message3),
      Chatmessage.create(message4),
      Chatmessage.create(message5)
    ]);
    const getToken = await chai
      .request(server)
      .post("/token")
      .send({
        username: users[0].username,
        password: users[0].password
      });
    token = `Bearer ${getToken.body.token}`;
  });

  describe("GET USERMESSAGE", () => {
    it("should return the common messages between two users", async () => {
      const res = await chai
        .request(server)
        .get("/chatmessages/userMessage")
        .set("Authorization", token)
        .send({ senderId: users[1].id, receiverId: users[2].id });
      res.should.have.status(200);
    });
  });
});
