const express = require('express');
const app = express();
const PORT = 3000;

app.get('/', (req, res)=>{
    res.send('Basic server')
})

app.listen(PORT, ()=>{
    console.log(`App running at port ${PORT}`)
})