import express from "express";
import sharp from "sharp";

const app = express();

const port = 3000;

app.use(express.static('public')); 
app.use('/images', express.static('images'));

app.listen(port, () => {
  console.log(`server started at localhost:${port}`);
});
