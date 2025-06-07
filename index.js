import express from 'express';
import mongoose from 'mongoose';
import bodyParser from 'body-parser';
import userRouter from './routers/userRouter.js';
import jwt from 'jsonwebtoken';
import productRouter from './routers/productRouter.js';

const app = express();

//middleware to parse incoming requests
app.use(bodyParser.json());

app.use(
    (req,res,next)=>{
        const value = req.header("Authorization")
        if(value != null){
            const token = value.replace("Bearer ","")
            jwt.verify(
                token,
                "cbc-6503",
                (err,decoded)=>{
                    if(decoded == null){
                        res.status(403).json({
                            message : "Unauthorized"
                        })
                    }else{
                        req.user = decoded
                        next()
                    }                    
                }
            )
        }else{
            next()
        }        
    }
)




//connecting to the database
const connectionString = "mongodb+srv://admin:123@cluster0.iqv84l2.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";


mongoose.connect(connectionString).then(() => {

    console.log("Connected to database.");

}).catch(() => {

    console.log("Failed to connect to database.");
})
//........




app.use("/api/users",userRouter)
app.use("/api/products",productRouter)



app.listen(3000, 
    () => {
        console.log('Server is running on port 3000');
    }
)






