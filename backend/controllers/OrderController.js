import Orders from "../models/Orders.js";
import Products from "../models/Products.js";
import Warehouse from "../models/Warehouses.js";
import Transactions from "../models/Transactions.js";
import Users from "../models/Users.js";
import jwt from "jsonwebtoken";
import { Op, Sequelize } from "sequelize";
import DbContext from "../config/Database.js";

export const CheckoutOrder = async (req, res) => {
    let transaction;
    const { amount, paymentType, merchant } = req.body;
    const authHeader = req.headers['authorization']
    const token = authHeader && authHeader.split(' ')[1]
    if (token == null) return res.sendStatus(401)
    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, async (error, decoded) => {
        if (error) {
            return res.sendStatus(401);
        } else {
            try {
                transaction = await DbContext.transaction();
                // Token is valid; `decoded` contains the payload data
                const user = await Users.findOne({
                    attributes: ['id', 'fullname', 'email'],
                    where: {
                        [Op.and]: [
                            { id: decoded.userId },
                            { email: decoded.email }
                        ]
                    }
                });
                if (!user) return res.status(404).send({ message: "User Not Found" });
                // let getUserOrders = await Orders.findAll({
                //     attributes: ['id', 'quantity', 'price', 'orderDate', 'paymentStatus', 'isExpired'],
                //     where: {
                //         userId: user.id
                //     }
                // });
                let getUserOrders = await Orders.findAll({
                    attributes: ['id', 'quantity', 'price', 'orderDate', 'paymentStatus'],
                    where: {
                        [Op.and]: [
                            { userId: user.id },
                            { paymentStatus: false || 0 }
                        ]
                    }
                });
                if (!getUserOrders) return res.status(404).send({ message: "You don't have a item" });
                let totalPrice = 0;
                let updateOrder = [];
                getUserOrders.forEach((item) => {
                    totalPrice += parseInt(item.price);
                    updateOrder.push({
                        id: item.id,
                        quantity: item.quantity,
                        price: item.price,
                        isExpired: true,
                        productId: item.productId,
                        warehouseId: item.warehouseId,
                        paymentStatus: true,
                        paymentType: paymentType,
                        merchant: merchant,
                        updateBy: user.id,
                    })
                });
                if (amount < totalPrice) return res.status(404).send({ message: "Amount is not enough to pay for the item" });
                const updatePromises = updateOrder.map(async (data) => {
                    const { id, ...updates } = data;
                    const result = await Orders.update(updates, { where: { id } });
                    return id;
                });
                let updateID = await Promise.all(updatePromises);
                const orderUpdate = await Orders.findAll({
                    where: {
                        id: {
                            [Op.in]: updateID,
                        },
                    }
                })
                let dataTransaction = [];
                orderUpdate.forEach((order) => {
                    dataTransaction.push({
                        userId: order.userId,
                        productId: order.productId,
                        orderId: order.id,
                        amount: order.price,
                        paymentStatus: "paid",
                        paymentType: order.paymentType,
                        merchant: order.merchant
                    })
                })
                const createdTransaction = await Transactions.bulkCreate(dataTransaction);
                await transaction.commit();
                res.clearRequestTimeout();
                res.status(200).send({
                    status: 200,
                    message: "Success get orders",
                    data: {
                        price: totalPrice,
                        orderUpdate,
                        createdTransaction
                    }
                });
            } catch (error) {
                await transaction.rollback();
                res.status(500).json({ error: 'Internal Server Error' });
            }

        }
    });
}

export const GetOrdersUser = async (req, res) => {
    const authHeader = req.headers['authorization']
    const token = authHeader && authHeader.split(' ')[1]
    if (token == null) return res.sendStatus(401)
    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, async (error, decoded) => {
        if (error) {
            return res.sendStatus(401);
        } else {
            try {
                // Token is valid; `decoded` contains the payload data
                const user = await Users.findOne({
                    attributes: ['id', 'fullname', 'email'],
                    where: {
                        [Op.and]: [
                            { id: decoded.userId },
                            { email: decoded.email },
                        ]
                    }
                });
                if (!user) return res.status(404).send({ message: "User Not Found" });
                let getUserOrders = await Orders.findAll({
                    attributes: ['id', 'quantity', 'price', 'orderDate', 'paymentStatus'],
                    where: {
                        [Op.and]: [
                            { userId: user.id },
                            { paymentStatus: false || 0 }
                        ]
                    }
                });
                if (!getUserOrders) return res.status(404).send({ message: "Order Not Found" });
                let dataResult = [];
                for (let i = 0; i < getUserOrders.length; i++) {
                    dataResult[i] = {
                        orders: getUserOrders[i],
                        users: user,
                        warehouse: []
                    };
                }

                res.clearRequestTimeout();
                res.status(200).send({
                    status: 200,
                    message: "Success get orders",
                    data: {
                        dataResult
                    }
                });
            } catch (error) {
                res.status(500).json({ error: 'Internal Server Error' });
            }

        }
    });
}

export const AddOrder = async (req, res) => {
    let transaction;
    const { productId, quantity, warehouseId } = req.body;
    const authHeader = req.headers['authorization']
    const token = authHeader && authHeader.split(' ')[1]
    if (token == null) return res.sendStatus(401)
    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, async (error, decoded) => {
        if (error) {
            return res.sendStatus(401);
        } else {
            try {
                // Token is valid; `decoded` contains the payload data
                transaction = await DbContext.transaction();
                const user = await Users.findOne({
                    where: {
                        [Op.and]: [
                            { id: decoded.userId },
                            { email: decoded.email }
                        ]
                    }
                });
                if (!user) return res.status(404).send({ message: "User Not Found! Please re login" });

                const product = await Products.findOne({
                    where: { id: productId },
                    attributes: ['id', 'productName', 'price'],
                });
                if (!product) return res.status(404).send({ message: "Product Not Found! Please refresh app" });

                let productPrice = parseInt(product.price) * parseInt(quantity);
                const warehouse = await Warehouse.findOne({
                    where: {
                        [Op.and]: [
                            { id: warehouseId },
                            { productId: productId }
                        ]
                    },
                    attributes: ['id', 'warehouseName', 'location', 'stock'],
                })
                if (warehouse.stock < quantity) return res.status(400).send({ message: "Out Of Stock! Stock Left : " + warehouse.stock });
                // --------------------------------------------------
                // Insert Order Transaction & Update Warehouse system
                // --------------------------------------------------
                let createdOrderData = {
                    productId: productId,
                    warehouseId: warehouseId,
                    quantity: quantity,
                    price: productPrice,
                    isExpired: false,
                    paymentStatus: false,
                    orderDate: new Date(),
                    userId: decoded.userId
                };
                const orderCreate = await Orders.create(createdOrderData);
                let warehouseStock = parseInt(warehouse.stock) - parseInt(quantity);
                const warehouseUpdate = await Warehouse.update({ stock: warehouseStock }, {
                    where: {
                        id: warehouseId
                    }
                });
                await transaction.commit();
                res.clearRequestTimeout();
                res.status(200).send({
                    status: 200,
                    message: "Success to add item in your order",
                    data: {
                        orderCreate,
                        warehouseUpdate
                    }
                });
            } catch (error) {
                // await transaction.rollback();
                res.status(500).json({ error: 'Internal Server Error' });
            }

        }
    });
}

async function checkProductPrice(productId, quantity) {
    let result;
    const product = await Products.findOne({
        where: { id: productId },
        attributes: ['id', 'productName', 'price'],
    });
    if (!product) return res.status(404).send({ message: "Product Not Found! Please refresh app" });
    result = parseInt(product.price) * parseInt(quantity);
    return result;
}