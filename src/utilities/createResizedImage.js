"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sharp_1 = __importDefault(require("sharp"));
const path_1 = __importDefault(require("path"));
const imageOriginalFolder = './images/original';
const imageResizedFolder = './images/resized';
// const checkResizedImageExists = async (fileName: string, height: number, width: number) => {
//     try {
//         await fsPromises.readFile(imageResizedFolder + `/${fileName.split('.')[0]}_${width}_${length}.jpg`, 'utf-8');
//         return true
//     } catch (error) {
//         console.log(error)
//         return false
//     }
// };
const createResizedImage = (fileName, height, width) => {
    const fullImagePath = path_1.default.join('./images', 'original', fileName);
    const fullResizedImagePath = path_1.default.join('./images', 'resized', `${fileName.split('.')[0]}_resized.jpg`);
    (0, sharp_1.default)(fullImagePath)
        .resize({
        width,
        height
    })
        .toFile(fullResizedImagePath)
        .then(() => {
        console.log("Success");
        return fullResizedImagePath;
    })
        .catch((error) => {
        console.log("Error occured", error);
        return '';
    });
};
exports.default = createResizedImage;
