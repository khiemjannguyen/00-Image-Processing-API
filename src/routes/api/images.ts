import express from "express";
import {promises as fsPromises} from 'fs';
import createResizedImage from "../../utilities/createResizedImage";
import containsNumbers from "../../utilities/validation";

const images = express.Router();

images.get('/', async (req, res) => {
  
  const fileName = req.query.filename as string;
  const height = containsNumbers(req.query.height as unknown as string) ? parseInt(req.query.height as unknown as string) : null;
  const width = containsNumbers(req.query.width as unknown as string) ? parseInt(req.query.width as unknown as string) : null;
  
  if (!req.query.filename || !req.query.height || !req.query.width) {
    res.status(400).send('URL contains invalid filename, height or width params!');
    return;
  }

  const resizedImagePath = await createResizedImage(fileName, height, width);

  if (resizedImagePath === '') {
    res.status(404).send('Given image path does not exist');
  } else if (resizedImagePath) {
    fsPromises.readFile(resizedImagePath)
      .then((thumbData: Buffer) => {
        res.status(200).contentType('jpg').send(thumbData);
      })
      .catch(() => {
        console.error
        res.status(500).send('Error occured while processing image');
      });
  }
});

export default images;
