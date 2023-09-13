import Router from "express";
import { check } from "express-validator";
import { createProduct, deleteProduct, getProducts, getProductsByCategory, updateProduct } from "../controllers/products";
import { errorHandler } from "../middlewares/errores";

const productRoutes = Router();

productRoutes.post("/create",[
    check('title', 'El titulo es obligatorio').not().isEmpty(),
    check('price', 'El precio es obligatorio').not().isEmpty(),
    check('description', 'La descripcion es obligatoria').not().isEmpty(),
    check('ganancia','La ganancia es obligatoria').not().isEmpty(),
    check('category', 'La categoria es obligatoria').not().isEmpty(),
    check('stock', 'El stock es obligatorio').not().isEmpty(),
],errorHandler, createProduct);
productRoutes.get("/get", getProducts)
productRoutes.delete("/delete/:id", deleteProduct)
productRoutes.patch("/update/:id",[
    check('price', 'El precio es obligatorio').not().isEmpty(),
    check('description', 'La descripcion es obligatoria').not().isEmpty(),
    check('ganancia','La ganancia es obligatoria').not().isEmpty(),
    check('stock', 'El stock es obligatorio').not().isEmpty(),
],errorHandler, updateProduct)
productRoutes.get('/category',[
    check('name', 'El nombre de la categoria es obligatorio').not().isEmpty(),
],errorHandler, getProductsByCategory)
export default productRoutes;