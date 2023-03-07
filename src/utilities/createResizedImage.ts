import sharp from "sharp";
import path from "path";
import fs from 'fs';

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

const createResizedImage = (fileName: string, height: number, width: number) => {
    const fullImagePath = path.join('./images', 'original', fileName);
    const fullResizedImagePath = path.join('./images', 'resized', `${fileName.split('.')[0]}_resized.jpg`)
    
    sharp(fullImagePath)
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

export default createResizedImage;