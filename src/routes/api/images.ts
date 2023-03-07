import express from "express";
import {promises as fsPromises} from 'fs';
import createResizedImage from "../../utilities/createResizedImage";

const images = express.Router();

const requiredParams = ['filename', 'height', 'width']

const getImageFile = async (imagePath: Promise<string>) => {
  fsPromises.readFile(await imagePath)
    .then((thumbData: Buffer) => {
      return thumbData;
    })
    .catch(() => {
      console.error
    });
}

images.get('/', (req, res) => {
  try {

    if (!req.query.filename || !req.query.height || !req.query.width) {
      res.status(400).send('URL contains invalid filename, height or width params!');
      return;
    }

    const fileName = req.query.filename as string;
    const height = parseInt(req.query.height as unknown as string);
    const width = parseInt(req.query.width as unknown as string);
  
    const resizedImagePath = createResizedImage(fileName, height, width);

    try {
      res.status(200).contentType('jpg').send(getImageFile(resizedImagePath));
    } catch (error) {
        console.error;
        res.status(500).send('Error occured wihle processing image');
        if (!resizedImagePath) {
          res.status(404).send('Given image path does not exist');
          return;
        }
    }
    
  } catch (error) {
    if (!req.query.filename || !req.query.height || !req.query.width) {
        res.status(400).send('URL contains invalid filename, height or width params!');
        return;
    }
  }
});



export default images;
