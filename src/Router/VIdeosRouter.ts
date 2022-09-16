import {Request, Response, Router} from "express";

const videos = [{
    id: 0,
    title: "string",
    author: "string",
    canBeDownloaded: true,
    minAgeRestriction: null,
    createdAt: "2022-09-15T22:04:29.419Z",
    publicationDate: "2022-09-15T22:04:29.419Z",
    availableResolutions: [
        "P144"
    ]
},]

export const VideosRouter = Router();
VideosRouter.get('/', (req: Request, res: Response) => {
    if (req.query.title) {
        let searchString = req.query.title.toString();
        res.status(200).send(videos.filter(p => p.title.indexOf(searchString) > -1))
    } else {
        res.status(200).send(videos)
    }
})
VideosRouter.get('/:id', (req: Request, res: Response) => {
    let video = videos.find(p => p.id === +req.params.id)
    if (video) {
        res.status(200).send(video)
    } else {
        res.send(404)
    }
})
VideosRouter.delete('/:id', (req: Request, res: Response) => {
    for (let i = 0; i < videos.length; i++) {
        if (videos[i].id === +req.params.id) {
            videos.splice(i, 1);
            res.send(204)
            return
        }
    }
    res.send(404)
})
VideosRouter.put('/:id', (req: Request, res: Response) => {
    let video = videos.find(p => p.id === +req.params.id)
    if (video) {
        video.title = req.body.title
        res.status(200).send(video)
    } else {
        res.send(404)
    }
})
VideosRouter.post('/', (req: Request, res: Response) => {
    const newVideo = {
        id: +(new Date()),
        title: req.body.title,
        author: req.body.author,
        canBeDownloaded: req.body.canBeDownloaded,
        minAgeRestriction: req.body.minAgeRestriction,
        createdAt: req.body.createdAt,
        publicationDate: req.body.publicationDate,
        availableResolutions: [req.body.availableResolutions],

    }
    if (typeof req.body.title === "string" && req.body.title.length <= 40) {
        res.status(201).send(newVideo)
        videos.push(newVideo);
    } else {
        res.status(400).send({
            "errorsMessages": [
                {
                    "message": "string",
                    "field": "title"
                }
            ],
            "resultCode": 1
        })
    }
})
