import { Router } from "express";
import { check } from "express-validator";
import { createOrder, deleteAllOrders, deleteOrder, getOrders, getOrderById } from "../controllers/orders";
import { errorHandler } from "../middlewares/errores";

const orderRoutes = Router();

orderRoutes.get("/get",errorHandler, getOrders);
orderRoutes.post("/create",[
    check('name', 'El nombre es obligatorio').not().isEmpty(),
    check('cellphone', 'El celular es obligatorio').not().isEmpty(),
    check('email', 'El email es obligatorio').not().isEmpty(),
    check('direction', 'La direccion es obligatoria').not().isEmpty(),
    check('city', 'La ciudad es obligatoria').not().isEmpty(),
    check('state', 'El estado es obligatorio').not().isEmpty(),
    check('postalCode', 'El codigo postal es obligatorio').not().isEmpty(),
    check('products', 'Los productos son obligatorios').not().isEmpty(),
],errorHandler, createOrder)
orderRoutes.delete("/delete/:id",errorHandler, deleteOrder)
orderRoutes.delete("/deleteall",errorHandler, deleteAllOrders)
orderRoutes.post("/status/:id",[
    check('status', 'El estado es obligatorio').not().isEmpty(),
],errorHandler, getOrderById)

export default orderRoutes;