import { promises as fsPromises } from 'fs'
import path from 'path'
import createResizedImage from '../../utilities/createResizedImage'

describe('Tests createResizedImage', function () {
    const fileName = 'test.jpg'
    const height = 300
    const width = 300
    const testImagePath = `images/resized/test_${height}_${width}.jpg`

    it('returns the path of the created image', async () => {
        expect(await createResizedImage(fileName, height, width)).toBe(
            testImagePath
        )
        await fsPromises.unlink(path.resolve(testImagePath))
    })
})
