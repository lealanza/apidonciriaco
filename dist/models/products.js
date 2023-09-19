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
const productSchema = new mongoose_1.Schema({
    title: { type: String, required: true },
    price: { type: Number, required: true },
    ganancia: { type: Number, required: true },
    stock: { type: Number, required: true },
    description: { type: String, required: true },
    category: { type: String, required: true },
    images: [{ filename: String, path: String }],
    date: { type: Date, default: Date.now },
});
productSchema.methods.toJSON = function () {
    const _a = this.toObject(), { __v, date } = _a, product = __rest(_a, ["__v", "date"]);
    return product;
};
const Product = (0, mongoose_1.model)('Product', productSchema);
exports.default = Product;
