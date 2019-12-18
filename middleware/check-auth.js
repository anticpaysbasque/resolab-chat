require("dotenv").config();
const jwt = require("jsonwebtoken");
const fs = require("fs");

const cert = fs.readFileSync("certificate.crt");
const secret = fs.readFileSync("secret.key");

module.exports.checkAuth = (req, res, next) => {
    console.log(cert);

    console.log("secret", secret);

    if (!req.headers.authorization) {
        res.status(401).json({ message: "No token provided" });
    } else {
        let authToken = req.headers.authorization.split(" ");
        authToken = authToken[1];

        jwt.verify(authToken, cert, (err, decoded) => {
            if (err) {
                res.status(401).json({ message: "Invalid Token", error: err });
            } else {
                console.log(decoded);
                next();
            }
        });
    }
};
