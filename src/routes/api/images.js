"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const createResizedImage_1 = __importDefault(require("../../utilities/createResizedImage"));
const images = express_1.default.Router();
const requiredParams = ['filename', 'height', 'width'];
let resizedImagePath;
images.get('/', (req, res) => {
    try {
        console.log(typeof (req.query));
        const fileName = req.query.filename;
        const height = parseInt(req.query.height);
        const width = parseInt(req.query.width);
        resizedImagePath = (0, createResizedImage_1.default)(fileName, height, width);
        images.use('/', express_1.default.static(resizedImagePath));
    }
    catch (error) {
        if (!req.query.contains) {
            res.status(400).send('Please make sure url contains correct filename, height and width params');
            return;
        }
    }
});
exports.default = images;
