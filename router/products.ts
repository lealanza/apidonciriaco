import Router from "express";
import { check } from "express-validator";
import { createProduct, deleteProduct, getProducts, getProductsByCategory, updateProduct } from "../controllers/products";
import { errorHandler } from "../middlewares/errores";

const productRoutes = Router();

productRoutes.post("/create",errorHandler, createProduct);
productRoutes.get("/get", getProducts)
productRoutes.delete("/delete/:id", deleteProduct)
productRoutes.patch("/update/:id",errorHandler, updateProduct)
productRoutes.get('/category',errorHandler, getProductsByCategory)
export default productRoutes;