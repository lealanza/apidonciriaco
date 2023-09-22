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
exports.Server = void 0;
const express_1 = __importDefault(require("express"));
const config_1 = require("../lib/config");
const user_1 = __importDefault(require("../router/user"));
const orders_1 = __importDefault(require("../router/orders"));
const products_1 = __importDefault(require("../router/products"));
const categories_1 = __importDefault(require("../router/categories"));
const cors_1 = __importDefault(require("cors"));
const path_1 = __importDefault(require("path"));
class Server {
    constructor() {
        this.app = (0, express_1.default)();
        this.start();
        this.middlewares();
        this.createUser = "/user";
        this.order = "/order";
        this.product = "/product";
        this.category = "/category";
        this.router();
    }
    start() {
        return __awaiter(this, void 0, void 0, function* () {
            yield (0, config_1.conectDB)();
        });
    }
    middlewares() {
        this.app.use(express_1.default.json());
        this.app.use((0, cors_1.default)({ origin: '*' }));
        this.app.use('/uploads', express_1.default.static(path_1.default.resolve('uploads')));
    }
    router() {
        this.app.use(this.createUser, user_1.default);
        this.app.use(this.order, orders_1.default);
        this.app.use(this.product, products_1.default);
        this.app.use(this.category, categories_1.default);
    }
    listen() {
        this.app.listen(process.env.PORT, () => {
            console.log(`Server on port ${process.env.PORT}`);
        });
    }
}
exports.Server = Server;
