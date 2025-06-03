import express from 'express';
import mongoose from 'mongoose';
import bodyParser from 'body-parser';
import Student from './models/student.js';
import studentRouter from './routers/studentRouter.js';
import userRouter from './routers/userRouter.js';
import jwt from 'jsonwebtoken';

const app = express();

//middleware to parse incoming requests
app.use(bodyParser.json());


//connecting to the database
const connectionString = "mongodb+srv://admin:123@cluster0.iqv84l2.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";


mongoose.connect(connectionString).then(() => {

    console.log("Connected to database.");

}).catch(() => {

    console.log("Failed to connect to database.");
})
//........




app.use("/students",studentRouter)
app.use("/users",userRouter)



app.listen(3000, 
    () => {
        console.log('Server is running on port 3000');
    }
)






