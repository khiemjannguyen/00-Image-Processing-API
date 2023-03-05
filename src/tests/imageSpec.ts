import resizeImage from '../utilities/resizeImage';

describe('Tests for image manipulation', () => {
    const imageName = 'test.jpg';
    const imageFalseName = 'false.jpg';
    
    describe('dunction resizeImage resizes an image with the given width and length', () => {
        it('should create a image copy with the size 200x200', () => {
            expect(resizeImage(imageName, 200,200)).toBeTruthy
        })
        it('should create a image copy with the size 200x200', () => {
            expect(resizeImage(imageFalseName, 200,200)).toBeFalsy
        } )
    })
})