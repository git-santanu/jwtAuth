const express = require('express');
const app = express();
const{sequelize}=require('./models');
const PORT = process.env.PORT||3000;

app.use(express.json());
app.use(express.urlencoded({extended: false}));

app.use(require('./routes'))

app.listen(PORT,()=>{
    console.log(`port is running on ${PORT}`);
    sequelize.authenticate().then(()=>{
        console.log('Connected to db')
    }).catch(err=>console.log('errr',err))
})