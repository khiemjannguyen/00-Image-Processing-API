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
const express_1 = __importDefault(require("express"));
const fs_1 = require("fs");
const createResizedImage_1 = __importDefault(require("../../utilities/createResizedImage"));
const images = express_1.default.Router();
images.get('/', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        if (!req.query.filename || !req.query.height || !req.query.width) {
            res.status(400).send('URL contains invalid filename, height or width params!');
            return;
        }
        const fileName = req.query.filename;
        const height = parseInt(req.query.height);
        const width = parseInt(req.query.width);
        const resizedImagePath = (0, createResizedImage_1.default)(fileName, height, width);
        if (resizedImagePath) {
            fs_1.promises.readFile(yield resizedImagePath)
                .then((thumbData) => {
                res.status(200).contentType('jpg').send(thumbData);
            })
                .catch(() => {
                console.error;
                res.status(500).send('Error occured while processing image');
            });
        }
        else if (!resizedImagePath) {
            res.status(404).send('Given image path does not exist');
            return;
        }
    }
    catch (error) {
        if (!req.query.filename || !req.query.height || !req.query.width) {
            res.status(400).send('URL contains invalid filename, height or width params!');
            return;
        }
    }
}));
exports.default = images;
