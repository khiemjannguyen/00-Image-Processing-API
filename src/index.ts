import express from "express";

const app = express();

const port = 3000;

const images = '/images'

// app.get("/api", (req, res) => {
//   res.send("Hello, world!");
// });

app.use(express.static('public')); 
app.use('/images', express.static('images'));

app.listen(port, () => {
  console.log(`server started at localhost:${port}`);
});
