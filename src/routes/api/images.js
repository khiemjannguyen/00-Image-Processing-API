"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const createResizedImage_1 = __importDefault(require("../../utilities/createResizedImage"));
const images = express_1.default.Router();
images.get("/", (req, res) => {
    res.send("Image route");
    try {
        const fileName = req.query.filename;
        const height = req.query.height;
        const width = req.query.width;
        console.log(req.query);
        console.log(height);
        console.log(width);
        (0, createResizedImage_1.default)(fileName, height, width);
    }
    catch (error) {
        console.log(error);
    }
});
exports.default = images;
