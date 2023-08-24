"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const express_validator_1 = require("express-validator");
const categories_1 = require("../controllers/categories");
const errores_1 = require("../middlewares/errores");
const categoryRoutes = (0, express_1.Router)();
categoryRoutes.post('/create', [
    (0, express_validator_1.check)('name', 'El nombre es obligatorio').not().isEmpty(),
    (0, express_validator_1.check)('description', 'La descripcion es obligatoria').not().isEmpty(),
], errores_1.errorHandler, categories_1.createCategoy);
categoryRoutes.get('/get', errores_1.errorHandler, categories_1.getCategories);
exports.default = categoryRoutes;
