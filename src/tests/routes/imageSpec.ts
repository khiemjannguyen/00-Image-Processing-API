import request from 'supertest';
import {promises as fsPromises} from 'fs';
import path from 'path';
import app from '../../index';
import sizeOf from 'image-size';
import { Stats } from 'fs';

describe('Test different aspects of image route', () => {

    const height = 200;
    const width = 300;
    const testImageRoute = '/api/images';
    const testImageQuery = `?filename=test.jpg&height=${height}&width=${width}`;
    const testImagePath = `./images/resized/test_${height}_${width}.jpg`;

    afterEach ( async () => {
        try {
            await fsPromises.unlink(path.resolve( '.', 'images', 'resized', `test_${height}_${width}.jpg`));
            console.log("Delete File successfully.");
          } catch (error) {
            console.log(error);
          }
    })

    it('calls a resized image correctly and responds with 200', (done): void => {
        request(app)
            .get(testImageRoute + testImageQuery)
            expect(200);
            done();
    });

    it('calls without parameters and responds with 400', (done): void => {
        request(app)
            .get(testImageRoute)
            expect(400);
            done();
    });

    it('calls with one missing param and responds with 400', (done): void => {
        request(app)
            .get(testImageRoute + '?filename=test.jpg&height=200')
            expect(400);
            done();
    });

    it('calls correctly but image does not exist and responds with 404', (done): void => {
        request(app)
            .get(testImageRoute + '?filename=non.jpg&height=200&width=200')
            expect(400);
            done();
    });

    it('creates a resized version of a test image with the correct height and width', (done): void => {
        request(app)
            .get(testImageRoute + testImageQuery)
            .then(() => {
                const dimensions = sizeOf(testImagePath)
                expect(dimensions.height).toEqual(height)
                expect(dimensions.width).toEqual(width)
            });
            done();
    });

    it('creates a resized version of a test image', (done): void => {
        request(app)
            .get(testImageRoute + testImageQuery)
            .then(() => {
                fsPromises.stat(path.resolve(testImagePath)).then((fileStat: Stats) =>
                    expect(fileStat).not.toBeNull(),
                );
            });
            done();
    });
});
