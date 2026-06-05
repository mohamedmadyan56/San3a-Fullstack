const express = require('express');
const cors = require('cors');
const userRouter = require('./src/routes/userRoutes');


const app = express();
app.use(cors());
app.use(express.json());


app.use('/api/v1/users',userRouter);
app.get('/',(req,res)=>{
    res.send('server is working .... ');
    
})

module.exports=app;
