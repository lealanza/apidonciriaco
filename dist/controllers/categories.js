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
Object.defineProperty(exports, "__esModule", { value: true });
exports.getCategories = exports.createCategoy = void 0;
const categories_1 = require("../models/categories");
const createCategoy = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { name, description } = req.body;
    try {
        const category = new categories_1.Category({ name, description });
        yield category.save();
        res.status(201).json({ category });
    }
    catch (error) {
        res.status(500).send('Error del servidor');
    }
});
exports.createCategoy = createCategoy;
const getCategories = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const categories = yield categories_1.Category.find();
        res.status(200).json(categories);
    }
    catch (error) {
        res.status(500).send('Error del servidor');
    }
});
exports.getCategories = getCategories;
