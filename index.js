const express = require("express");
const nodeMailer = require("nodemailer");
const bodyParser = require("body-parser");
const dotenv = require("dotenv");

dotenv.config()
const {password, host, port} = process.env

const app = express();
app.use(express.static("public"));
app.use(bodyParser.json())

app.use(bodyParser.urlencoded({extended: false}));

const transporter = nodeMailer.createTransport({
    service: 'gmail',
    auth: {
        type: 'OAuth2',
        user: process.env.MAIL_USERNAME,
        pass: process.env.MAIL_PASSWORD,
        clientId: process.env.OAUTH_CLIENTID,
        clientSecret: process.env.OAUTH_CLIENT_SECRET,
        refreshToken: process.env.OAUTH_REFRESH_TOKEN
    }
});


app.post("/public/mail", (req, res) => {
    const {name, email, subject, message} = req.body;
    console.log(name, email, subject, message);
    const mailData = {
        from: 'hamza.elmansy94@gmail.com',  // sender address
        to: email,   // list of receivers
        subject: subject,
        text: message,
        html: `<b>Hey ${name ? name : "There"}! </b><br> This is our first message sent with Nodemailer<br/>`,
    };
    transporter.sendMail(mailData, (error, info) => {
        if(error) console.log(error);
        else console.log("message is sent");
    })
})
app.get(port, (req, res) => {
    res.render("public/index.html")
})
app.listen(port, () => {
    console.log("working on log: " + port);
})