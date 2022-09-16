import express from 'express'
import bodyParser from "body-parser";
import {VideosRouter} from "./Router/VIdeosRouter";
import {TestinRouter} from "./Router/TestingRouter";

const app = express()
const port = process.env.PORT || 3000

const parserMiddle = bodyParser();
app.use(parserMiddle)

app.use('/videos', VideosRouter)
app.use('/testing', TestinRouter)

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})