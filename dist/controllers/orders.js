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
exports.getOrderById = exports.deleteOrder = exports.createOrder = exports.getOrders = void 0;
const orders_1 = __importDefault(require("../models/orders"));
const users_1 = __importDefault(require("../models/users"));
const mailers_1 = require("../mailers/mailers");
const products_1 = __importDefault(require("../models/products"));
const getOrders = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const orders = yield orders_1.default.find();
    res.json(orders);
});
exports.getOrders = getOrders;
const createOrder = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { cellphone, email, direction, city, postalCode, state, products, status, total, } = req.body;
    const userVerified = yield users_1.default.findOne({ email });
    if (!userVerified) {
        res.status(404).json({
            alert: "Usuario no registrado",
        });
        return;
    }
    const productsDetails = yield products_1.default.find({ title: { $in: products.map((p) => p.title) } });
    if (!productsDetails || productsDetails.length !== products.length || (productsDetails.some((p) => p.stock <= 0))) {
        res.status(404).json({
            alert: "Uno o más productos no encontrados",
        });
        return;
    }
    try {
        const userId = userVerified._id;
        const userName = userVerified.name;
        const orderProducts = products.map((product) => {
            const foundProduct = productsDetails.find((p) => p.title === product.title);
            const totalPrice = (foundProduct === null || foundProduct === void 0 ? void 0 : foundProduct.price) * product.quantity;
            return {
                product: foundProduct ? foundProduct._id : undefined,
                quantity: product.quantity,
                totalPrice,
            };
        });
        const orderNumer = yield orders_1.default.countDocuments();
        const orderTotal = orderProducts.reduce((acc, curr) => acc + curr.totalPrice, 0);
        const order = new orders_1.default({
            orderNumber: orderNumer + 1,
            user: userId,
            cellphone,
            direction,
            city,
            postalCode,
            state,
            total: orderTotal,
            products: orderProducts,
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
        const id = req.params.id;
        const deletedOrder = yield orders_1.default.findByIdAndDelete(id);
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
const getOrderById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const order = yield orders_1.default.findById(id);
    const statusOrder = order === null || order === void 0 ? void 0 : order.status;
    if (statusOrder === 'pending') {
        const { status } = req.body;
        try {
            let order = yield orders_1.default.findById(id);
            if (!order) {
                return res.status(404).json({
                    message: "Order not found",
                });
            }
            let updatedOrder;
            if (status === 'canceled') {
                const orderCanceled = yield orders_1.default.findByIdAndUpdate(id, { status: "canceled" }, { new: true });
                res.status(200).json({
                    alert: "La orden fue cancelada",
                    order: orderCanceled === null || orderCanceled === void 0 ? void 0 : orderCanceled.status
                });
                return;
            }
            if (status === 'paid') {
                updatedOrder = yield orders_1.default.findByIdAndUpdate(id, { status: "paid" }, { new: true, updatedAt: new Date() });
                if (!updatedOrder) {
                    throw new Error('Order not found');
                }
                const orderDetails = yield orders_1.default.findById(updatedOrder === null || updatedOrder === void 0 ? void 0 : updatedOrder._id);
                const user = yield users_1.default.findById(orderDetails === null || orderDetails === void 0 ? void 0 : orderDetails.user);
                const userEmail = user === null || user === void 0 ? void 0 : user.email;
                const orderStatus = updatedOrder === null || updatedOrder === void 0 ? void 0 : updatedOrder.status;
                (0, mailers_1.sendEmailConfirmed)(userEmail, updatedOrder);
                const productIds = updatedOrder === null || updatedOrder === void 0 ? void 0 : updatedOrder.products.map((p) => p.product);
                const quantities = updatedOrder === null || updatedOrder === void 0 ? void 0 : updatedOrder.products.map((p) => p.quantity);
                if (productIds && quantities && productIds.length === quantities.length) {
                    const updates = [];
                    for (let i = 0; i < productIds.length; i++) {
                        const productId = productIds[i];
                        const quantity = quantities[i];
                        updates.push(products_1.default.findByIdAndUpdate(productId, { $inc: { stock: -quantity } }).exec());
                    }
                    yield Promise.all(updates);
                }
            }
            res.status(200).json({
                alert: "Order status updated",
                order: updatedOrder
            });
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
exports.getOrderById = getOrderById;
