import { Router } from "express";
import { createOrder, deleteOrder, getOrders,orderStatusChange, getOrdersByUser } from "../controllers/orders";
import { errorHandler } from "../middlewares/errores";

const orderRoutes = Router();

orderRoutes.get("/get",errorHandler, getOrders);
orderRoutes.post("/create/:_id",errorHandler, createOrder)
orderRoutes.delete("/delete/:_id",errorHandler, deleteOrder)
orderRoutes.post("/status/:_id",errorHandler, orderStatusChange)
orderRoutes.get("/user/:_id",errorHandler, getOrdersByUser)
export default orderRoutes;