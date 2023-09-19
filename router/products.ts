import Router from "express";
import { createProduct, deleteProduct, getProducts, getProductsByCategory, updateProduct } from "../controllers/products";
import { errorHandler } from "../middlewares/errores";
import multer from '../lib/multer'
const productRoutes = Router();

productRoutes.post("/create",multer.array('image',5),errorHandler, createProduct);
productRoutes.get("/get", getProducts)
productRoutes.delete("/delete/:id", deleteProduct)
productRoutes.patch("/update/:id",errorHandler, updateProduct)
productRoutes.get('/category',errorHandler, getProductsByCategory)
export default productRoutes;