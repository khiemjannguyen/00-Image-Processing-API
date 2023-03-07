import sharp from "sharp";
import path from "path";
import fs from 'fs';

const imageOriginalFolder = './images/original';
const imageResizedFolder = './images/resized';

const createResizedImage = async (fileName: string, height: number, width: number) => {

    const imagePath = path.join('./images', 'original', fileName);
    const resizedImagePath = path.join('./images', 'resized', `${fileName.split('.')[0]}_${height}_${width}.jpg`)
    
    try {
      if (fs.existsSync(imagePath) && !fs.existsSync(resizedImagePath)){
        console.log('Create a new resized image')
        await sharp(imagePath)
        .resize(
          height,
          width
        )
        .toFile(resizedImagePath)
        console.log("Success"); 
      }
      return resizedImagePath;
    } catch (error) {
      console.log('Creating a new resized image failed')
      console.log("Error occured", error);
      return '';
    };  
  };

export default createResizedImage;