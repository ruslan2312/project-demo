import express, {Request, Response} from 'express'
import bodyParser from "body-parser";

const app = express()
const port = process.env.PORT || 3000

const videos = [{id: 1, title: 'video1'}, {id: 2, title: 'video2'}]

app.get('/hometask_01/api/videos', (req: Request, res: Response) => {
    if (req.query.title) {
        let searchString = req.query.title.toString();
        res.status(200).send(videos.filter(p => p.title.indexOf(searchString) > -1))
    } else {
        res.send(videos)
    }
})
app.get('/hometask_01/api/videos/:id', (req: Request, res: Response) => {
    let video = videos.find(p => p.id === +req.params.id)
    if (video) {
        res.status(200).send(video)
    } else {
        res.send(404)
    }
})
app.delete('/hometask_01/api/videos/:id', (req: Request, res: Response) => {
    for (let i = 0; i < videos.length; i++) {
        if (videos[i].id === +req.params.id) {
            videos.splice(i, 1);
            res.send(204)
            return
        }
    }
    res.send(404)
})
app.put('/hometask_01/api/videos/:id', (req: Request, res: Response) => {
    let video = videos.find(p => p.id === +req.params.id)
    if (video) {
        video.title= req.body.title
        res.send(video)
    } else {
        res.send(404)
    }
})
app.post('/products', (req: Request, res: Response) => {
    const newVideo = {
        id: +(new Date()),
        title: req.body.title
    }
    videos.push(newVideo);
    res.status(201).send(newVideo)
})


app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})