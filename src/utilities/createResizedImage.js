"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sharp_1 = __importDefault(require("sharp"));
const path_1 = __importDefault(require("path"));
const fs_1 = __importDefault(require("fs"));
const imageOriginalFolder = './images/original';
const imageResizedFolder = './images/resized';
const createResizedImage = (fileName, height, width) => {
    const fullImagePath = path_1.default.join('./images', 'original', fileName);
    const fullResizedImagePath = path_1.default.join('./images', 'resized', `${fileName.split('.')[0]}_${height}_${width}.jpg`);
    try {
        if (fs_1.default.existsSync(fullImagePath) && !fs_1.default.existsSync(fullResizedImagePath)) {
            (0, sharp_1.default)(fullImagePath)
                .resize(height, width)
                .toFile(fullResizedImagePath);
            console.log("Success");
        }
        return fullResizedImagePath;
    }
    catch (error) {
        console.log("Error occured", error);
        return '';
    }
    ;
};
exports.default = createResizedImage;
