import express from "express";
import {promises as fsPromises} from 'fs';
import createResizedImage from "../../utilities/createResizedImage";

const images = express.Router();

const requiredParams = ['filename', 'height', 'width']

let resizedImagePath: string

images.get('/', (req, res) => {
  try {

    if (!req.query.filename || !req.query.height || !req.query.width) {
      res.status(400).send('URL contains invalid filename, height or width params!');
      return;
    }

    const fileName = req.query.filename as string;
    const height = parseInt(req.query.height as unknown as string);
    const width = parseInt(req.query.width as unknown as string);
  
    resizedImagePath = createResizedImage(fileName, height, width);

    if (resizedImagePath) {
      fsPromises.readFile(resizedImagePath)
        .then((thumbData: Buffer) => {
          res.status(200).contentType('jpg').send(thumbData);
        })
        .catch(() => {
          res.status(500).send('Error occured wihle processing image');
        });

    } else if (!resizedImagePath) {
      res.status(404).send('Given image path does not exist');
      return;
    }

    images.use('/', express.static(resizedImagePath))
    
  } catch (error) {
    if (!req.query.filename || !req.query.height || !req.query.width) {
        res.status(400).send('URL contains invalid filename, height or width params!');
        return;
    }

  }
});



export default images;
