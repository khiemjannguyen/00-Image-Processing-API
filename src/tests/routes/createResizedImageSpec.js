"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const supertest_1 = __importDefault(require("supertest"));
const promises_1 = __importDefault(require("fs/promises"));
const path_1 = __importDefault(require("path"));
const __1 = __importDefault(require("../.."));
const image_size_1 = __importDefault(require("image-size"));
describe('Test different aspects of createResizedImage function', () => {
    const testImagePath = '../images/resized/fjord_111_111.jpg';
    const testImageRoute = '/api/images';
    it('creates a resized version of a test image', (done) => {
        (0, supertest_1.default)(__1.default)
            .get('/api/images?filename=fjord&height=111&width=111')
            .then(() => {
            promises_1.default.stat(path_1.default.resolve(testImagePath)).then((fileStat) => expect(fileStat).not.toBeNull());
            done();
        });
    });
    it('creates a resized version of a test image with the correct height and width', (done) => {
        (0, supertest_1.default)(__1.default)
            .get('/api/images?filename=fjord&height=100&width=150')
            .then(() => {
            const dimensions = (0, image_size_1.default)(path_1.default.resolve(testImagePath));
            expect(dimensions.height).toEqual(100);
            expect(dimensions.width).toEqual(150);
            done();
        });
    });
    it('responds with 400 if called without parameters', (done) => {
        (0, supertest_1.default)(__1.default).get('/api/images').expect(400, done);
    });
    it('responds with 400 if called with a missing parameter', (done) => {
        (0, supertest_1.default)(__1.default).get(testImageRoute + '?filename=test.jpg&height=100').expect(400, done);
    });
    it('responds with 404 if called correctly but image does not exist', (done) => {
        (0, supertest_1.default)(__1.default).get(testImageRoute + '?filename=non.jpg&height=100&width=100').expect(404, done);
    });
    it('responds with 200 if called correctly and image exist', (done) => {
        (0, supertest_1.default)(__1.default).get(testImageRoute + '?filename=test.jpg&height=100&width=100').expect(200, done);
    });
});
