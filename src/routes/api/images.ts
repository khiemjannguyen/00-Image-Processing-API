import express from "express";
import createResizedImage from "../../utilities/createResizedImage";

const images = express.Router();

images.get("/", (req, res) => {
  res.send("Image route");
  try {
    const fileName = req.query.filename as string;
    const height = req.query.height as unknown as number;
    const width = req.query.width as unknown as number;
  
    createResizedImage(fileName, height, width)
    
  } catch (error) {
    console.log(error)
  }
});

export default images;
