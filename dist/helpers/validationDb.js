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
exports.existingEmail = void 0;
const mailers_1 = require("../mailers/mailers");
const users_1 = __importDefault(require("../models/users"));
const existingEmail = (email) => __awaiter(void 0, void 0, void 0, function* () {
    const existEmail = yield users_1.default.findOne({ email });
    if (existEmail && existEmail.verified) {
        throw new Error(`${email} already exist`);
    }
    if (existEmail && !existEmail.verified) {
        yield (0, mailers_1.sendEmail)(email, existEmail.name, existEmail.code);
        throw new Error("Email already exist but not verified");
    }
});
exports.existingEmail = existingEmail;
