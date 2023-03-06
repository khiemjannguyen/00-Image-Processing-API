import sharp from "sharp";

const imageFolder = './images';

const resizeImage = (fileName: string, width: number, height: number) => {
    try {
        sharp(imageFolder + `/${name}`)
        .resize({
            width: width,
            height: height
        })
        .toFile(imageFolder + `/resized_${name}`);
        return true
    } catch (error) {
        console.log(error);
        return false
    }
}

export default resizeImage