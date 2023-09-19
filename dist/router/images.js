"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const image_1 = require("../controllers/image");
const imagesRoute = (0, express_1.Router)();
imagesRoute.post("/upload", image_1.chargeImage);
