const express = require('express');
const cors = require('cors');
const { connection } = require('./db');
const { auth } = require('./routes/auth.routes');
const { authentication } = require("./middlewares/auth.middleware");
const { oem } = require("./routes/oem.routes");
const { inventory } = require("./routes/inventory.routes");
require("dotenv").config();
const app = express();

app.use(cors());

app.use(express.json());

app.use("/auth", auth);

app.use("/oem", authentication, oem);

app.use("/inventory", authentication, inventory);






app.use('*', async(req, res)=>{
    res.status(422).send('wrong path')
})

app.listen(process.env.PORT, async()=>{
    try {
        await connection;
        console.log('MongoDB Connected ')
    } catch (error) {
        console.log('MongoDB Not Connected')
    }
})