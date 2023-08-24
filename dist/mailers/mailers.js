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
exports.sendEmailConfirmed = exports.sendEmailLogin = exports.sendEmailResetPassword = exports.sendEmail = void 0;
const nodemailer_1 = __importDefault(require("nodemailer"));
const transporter = nodemailer_1.default.createTransport({
    service: 'gmail',
    auth: {
        user: 'lanza.le4ndr0@gmail.com',
        pass: 'khwgmfrieibnhuim'
    },
    from: 'lanza.le4ndr0@gmail.com'
});
const sendEmail = (to, name, code) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const mailOptions = {
            from: '"Leandro Lanza" lanza.le4ndr0@gmail.com',
            to,
            subject: "Codigo de verificacion de cuenta",
            text: `
            Hola ${name}, te enviamos este codigo de verificacion: ${code}.
            
            `
        };
        yield transporter.sendMail(mailOptions);
        console.log('Email enviado');
    }
    catch (error) {
        console.error("Error al enviar el correo", error);
    }
});
exports.sendEmail = sendEmail;
const sendEmailResetPassword = (to, password) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const mailOptions = {
            from: '"Leandro Lanza" lanza.le4ndr0@gmail.com',
            to,
            subject: "Has solicitado cambiar tu contraseña",
            text: `
            Hola has cambiado tu contraseña.
            Tu nueva contraseña es: ${password}.`
        };
        yield transporter.sendMail(mailOptions);
    }
    catch (error) {
        console.error("Error al enviar el correo", error);
    }
});
exports.sendEmailResetPassword = sendEmailResetPassword;
const sendEmailLogin = (to, name, location) => __awaiter(void 0, void 0, void 0, function* () {
    var _a, _b;
    try {
        const mailOptions = {
            from: '"Leandro Lanza" lanza.le4ndr0@gmail.com',
            to,
            subject: "Has iniciado sesion",
            text: `
            Hola ${name}, has iniciado sesion. ${new Date().toString()}.
            Ubicacion: Latitude is ${(_a = location === null || location === void 0 ? void 0 : location.latitude) !== null && _a !== void 0 ? _a : 'unknown'}, Longitude is ${(_b = location === null || location === void 0 ? void 0 : location.longitude) !== null && _b !== void 0 ? _b : 'unknown'}.`
        };
        yield transporter.sendMail(mailOptions);
    }
    catch (error) {
        console.error("Error al enviar el correo de inicio de sesion ", error);
    }
});
exports.sendEmailLogin = sendEmailLogin;
const sendEmailConfirmed = (to, order) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const mailOptions = {
            from: '"Leandro Lanza" XXXXXXXXXXXXXXXXXXXXXXX',
            to,
            subject: "Has confirmado tu pedido",
            text: `
            Hola has confirmado tu pedido.
            el pedido ya se encuentra ${(order.status === 'paid') ? 'confirmado' : ''}
            fecha: ${order.updatedAt.toString()}.
            `
        };
        yield transporter.sendMail(mailOptions);
    }
    catch (error) {
        console.error("Error al enviar el correo de confirmacion ", error);
    }
});
exports.sendEmailConfirmed = sendEmailConfirmed;
