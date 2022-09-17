import {Request, Response, Router} from "express";

const videos = [{
    id: 0,
    title: "string",
    author: "string",
    availableResolutions: [
        "P144"
    ],
    canBeDownloaded: true,
    minAgeRestriction: 18,
    publicationDate: "2022-09-17T20:56:33.534Z"
},]

export const VideosRouter = Router();
VideosRouter.get('/videos', (req: Request, res: Response) => {
    if (req.query.title) {
        let searchString = req.query.title.toString();
        res.status(200).send(videos.filter(p => p.title.indexOf(searchString) > -1))
    } else {
        res.status(200).send(videos)
    }
})
VideosRouter.get('/videos/:id', (req: Request, res: Response) => {
    let video = videos.find(p => p.id === +req.params.id)
    if (video) {
        res.status(200).send(video)
    } else {
        res.send(404)
    }
})
VideosRouter.delete('/videos/:id', (req: Request, res: Response) => {
    for (let i = 0; i < videos.length; i++) {
        if (videos[i].id === +req.params.id) {
            videos.splice(i, 1);
            res.send(204)
            return
        }
    }
    res.send(404)
})
VideosRouter.put('/videos/:id', (req: Request, res: Response) => {
    let video = videos.find(p => p.id === +req.params.id)
    if (video) {
        video.title = req.body.title
        res.status(200).send(video)
    } else {
        res.send(404)
    }
})
VideosRouter.post('/videos', (req: Request, res: Response) => {
    const newVideo = {
        id: +(new Date()),
        title: req.body.title,
        author: req.body.author,
        availableResolutions: [
            req.body.availableResolutions
        ],
        canBeDownloaded: req.body.canBeDownloaded,
        minAgeRestriction: req.body.minAgeRestriction,
        publicationDate: req.body.publicationDate
    }


     if ( req.body.title.length <= 40) {
       videos.push(newVideo);
       res.status(201).send(newVideo)
    } else {
      return res.status(400).send({
            errorsMessages: [
              {
                    message: "string",
                   field: "title"
               }],
            resultCode: 1
       })
    }
})
VideosRouter.delete('/testing/all-data', (req: Request, res: Response) => {
    for (let i = 0; i < videos.length; i++) {
        videos.splice(i, 1);
    }
    res.send(204)
})