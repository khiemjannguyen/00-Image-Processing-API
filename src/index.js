"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const api_1 = __importDefault(require("./routes/api"));
const path_1 = __importDefault(require("path"));
const fs_1 = __importDefault(require("fs"));
const app = (0, express_1.default)();
const port = 3000;
const imageName = 'fjord.jpg';
app.use('/api', api_1.default);
app.listen(port, () => {
    const resizedPath = path_1.default.resolve(__dirname, '../images/resized');
    if (!fs_1.default.existsSync(resizedPath)) {
        fs_1.default.mkdirSync(resizedPath);
    }
    console.log(`Server started at localhost:${port}`);
});
exports.default = app;
