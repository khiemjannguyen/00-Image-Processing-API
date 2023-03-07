import sharp from "sharp";
import path from "path";
import fs from 'fs';

const imageOriginalFolder = './images/original';
const imageResizedFolder = './images/resized';

const createResizedImage = async (fileName: string, height: number, width: number) => {

    const fullImagePath = path.join('./images', 'original', fileName);
    const fullResizedImagePath = path.join('./images', 'resized', `${fileName.split('.')[0]}_${height}_${width}.jpg`)
    
    try {
      if (fs.existsSync(fullImagePath) && !fs.existsSync(fullResizedImagePath)){
        console.log('Create a new resized image')
        await sharp(fullImagePath)
        .resize(
          height,
          width
        )
        .toFile(fullResizedImagePath)
        console.log("Success"); 
      }
      return fullResizedImagePath;
    } catch (error) {
      console.log("Error occured", error);
      return '';
    };  
  };

export default createResizedImage;