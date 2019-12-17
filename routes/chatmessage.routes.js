const express = require("express");
const router = express.Router();
const sequelize = require("sequelize");
const Op = sequelize.Op;

const ChatMessage = require("../sequelize/models/chatMessage")

router.get("", (req, res) => {
    ChatMessage.findAll().then(chatMessages => {
        if (chatMessages.length <= 0){
            res.status(204).send("There is no message in database")
        } else {
            res.status(200).json(chatMessages) 
        }        
    })
    .catch(err => {
        res.status(404).json(err)
    })
})

router.post("", (req, res) => {
    const {message, senderId, receiverId} = req.body

    if (!message || !senderId || !receiverId) {
        res.status(422).json({
            message : "some keys are missing"
        })
    } else {
        ChatMessage.create({
            message,
            sender_id : senderId,
            receiver_id : receiverId
        })
        .then( chatMessage => 
            res.status(201).json(chatMessage))
        .catch(err =>{
            res.status(400).json({
                message : "message could not be written in DB"
            })

        })
    }
})


router.get("/userMessage", (req, res) =>{
    const {senderId, receiverId} = req.body;
    if (!senderId || !receiverId ){
        res.status(400).json({
            message : "missing parameters"
        })
    } else {
        ChatMessage.findAll({
            where :{
                sender_id :{
                    [Op.or] : [senderId, receiverId]
                },
                receiver_id :{
                    [Op.or] : [senderId, receiverId]
                }
                }
            }
        )
        .then(messageList => {
            res.status(200).json(messageList)
        })
    }
})

module.exports = router;