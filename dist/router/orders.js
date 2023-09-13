"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const express_validator_1 = require("express-validator");
const orders_1 = require("../controllers/orders");
const errores_1 = require("../middlewares/errores");
const orderRoutes = (0, express_1.Router)();
orderRoutes.get("/get", errores_1.errorHandler, orders_1.getOrders);
orderRoutes.post("/create", errores_1.errorHandler, orders_1.createOrder);
orderRoutes.delete("/delete/:id", errores_1.errorHandler, orders_1.deleteOrder);
orderRoutes.post("/status/:id", [
    (0, express_validator_1.check)('status', 'El estado es obligatorio').not().isEmpty(),
], errores_1.errorHandler, orders_1.getOrderById);
orderRoutes.get("/user/:_id", errores_1.errorHandler, orders_1.getOrdersByUser);
exports.default = orderRoutes;
