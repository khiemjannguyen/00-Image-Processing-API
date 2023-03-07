import express from "express";
import createResizedImage from "../../utilities/createResizedImage";

const images = express.Router();

images.get("/", (req, res) => {
  res.send("Image route");
  try {
    const fileName = req.query.filename as string;
    const height = parseInt(req.query.height as unknown as string);
    const width = parseInt(req.query.width as unknown as string);
  
    createResizedImage(fileName, height, width)
    
  } catch (error) {
    console.log(error)
  }
});

export default images;
