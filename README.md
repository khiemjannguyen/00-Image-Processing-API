# Image Processing API

This project is part of the Udacity Full-Stack Javascript Nanodegree.

The API can be used in two different ways. As a simple placeholder API, the first allows the user to place images into the frontend with the size set via URL parameters (and additional stylization if you choose) for rapid prototyping. The second use case is as a library to serve properly scaled versions of images to the front end to reduce page load size.

## Functionality

- A resized version of the image is created, in case it doesn't already exists
- Specify height or width parameter to create a resized image
- It will be delivered as the response to the client

## API: Create resized version of an image

```http
  GET /api/images/?filename={filename}&height={height}&width={width}
```

| Parameter  | Type     | Description                                        |
| :--------- | :------- | :--------------------------------------------------|
| `filename` | `string` | filename of the to be resized image is **required**|
| `height`   | `number` | desired height of the resized image is **required**|
| `width`    | `number` | desired height of the resized image is **required**|

## Scripts

Run prettier

```bash
  npm run prettier
```

Run ESLint

```bash
  npm run lint
```

Run tests

```bash
  npm run test
```

Start the dev server

```bash
  npm run dev
```

Build the project

```bash
  npm run build
```

Run the application

```bash
  npm run start
```

## Run Locally

Go to the project directory

```bash
  cd image-processing-api
```

Install dependencies

```bash
  npm install
```

Start the dev server

```bash
  npm run dev
```

## Author

Khiem-Jan Nguyen
