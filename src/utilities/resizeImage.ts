import sharp from "sharp";

const imageIn = './images/fjord.jpg'
const imageOut = './images/fjord1.jpg'

const resizeImage = (width: number, height: number) => {
    try {
        sharp(imageIn)
        .resize({
            width: width,
            height: height
        })
        .toFile(imageOut);
    } catch (error) {
        console.log(error);
    }
}