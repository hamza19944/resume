const express = require("express");
const nodeMailer = require("nodemailer");
const bodyParser = require("body-parser");
const dotenv = require("dotenv");

dotenv.config()
const password = process.env.PASS
const app = express();
app.use(express.static("public"));
app.use(bodyParser.json())

app.use(bodyParser.urlencoded({extended: false}));
app.set("view engine", "ejs");

const transporter = nodeMailer.createTransport({
    port: 465,
    host: "smtp.gmail.com",
    auth: {
        user: "hamza.elmansy94@gmail.com",
        pass: password
    },
    secure: true,
});


app.post("/text-mail", (req, res) => {
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
        res.redirect("thanks.html")
    })
})

app.listen(3000, () => {
    console.log("working on log 3000");
})