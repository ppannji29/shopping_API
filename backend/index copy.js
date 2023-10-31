import express from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
// ----------------------------------------------------------
import db from "./config/Database.js";
// import Users from "./models/UserModel.js";
// import UserProfile from "./models/UserProfileModel.js";
// import ProductCategory from "./models/ProductCategoryModel.js";
// import Product from "./models/ProductModel.js";
// import UserCart from "./models/UserCartModel.js";
// import Cart from "./models/CartModel.js";
// ----------------------------------------------------------
import cors from "cors";
import router from "./routes/index.js";
import cluster from 'cluster';
import http from 'http';
import numCPUs from 'os';
dotenv.config();
const app = express();

numCPUs = numCPUs.cpus().length;
if (cluster.isMaster) {
    // Fork workers for each CPU core
    for (let i = 0; i < numCPUs; i++) {
        cluster.fork();
    }

    cluster.on('exit', (worker, code, signal) => {
        console.log(`Worker ${worker.process.pid} died`);
        cluster.fork(); // Automatically replace the dead worker
    });
} else {
    // Create an HTTP server for each worker
    const server = http.createServer(app);
    const port = 3000;
    server.listen(port, () => {
        console.log(`Worker ${process.pid} is running on port ${process.env.PORT}`);
    });
}

// try {
//     await db.authenticate();
//     console.log("Database connected..");
//     // await Users.sync();
//     // await UserProfile.sync();
//     // await ProductCategory.sync();
//     // await Product.sync();
//     // await Cart.sync();
//     // await UserCart.sync();

// } catch (error) {
//     console.log(error);
// }

// app.use(cors({ credentials: true, origin: 'http://localhost:3000' }));
// app.use(cookieParser());
// app.use(express.json());
// app.use(router);

// app.listen(process.env.PORT, () => console.log(`Server running at port ${process.env.PORT}`));