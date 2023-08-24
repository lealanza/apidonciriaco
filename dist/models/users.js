"use strict";
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const userSchema = new mongoose_1.Schema({
    userName: { type: String, required: [true, 'El nombre de usuario es requerido'] },
    email: { type: String, required: [true, 'El correo es requerido'], unique: true },
    password: { type: String, required: [true, 'La contraseña es requerida'] },
    name: { type: String, required: [true, 'El nombre es requerido'] },
    lastName: { type: String, required: [true, 'El apellido es requerido'] },
    code: { type: String },
    role: { type: Boolean, default: false },
    verified: { type: Boolean, default: false }
}, { timestamps: true });
userSchema.methods.toJSON = function () {
    const _a = this.toObject(), { __v, password, code } = _a, user = __rest(_a, ["__v", "password", "code"]);
    return user;
};
const User = (0, mongoose_1.model)('User', userSchema);
exports.default = User;
