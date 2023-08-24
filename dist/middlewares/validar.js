"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.isVerfiied = void 0;
const isVerfiied = (req, res, next) => {
    const { verified } = req.body.usuarioConfirmado;
    if (!verified) {
        res.status(401).json({
            message: "Usuario no verificado"
        });
        return;
    }
    next();
};
exports.isVerfiied = isVerfiied;
