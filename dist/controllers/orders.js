"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getOrdersByUser = exports.orderStatusChange = exports.deleteOrder = exports.createOrder = exports.getOrders = void 0;
const orders_1 = __importDefault(require("../models/orders"));
const users_1 = __importDefault(require("../models/users"));
const getOrders = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const orders = yield orders_1.default.find();
    res.json(orders);
});
exports.getOrders = getOrders;
const createOrder = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { cellphone, direction, city, postalCode, state, products, status, total, } = req.body;
    const { _id } = req.params;
    const userVerified = yield users_1.default.findById({ _id });
    if (!userVerified) {
        res.status(404).json({
            alert: "Usuario no registrado",
        });
        return;
    }
    try {
        const userId = userVerified._id;
        const orderNumber = yield orders_1.default.countDocuments();
        const order = new orders_1.default({
            orderNumber: orderNumber + 1,
            user: userId,
            cellphone,
            direction,
            city,
            postalCode,
            state,
            total,
            products,
            status: "pending",
            createdAt: new Date(),
        });
        yield order.save();
        res.status(201).json({
            message: "Orden creada correctamente",
            data: order,
        });
    }
    catch (error) {
        console.error(error);
        res.status(500).send("Error del servidor");
    }
});
exports.createOrder = createOrder;
const deleteOrder = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { _id } = req.params;
        const deletedOrder = yield orders_1.default.findByIdAndDelete(_id);
        if (!deletedOrder) {
            return res.status(404).json({
                message: 'Orden no encontrada'
            });
        }
        res.json({
            message: 'Orden eliminada correctamente',
        });
    }
    catch (error) {
        console.error(error);
        res.status(500).send("Error del servidor");
    }
});
exports.deleteOrder = deleteOrder;
const orderStatusChange = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { _id } = req.params;
    const order = yield orders_1.default.findById(_id);
    const statusOrder = order === null || order === void 0 ? void 0 : order.status;
    if (statusOrder === 'pending') {
        const { status } = req.body;
        try {
            let order = yield orders_1.default.findById(_id);
            if (!order) {
                return res.status(404).json({
                    message: "Order not found",
                });
            }
            let updatedOrder;
            if (status === 'canceled') {
                const orderCanceled = yield orders_1.default.findByIdAndUpdate(_id, { status: "canceled" }, { new: true });
                res.status(200).json({
                    alert: "La orden fue cancelada",
                    order: orderCanceled === null || orderCanceled === void 0 ? void 0 : orderCanceled.status
                });
                return;
            }
            if (status === 'paid') {
                updatedOrder = yield orders_1.default.findByIdAndUpdate(_id, { status: "paid" }, { new: true, updatedAt: new Date() });
                if (!updatedOrder) {
                    throw new Error('Order not found');
                }
                const orderDetails = yield orders_1.default.findById(updatedOrder === null || updatedOrder === void 0 ? void 0 : updatedOrder._id);
                const user = yield users_1.default.findById(orderDetails === null || orderDetails === void 0 ? void 0 : orderDetails.user);
                const userEmail = user === null || user === void 0 ? void 0 : user.email;
                const orderStatus = updatedOrder === null || updatedOrder === void 0 ? void 0 : updatedOrder.status;
                res.status(200).json({
                    alert: "Order status updated",
                    order: updatedOrder
                });
            }
        }
        catch (error) {
            console.error(error);
            res.status(500).send("Server Error");
        }
    }
    if (statusOrder === 'paid') {
        res.status(200).json({
            alert: "La orden ya fue pagada"
        });
    }
});
exports.orderStatusChange = orderStatusChange;
const getOrdersByUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { _id } = req.params;
        const userData = yield users_1.default.findById(_id);
        console.log(userData);
        if (!userData) {
            return res.status(404).json({
                message: 'Usuario no encontrado',
            });
        }
        const orders = yield orders_1.default.find({ user: userData._id });
        console.log(orders);
        if (orders.length <= 0) {
            res.status(404).json({
                message: 'No se encontraron órdenes para este usuario.',
            });
        }
        res.json({ orders });
    }
    catch (error) {
        console.error(error);
        res.status(500).send("Error del servidor");
    }
});
exports.getOrdersByUser = getOrdersByUser;
