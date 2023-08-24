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
exports.resetPassword = exports.verifiedUser = exports.login = exports.deleteUser = exports.getUser = exports.createUser = void 0;
const users_1 = __importDefault(require("../models/users"));
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const randomstring_1 = __importDefault(require("randomstring"));
const mailers_1 = require("../mailers/mailers");
const generateToken_1 = require("../helpers/generateToken");
const createUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const userData = new users_1.default(req.body);
    const { userName, email, password, name, lastName } = userData;
    if (!userName || !email || !password || !name || !lastName) {
        return res.status(400).json({
            message: "Faltan Datos"
        });
    }
    const emailExist = yield users_1.default.findOne({ email });
    if (emailExist) {
        return res.status(400).json({
            message: "El email ya existe"
        });
    }
    const salt = bcryptjs_1.default.genSaltSync();
    userData.password = bcryptjs_1.default.hashSync(password, salt);
    const adminKey = req.headers["admin-key"];
    if (adminKey === "admin") {
        userData.role = true;
    }
    const newCode = randomstring_1.default.generate(6);
    userData.code = newCode;
    const newUser = new users_1.default(userData);
    yield newUser.save();
    yield (0, mailers_1.sendEmail)(email, userName, newCode);
    res.json({
        message: "Usuario Creado",
        newUser,
    });
});
exports.createUser = createUser;
const getUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const users = yield users_1.default.find();
    res.json({
        users
    });
});
exports.getUser = getUser;
const deleteUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { email } = req.body;
        const userDelete = yield users_1.default.findOne({ email });
        if (!userDelete) {
            return res.status(400).json({
                message: "El usuario no existe"
            });
        }
        const user = yield users_1.default.findOneAndDelete({ userDelete });
        (0, mailers_1.sendEmailDeleteAcount)(email);
        res.json({
            message: "Usuario Eliminado"
        });
        if (!user) {
            return res.status(400).json({
                message: "El usuario no existe"
            });
        }
    }
    catch (error) {
        res.status(500).json({
            message: "Error al eliminar usuario"
        });
    }
});
exports.deleteUser = deleteUser;
const login = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { email, password } = req.body;
    try {
        const user = yield users_1.default.findOne({ email });
        if (!user) {
            res.status(400).json({
                message: "El usuario no existe"
            });
            return;
        }
        const validPassword = bcryptjs_1.default.compareSync(password, user.password);
        if (!validPassword) {
            res.status(400).json({
                message: "Contraseña incorrecta"
            });
            return;
        }
        const token = yield (0, generateToken_1.generateToken)(user.id);
        (0, mailers_1.sendEmailLogin)(email, user.userName);
        res.json({
            message: "Login Correcto",
            user,
            token
        });
    }
    catch (error) {
        console.log(error);
        res.status(500).json({
            message: "Error al logearse"
        });
    }
});
exports.login = login;
const verifiedUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { email, code } = req.body;
    try {
        const user = yield users_1.default.findOne({ email });
        if (!user) {
            return res.status(400).json({
                message: "El usuario no existe"
            });
            return;
        }
        if (user.verified) {
            res.status(400).json({
                message: "El usuario ya esta verificado"
            });
            return;
        }
        if (user.code !== code) {
            return res.status(400).json({
                msg: "El codigo es incorrecto"
            });
        }
        const userAuth = yield users_1.default.findOneAndUpdate({ email }, { verified: true });
        res.status(200).json({
            msg: "Usuario verificado con existo"
        });
    }
    catch (error) {
        console.log(error);
        res.status(500).json({
            message: "Error al verificar usuario"
        });
    }
});
exports.verifiedUser = verifiedUser;
const resetPassword = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { email, password } = req.body;
    const salt = bcryptjs_1.default.genSaltSync();
    const newPassword = bcryptjs_1.default.hashSync(password, salt);
    try {
        const user = yield users_1.default.findOneAndUpdate({ email }, { password: newPassword });
        (0, mailers_1.sendEmailResetPassword)(email, password);
        res.status(200).json({
            message: "Contraseña cambiada con exito"
        });
    }
    catch (error) {
        console.log(error);
        res.status(500).json({
            message: "Error al cambiar contraseña"
        });
    }
});
exports.resetPassword = resetPassword;
