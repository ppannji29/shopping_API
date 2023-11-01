import express from "express";
import { RegistrationAccount, CompletedRegistrationAccount, Login, Logout } from "../controllers/UserController.js";
import { verifyToken, verfiyTokenDefault } from "../middleware/verifyToken.js";
import { refreshToken } from "../controllers/RefreshToken.js";
import { RequestTimeout } from "../middleware/setTimeOut.js";
import { AddOrder, GetOrdersUser, CheckoutOrder, DeleteOrder, UpdateOrder } from "../controllers/OrderController.js";

const router = express.Router();

router.post('/api/user/registration', verfiyTokenDefault, RequestTimeout, RegistrationAccount);
router.put('/api/userprofile/:userId', verfiyTokenDefault, RequestTimeout, CompletedRegistrationAccount);
router.post('/api/login', verfiyTokenDefault, RequestTimeout, Login);
router.get('/api/token', refreshToken);
router.delete('/api/logout', Logout);

// Checkout
router.get('/api/order', verifyToken, RequestTimeout, GetOrdersUser);
router.post('/api/order', verifyToken, RequestTimeout, AddOrder);
router.post('/api/checkout', verifyToken, RequestTimeout, CheckoutOrder);
router.delete('/api/checkout/:orderId', verifyToken, RequestTimeout, DeleteOrder);
router.put('/api/checkout/:orderId/:quantity', verifyToken, RequestTimeout, UpdateOrder);

export default router;