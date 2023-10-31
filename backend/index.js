import cluster from 'cluster';
import http from 'http';
import os from 'os';
import express from "express";
import dotenv from "dotenv";
import router from "./routes/index.js";
import cookieParser from "cookie-parser";
import cors from "cors";
import db from "./config/Database.js";

dotenv.config();
const app = express();
const numCPUs = os.cpus().length;

if (cluster.isMaster) {
    // Fork workers for each CPU core
    for (let i = 0; i < numCPUs; i++) {
        cluster.fork();
    }

    cluster.on('exit', (worker, code, signal) => {
        console.log(`Worker ${worker.process.pid} died`);
        cluster.fork();
    });
} else {
    try {
        const allowedOrigins = ['http://localhost:8080', 'http://127.0.0.1:8080'];
        const corsOptions = {
            credentials: true,
            origin: allowedOrigins,
        };
        await db.authenticate();
        console.log("Database connected..");
        app.use(cors(corsOptions));
        app.use(cookieParser());
        app.use(express.json());
        app.use(router);
        // Create an HTTP server for each worker
        const server = http.createServer(app);

        const port = process.env.PORT;
        server.listen(port, () => {
            console.log(`Worker ${process.pid} is running on port ${port}`);
        });

    } catch (error) {
        console.log(error);
    }
}
