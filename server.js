require('dotenv').config();
const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const app = express();
const port = process.env.PORT || 3000;

app.use(cors({ origin: "*", optionSuccessStatus: 200 }));
app.use(bodyParser.json());

//load method to send message
const subscribe = require("./subscribe").send;
app.post("/send", subscribe);

app.listen(port, ()=>{  
    console.log("Server listening on port", port);
});

   


