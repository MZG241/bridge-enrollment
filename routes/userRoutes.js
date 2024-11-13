import express from "express";

import { registerUser , loginUser } from "../controllers/user.controllers.js";

const routers = express.Router();

routers.post("/register-user" , registerUser);

routers.post("/login" , loginUser);


export  {routers as userRoutes }