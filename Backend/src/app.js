import express from "express";
import cookieParser from 'cookie-parser'
import cors from 'cors'


const app = express();
app.use(express.json())
app.use(cookieParser())
app.use(express.urlencoded({extended:true}))
app.use(cors({
    credentials:true,
    origin:['http://localhost:5173']
}))

// router imports

import healthCheckRouter from "./routes/healthcheck.routes.js";

app.use("/api/v1/healthcheck", healthCheckRouter);
export default app;
