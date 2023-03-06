import express from "express";
import routes from "./routes/api";
import resizeImage from "./utilities/resizeImage";

const app = express();
const port = 3000;

const imageName = 'fjord.jpg';

app.use('/api', routes)

app.listen(port, () => {
  console.log(`server started at localhost:${port}`);
});
