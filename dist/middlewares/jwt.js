"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const users_1 = __importDefault(require("../models/users"));
const validationJWT = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const token = req.headers['x-token'];
    if (!token) {
        res.status(401).json({
            msg: 'No hay token en la peticion'
        });
        return;
    }
    try {
        const keySecret = process.env.SECRET_KEY;
        const payload = jsonwebtoken_1.default.verify(token, keySecret);
        const { id } = payload;
        const userConfirmed = yield users_1.default.findById(id);
        if (!userConfirmed) {
            res.status(401).json({
                msg: 'Token no valido'
            });
            return;
        }
        req.body.userConfirmed = userConfirmed;
        next();
    }
    catch (error) {
        console.log(error);
        res.status(401).json({
            msg: 'Token no valido'
        });
    }
});
exports.default = validationJWT;
