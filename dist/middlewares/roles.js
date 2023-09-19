"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.isAdmin = void 0;
const roles_1 = require("../helpers/roles");
const isAdmin = (req, res, next) => {
    const { role } = req.body.userConfirmed;
    if (role !== roles_1.ROLES.admin) {
        res.status(401).json({
            message: 'Usuario no autorizado, tienes que ser administrador'
        });
        return;
    }
    next();
};
exports.isAdmin = isAdmin;
