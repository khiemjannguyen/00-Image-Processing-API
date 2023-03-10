import request from 'supertest'
import { promises as fsPromises } from 'fs'
import path from 'path'
import app from '../../index'
import sizeOf from 'image-size'
import { Stats } from 'fs'

const testImageRoute = '/api/images'

describe('Test different aspects of image route', () => {
    it('calls a resized image correctly and responds with 200', (): void => {
        const height = 100
        const width = 200
        const testImageQuery = `?filename=test.jpg&height=${height}&width=${width}`
        const testImagePath = `./images/resized/test_${height}_${width}.jpg`
        request(app).get(testImageRoute + testImageQuery)
        expect(200)
        fsPromises.unlink(testImagePath)
    })

    it('creates a resized version of a test image with the correct height and width', (): void => {
        const height = 300
        const width = 400
        const testImageQuery = `?filename=test.jpg&height=${height}&width=${width}`
        const testImagePath = `./images/resized/test_${height}_${width}.jpg`
        request(app)
            .get(testImageRoute + testImageQuery)
            .then(() => {
                const dimensions = sizeOf(testImagePath)
                expect(dimensions.height).toEqual(height)
                expect(dimensions.width).toEqual(width)
            })
        fsPromises.unlink(testImagePath)
    })

    it('creates a resized version of a test image', (): void => {
        const height = 500
        const width = 600
        const testImageQuery = `?filename=test.jpg&height=${height}&width=${width}`
        const testImagePath = `./images/resized/test_${height}_${width}.jpg`
        request(app)
            .get(testImageRoute + testImageQuery)
            .then(() => {
                fsPromises
                    .stat(path.resolve(testImagePath))
                    .then((fileStat: Stats) => expect(fileStat).not.toBeNull())
            })
        fsPromises.unlink(testImagePath)
    })
})

describe('Test incorrect creation of image', () => {
    it('calls without parameters and responds with 400', (): void => {
        request(app).get(testImageRoute)
        expect(400)
    })

    it('calls with one missing param and responds with 400', (): void => {
        request(app).get(testImageRoute + '?filename=test.jpg&height=200')
        expect(400)
    })

    it('calls correctly but image does not exist and responds with 404', (): void => {
        request(app).get(
            testImageRoute + '?filename=non.jpg&height=200&width=200'
        )
        expect(404)
    })
})
