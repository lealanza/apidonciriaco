"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const express_validator_1 = require("express-validator");
const products_1 = require("../controllers/products");
const errores_1 = require("../middlewares/errores");
const productRoutes = (0, express_1.default)();
productRoutes.post("/create", [
    (0, express_validator_1.check)('title', 'El titulo es obligatorio').not().isEmpty(),
    (0, express_validator_1.check)('price', 'El precio es obligatorio').not().isEmpty(),
    (0, express_validator_1.check)('description', 'La descripcion es obligatoria').not().isEmpty(),
    (0, express_validator_1.check)('ganancia', 'La ganancia es obligatoria').not().isEmpty(),
    (0, express_validator_1.check)('category', 'La categoria es obligatoria').not().isEmpty(),
    (0, express_validator_1.check)('stock', 'El stock es obligatorio').not().isEmpty(),
], errores_1.errorHandler, products_1.createProduct);
productRoutes.get("/get", products_1.getProducts);
productRoutes.delete("/delete/:id", products_1.deleteProduct);
productRoutes.patch("/update/:id", [
    (0, express_validator_1.check)('price', 'El precio es obligatorio').not().isEmpty(),
    (0, express_validator_1.check)('description', 'La descripcion es obligatoria').not().isEmpty(),
    (0, express_validator_1.check)('ganancia', 'La ganancia es obligatoria').not().isEmpty(),
    (0, express_validator_1.check)('stock', 'El stock es obligatorio').not().isEmpty(),
], errores_1.errorHandler, products_1.updateProduct);
productRoutes.get('/category', [
    (0, express_validator_1.check)('name', 'El nombre de la categoria es obligatorio').not().isEmpty(),
], errores_1.errorHandler, products_1.getProductsByCategory);
exports.default = productRoutes;
