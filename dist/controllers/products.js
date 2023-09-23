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
exports.getProductsByCategory = exports.updateProduct = exports.deleteProduct = exports.getProductsById = exports.getProducts = exports.createProduct = void 0;
const products_1 = __importDefault(require("../models/products"));
const categories_1 = require("../models/categories");
const cloudinary_1 = require("../lib/cloudinary");
const createProduct = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    const { title, price, ganancia, stock, description, category } = req.body;
    try {
        const product = new products_1.default({
            title,
            price,
            ganancia,
            stock,
            description,
            category,
        });
        if ((_a = req.files) === null || _a === void 0 ? void 0 : _a.image) {
            const result = yield (0, cloudinary_1.uploadImages)(req.files.image.tempFilePath);
            product.images = {
                public_id: result.public_id,
                url: result.secure_url,
                path: result.path,
                secure_url: result.secure_url
            };
            // await fs.unlink(req.files.image.tempFilePath)
        }
        yield product.save();
        res.status(201).json({
            product
        });
    }
    catch (error) {
        console.error(error);
        res.status(500).send(`Error del servidor`);
    }
});
exports.createProduct = createProduct;
const getProducts = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const products = yield products_1.default.find();
        res.status(200).json(products);
    }
    catch (error) {
        console.error(error);
        res.status(500).send("Error del servidor");
    }
});
exports.getProducts = getProducts;
const getProductsById = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { _id } = req.params;
        const product = yield products_1.default.findById(_id);
        if (!product) {
            res.status(404).json({ msg: "Producto no encontrado" });
            return;
        }
        res.status(200).json({ product });
    }
    catch (error) {
        return next(error);
    }
});
exports.getProductsById = getProductsById;
const deleteProduct = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const product = yield products_1.default.findByIdAndDelete(id);
        if (!product) {
            res.status(404).json({ msg: "Producto no encontrado" });
            return;
        }
        res.status(200).json({ msg: "Producto eliminado" });
    }
    catch (error) {
        console.error(error);
        res.status(500).send("Error del servidor");
    }
});
exports.deleteProduct = deleteProduct;
const updateProduct = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const { price, ganancia, finalPrice, stock, description } = req.body;
        const product = yield products_1.default.findByIdAndUpdate(id, {
            price,
            ganancia,
            finalPrice,
            stock,
            description,
        }, { new: true });
        if (!product) {
            res.status(404).json({ msg: "Producto no encontrado" });
        }
        res.status(200).json({
            msg: "Producto actualizado",
            product
        });
    }
    catch (error) {
        res.status(500).send("Error del servidor");
    }
});
exports.updateProduct = updateProduct;
const getProductsByCategory = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { name } = req.body;
        const categoryDetails = yield categories_1.Category.findOne({ name: name });
        if (!categoryDetails) {
            res.status(404).json({ message: 'Categoría no encontrada' });
            return;
        }
        const productsInCategory = yield products_1.default.find({ category: categoryDetails._id })
            .populate('category'); // Esto popula los detalles de la categoría en cada producto
        res.status(200).json({ products: productsInCategory });
    }
    catch (error) {
        console.error(error);
        res.status(500).send("Error del servidor");
    }
});
exports.getProductsByCategory = getProductsByCategory;
