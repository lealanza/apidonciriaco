"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const products_1 = require("../controllers/products");
const errores_1 = require("../middlewares/errores");
const multer_1 = __importDefault(require("../lib/multer"));
const productRoutes = (0, express_1.default)();
productRoutes.post("/create", multer_1.default.array('image'), errores_1.errorHandler, products_1.createProduct);
productRoutes.get("/get", products_1.getProducts);
productRoutes.get("/:_id", products_1.getProductsById);
productRoutes.delete("/delete/:id", products_1.deleteProduct);
productRoutes.patch("/update/:id", errores_1.errorHandler, products_1.updateProduct);
productRoutes.get('/category', errores_1.errorHandler, products_1.getProductsByCategory);
exports.default = productRoutes;
