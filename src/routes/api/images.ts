import express from 'express';

const images = express.Router();

images.get('/', (req, res) => {
    res.send('Image route')
});

export default images;