"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const fs_1 = require("fs");
const createResizedImage_1 = __importDefault(require("../../utilities/createResizedImage"));
const images = express_1.default.Router();
const requiredParams = ['filename', 'height', 'width'];
let resizedImagePath;
images.get('/', (req, res) => {
    try {
        if (!req.query.filename || !req.query.height || !req.query.width) {
            res.status(400).send('URL contains invalid filename, height or width params!');
            return;
        }
        const fileName = req.query.filename;
        const height = parseInt(req.query.height);
        const width = parseInt(req.query.width);
        resizedImagePath = (0, createResizedImage_1.default)(fileName, height, width);
        console.log('resizedImagePath');
        console.log(resizedImagePath);
        if (resizedImagePath) {
            fs_1.promises.readFile(resizedImagePath)
                .then((thumbData) => {
                res.status(200).contentType('jpg').send(thumbData);
            })
                .catch(() => {
                console.error;
                res.status(500).send('Error occured wihle processing image');
            });
        }
        else if (!resizedImagePath) {
            res.status(404).send('Given image path does not exist');
            return;
        }
        images.use('/', express_1.default.static(resizedImagePath));
    }
    catch (error) {
        if (!req.query.filename || !req.query.height || !req.query.width) {
            res.status(400).send('URL contains invalid filename, height or width params!');
            return;
        }
    }
});
exports.default = images;
