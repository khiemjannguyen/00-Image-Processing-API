import request from 'supertest';
import fs from 'fs/promises';
import path from 'path';
import app from '../..';
import sizeOf from 'image-size';
import { Stats } from 'fs';

describe('Test different aspects of createResizedImage function', () => {

    const testImagePath = '../images/resized/fjord_111_111.jpg'
    const testImageRoute = '/api/images'

    it('creates a resized version of a test image', (done): void => {
        request(app)
            .get('/api/images?filename=fjord&height=111&width=111')
            .then(() => {
                fs.stat(path.resolve(testImagePath)).then((fileStat: Stats) =>
                    expect(fileStat).not.toBeNull(),
                );
                done();
            });
    });

    it('creates a resized version of a test image with the correct height and width', (done): void => {
        request(app)
            .get('/api/images?filename=fjord&height=100&width=150')
            .then(() => {
                const dimensions = sizeOf(path.resolve(testImagePath));
                expect(dimensions.height).toEqual(100);
                expect(dimensions.width).toEqual(150);
                done();
            });
    });

    it('responds with 400 if called without parameters', (done): void => {
        request(app).get('/api/images').expect(400, done);
    });

    it('responds with 400 if called with a missing parameter', (done): void => {
        request(app).get(testImageRoute + '?filename=test.jpg&height=100').expect(400, done);
    });

    it('responds with 404 if called correctly but image does not exist', (done): void => {
        request(app).get(testImageRoute + '?filename=non.jpg&height=100&width=100').expect(404, done);
    });

    it('responds with 200 if called correctly and image exist', (done): void => {
        request(app).get(testImageRoute + '?filename=test.jpg&height=100&width=100').expect(200, done);
    });



    
});
