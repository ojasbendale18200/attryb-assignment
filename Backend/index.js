const express = require('express');
const cors = require('cors');
const { connection } = require('./db');
const { auth } = require('./routes/auth.routes');
require('dotenv').config();
const app = express();

app.use(cors())

app.use(express.json());

app.use('/auth', auth);






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