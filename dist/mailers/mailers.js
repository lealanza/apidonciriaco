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
exports.sendEmailAccountVerified = exports.sendEmailConfirmed = exports.sendEamilLogin = exports.sendEmail = void 0;
const nodemailer_1 = __importDefault(require("nodemailer"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const sendEmail = (to, name, code) => __awaiter(void 0, void 0, void 0, function* () {
    const transporter = nodemailer_1.default.createTransport({
        service: 'gmail',
        auth: {
            user: process.env.EMAIL_USER,
            pass: process.env.EMAIL_PASS,
        },
    });
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
const sendEamilLogin = (to, name) => __awaiter(void 0, void 0, void 0, function* () {
    const transporter = nodemailer_1.default.createTransport({
        service: 'gmail',
        auth: {
            user: process.env.EMAIL_USER,
            pass: process.env.EMAIL_PASS,
        },
    });
    try {
        const mailOptions = {
            from: '"Leandro Lanza" lanza.le4ndr0@gmail.com',
            to,
            subject: "Nuevo inicio de sesion",
            text: `
            Hola ${name}, has iniciado sesion correctamente.
            Hora ${new Date().toString()}
            `
        };
        yield transporter.sendMail(mailOptions);
    }
    catch (_a) {
        console.error("Error al enviar el correo");
    }
});
exports.sendEamilLogin = sendEamilLogin;
const sendEmailConfirmed = (to, order) => __awaiter(void 0, void 0, void 0, function* () {
    const transporter = nodemailer_1.default.createTransport({
        service: 'gmail',
        auth: {
            user: process.env.EMAIL_USER,
            pass: process.env.EMAIL_PASS,
        },
    });
    try {
        const mailOptions = {
            from: '"Leandro Lanza" lanza.le4ndr0@gmail.com',
            to,
            subject: "Has confirmado tu pedido",
            text: `
            Hola has confirmado tu pedido.
            Pedido numero: ${order.orderNumber}.
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
const sendEmailAccountVerified = (to, name) => __awaiter(void 0, void 0, void 0, function* () {
    const transporter = nodemailer_1.default.createTransport({
        service: 'gmail',
        auth: {
            user: process.env.EMAIL_USER,
            pass: process.env.EMAIL_PASS,
        },
    });
    try {
        const mailOptions = {
            from: '"Leandro Lanza" XXXXXXXXXXXXXXXXXXXXXXX',
            to,
            subject: "Cuenta verificada",
            text: `
            Hola ${name}, tu cuenta fue verificada.
            `
        };
        yield transporter.sendMail(mailOptions);
    }
    catch (error) {
        console.error("Error al enviar el correo ", error);
    }
});
exports.sendEmailAccountVerified = sendEmailAccountVerified;
