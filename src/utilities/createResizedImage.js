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
const sharp_1 = __importDefault(require("sharp"));
const path_1 = __importDefault(require("path"));
const fs_1 = __importDefault(require("fs"));
const imageOriginalFolder = './images/original';
const imageResizedFolder = './images/resized';
const createResizedImage = (fileName, height, width) => __awaiter(void 0, void 0, void 0, function* () {
    const imagePath = path_1.default.join('./images', 'original', fileName);
    const resizedImagePath = path_1.default.join('./images', 'resized', `${fileName.split('.')[0]}_${height}_${width}.jpg`);
    try {
        if (fs_1.default.existsSync(imagePath) && !fs_1.default.existsSync(resizedImagePath)) {
            console.log('Create a new resized image');
            yield (0, sharp_1.default)(imagePath)
                .resize(height, width)
                .toFile(resizedImagePath);
            console.log("Success");
        }
        return resizedImagePath;
    }
    catch (error) {
        console.log('Creating a new resized image failed');
        console.log("Error occured", error);
        return '';
    }
    ;
});
exports.default = createResizedImage;
