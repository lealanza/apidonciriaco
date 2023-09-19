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
exports.deleteImages = exports.uploadImages = void 0;
const cloudinary_1 = require("cloudinary");
cloudinary_1.v2.config({
    cloud_name: 'ddyg4xvws',
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
    secure: true,
});
function uploadImages(filePath) {
    return __awaiter(this, void 0, void 0, function* () {
        return yield cloudinary_1.v2.uploader.upload(filePath, {
            folder: 'replit'
        });
    });
}
exports.uploadImages = uploadImages;
function deleteImages(public_id) {
    return __awaiter(this, void 0, void 0, function* () {
        return yield cloudinary_1.v2.uploader.destroy(public_id);
    });
}
exports.deleteImages = deleteImages;
