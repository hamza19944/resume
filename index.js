const express = require("express");
const nodeMailer = require("nodemailer");
const bodyParser = require("body-parser");
const dotenv = require("dotenv");

dotenv.config()
const {password, host} = process.env
const port = process.env.PORT || 3000

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


app.post("/mail", (req, res) => {
    const {name, email, subject, message} = req.body;
    console.log(name, email, subject, message);
    const mailData = {
        from: 'hamza.elmansy94@gmail.com',  // sender address
        to: email,   // list of receivers
        subject: subject,
        text: message,
        html: `<b>Hello ${name ? name : "There"}! </b><br> we will get in touch as soon as possible<br/>`,
    };
    transporter.sendMail(mailData, (error, info) => {
        if(error) console.log(error);
        else{
            res.redirect("index.html#about")
        }
    })
})
app.get("/", (req, res) => {
    res.render("index.html")
})
app.listen(port, () => {
    console.log("working on log: " + port);
})