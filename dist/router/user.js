"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const express_validator_1 = require("express-validator");
const user_1 = require("../controllers/user");
const validationDb_1 = require("../helpers/validationDb");
const errores_1 = require("../middlewares/errores");
const userRoutes = (0, express_1.Router)();
userRoutes.post("/create", [(0, express_validator_1.check)('userName', 'El nombre de usuario es obligatorio').not().isEmpty(),
    (0, express_validator_1.check)('email', 'El email es obligatorio').not().isEmpty().normalizeEmail().isEmail(),
    (0, express_validator_1.check)('password', 'La contraseña debe tener al menos 6 caracteres').not().isEmpty(),
    (0, express_validator_1.check)('name', 'El nombre es obligatorio').not().isEmpty(),
    (0, express_validator_1.check)('lastName', 'El apellido es obligatorio').not().isEmpty(),
    (0, express_validator_1.check)('email').custom(validationDb_1.existingEmail)], errores_1.errorHandler, user_1.createUser);
userRoutes.patch('/verified', [
    (0, express_validator_1.check)('email', 'El email es obligatorio').not().isEmpty().normalizeEmail().isEmail(),
    (0, express_validator_1.check)('code', 'El codigo es obligatorio').not().isEmpty(),
], errores_1.errorHandler, user_1.verifiedUser);
userRoutes.post('/login', [
    (0, express_validator_1.check)('email', 'El email es obligatorio').not().isEmpty().normalizeEmail().isEmail(),
    (0, express_validator_1.check)('password', 'La contraseña debe tener al menos 6 caracteres').not().isEmpty()
], errores_1.errorHandler, user_1.login);
userRoutes.get('/get', errores_1.errorHandler, user_1.getUser);
userRoutes.delete('/delete/', errores_1.errorHandler, user_1.deleteUser);
userRoutes.patch('/reset', [
    (0, express_validator_1.check)('email', 'El email es obligatorio').not().isEmpty().normalizeEmail().isEmail(),
    (0, express_validator_1.check)('password', 'La contraseña debe tener al menos 6 caracteres').not().isEmpty(),
], errores_1.errorHandler, user_1.resetPassword);
exports.default = userRoutes;
