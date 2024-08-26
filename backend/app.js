import express from 'express';
import route from './routes/route.js';
import cors from 'cors';

const app=express();
app.use(cors());           //middleware
app.use(express.json());  //json data fetch from request body (next) 
app.use('/',route);

const server=app.listen(4000,()=>{
    console.log("server started");
})
