'use strict'
var __importDefault =
    (this && this.__importDefault) ||
    function (mod) {
        return mod && mod.__esModule ? mod : { default: mod }
    }
Object.defineProperty(exports, '__esModule', { value: true })
const createResizedImage_1 = __importDefault(
    require('../utilities/createResizedImage')
)
describe('Tests for image manipulation', () => {
    const imageName = 'test.jpg'
    const imageFalseName = 'false.jpg'
    describe('dunction resizeImage resizes an image with the given width and length', () => {
        it('should create a image copy with the size 200x200', () => {
            expect((0, createResizedImage_1.default)(imageName, 200, 200))
                .toBeTruthy
        })
        it('should create a image copy with the size 200x200', () => {
            expect((0, createResizedImage_1.default)(imageFalseName, 200, 200))
                .toBeFalsy
        })
    })
})
