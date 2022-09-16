import {Request, Response, Router} from "express";

export const TestinRouter = Router();
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
TestinRouter.delete('/testing/all-data', (req: Request, res: Response) => {
    for (let i = 0; i < videos.length; i++) {
        videos.splice(i, 1);
    }
    res.send(204)
})