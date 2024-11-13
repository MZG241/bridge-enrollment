import express from 'express'
import { postRoutes } from './routes/postRoutes.js';

import { userRoutes } from './routes/userRoutes.js';

import mongoose from 'mongoose';

const app = express();

app.use(express.json());

mongoose.connect("mongodb+srv://moukalazamg:Motsu241@applicant-api.bkjta.mongodb.net/?retryWrites=true&w=majority&appName=Applicant-Api")
.then(()=>{console.log("Connected to DB successfully.")})
.catch(()=>console.log("Not connected to the database."))


app.use("/api/use", postRoutes);

app.use("/api/users", userRoutes);

app.listen(4000,()=> console.log("Your server is running on port 4000 ."))
