import { Router } from "express";
import { check } from "express-validator";
import { createOrder, deleteOrder, getOrders, getOrderById, getOrdersByUser } from "../controllers/orders";
import { errorHandler } from "../middlewares/errores";

const orderRoutes = Router();

orderRoutes.get("/get",errorHandler, getOrders);
orderRoutes.post("/create",errorHandler, createOrder)
orderRoutes.delete("/delete/:id",errorHandler, deleteOrder)
orderRoutes.post("/status/:id",[
    check('status', 'El estado es obligatorio').not().isEmpty(),
],errorHandler, getOrderById)
orderRoutes.get("/user/:_id",errorHandler, getOrdersByUser)
export default orderRoutes;