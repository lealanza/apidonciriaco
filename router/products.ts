import Router from "express";
import multer from "multer";
import { createProduct, deleteProduct, getProducts,getProductsById, getProductsByCategory, updateProduct } from "../controllers/products";
import { errorHandler } from "../middlewares/errores";

const productRoutes = Router();

productRoutes.post("/create",errorHandler, createProduct);
productRoutes.get("/get", getProducts)
productRoutes.get("/:_id", getProductsById)

productRoutes.delete("/delete/:id", deleteProduct)
productRoutes.patch("/update/:id",errorHandler, updateProduct)
productRoutes.get('/category',errorHandler, getProductsByCategory)
export default productRoutes; 