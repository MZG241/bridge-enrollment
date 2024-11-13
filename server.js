import express from 'express'
import { postRoutes } from './routes/postRoutes.js';

import { userRoutes } from './routes/userRoutes.js';

import mongoose from 'mongoose';
import dotenv from "dotenv"
const app = express();

dotenv.config();
app.use(express.json());

const MONGO = process.env.MONGO_URL
mongoose.connect(MONGO)
.then(()=>{console.log("Connected to DB successfully.")})
.catch(()=>console.log("Not connected to the database."))


app.use("/api/use", postRoutes);

app.use("/api/users", userRoutes);

app.listen(4000,()=> console.log("Your server is running on port 4000 ."))
