require('dotenv').config();
const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const app = express();
const port = process.env.PORT || 3000;

app.use(cors({ origin: "*", optionSuccessStatus: 200 }));
app.use(bodyParser.json());

//load method to send message
const subscribe = require("./subscribe");

app.post("/send", subscribe.send);
//method to get message status
app.post("/recieve",subscribe.recieve)

app.listen(port, ()=>{  
    console.log("Server listening on port", port);
});

   


