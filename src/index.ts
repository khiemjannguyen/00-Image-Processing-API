import express from 'express'
import routes from './routes/api'
import path from 'path'
import fs from 'fs'

const app = express()
const port = 3000

app.use('/api', routes)

app.get('/', (_, res): void => {
    res.status(200).send('Server is working!')
})

app.listen(port, () => {
    const resizedPath = path.resolve(__dirname, '../images/resized')

    if (!fs.existsSync(resizedPath)) {
        fs.mkdirSync(resizedPath)
    }
    console.log(`Server started at localhost:${port}`)
})

export default app
