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
exports.getProovedores = exports.createProovedor = void 0;
const proovedor_1 = __importDefault(require("../models/proovedor"));
const createProovedor = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { name, email, phone } = req.body;
    const newProovedor = new proovedor_1.default({ name, email, phone });
    if (!name || !email || !phone) {
        res.status(400).json({
            message: "Faltan Datos"
        });
    }
    yield newProovedor.save();
    res.status(201).json({
        msg: "Proovedor Creaco con exito",
        proovedor: proovedor_1.default
    });
});
exports.createProovedor = createProovedor;
const getProovedores = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const proovedores = yield proovedor_1.default.find();
    res.status(200).json(proovedores);
});
exports.getProovedores = getProovedores;
