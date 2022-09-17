import express from 'express'
import bodyParser from "body-parser";
import {VideosRouter} from "./Router/VIdeosRouter";

const app = express()
const port = process.env.PORT || 3000

const parserMiddle = bodyParser();
app.use(parserMiddle)

app.use('/', VideosRouter)

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})