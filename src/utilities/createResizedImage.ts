import sharp from 'sharp'
import path from 'path'
import fs from 'fs'

const imageOriginalFolder = './images/original'
const imageResizedFolder = './images/resized'

const createResizedImage = async (
    fileName: string,
    height: number | null,
    width: number | null
) => {
    const imagePath = path.join('./images', 'original', fileName)
    const resizedImagePath = path.join(
        './images',
        'resized',
        `${fileName.split('.')[0]}_${height}_${width}.jpg`
    )

    if (!fs.existsSync(imagePath) && !fs.existsSync(resizedImagePath)) {
        return ''
    }
    if (fs.existsSync(imagePath) && !fs.existsSync(resizedImagePath)) {
        await sharp(imagePath).resize(height, width).toFile(resizedImagePath)
        console.log('Success')
    }
    console.log(resizedImagePath)
    return resizedImagePath
}

export default createResizedImage
