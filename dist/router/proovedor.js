"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const proovedor_1 = require("../controllers/proovedor");
const proovedorRoutes = (0, express_1.Router)();
proovedorRoutes.get("/get", proovedor_1.getProovedores);
proovedorRoutes.post("/create", proovedor_1.createProovedor);
exports.default = proovedorRoutes;
