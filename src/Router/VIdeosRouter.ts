import {Request, Response, Router} from "express";
import {VideoRepository} from "../Repository/VideosRepository";
import {body} from 'express-validator';
import {inputValidationMiddleware} from "../Middleware/input-validation-middleware";

const videos = [{
    id: 165555,
    title: "string",
    author: "string",
    availableResolutions: [
        "P144"
    ],
    canBeDownloaded: true,
    minAgeRestriction: 18,
    publicationDate: "2022-09-17T20:56:33.534Z"
},]

const titleValidation = body('title').trim().isLength({min: 4, max: 20})
const authorValidation = body('author').trim().isLength({min: 4, max: 20})
const availableResolutionsVideoValidation = body('availableResolutions').isArray({min: 1, max: 5});
const canBeDownloadedValidation = body('canBeDownloaded').isBoolean()
const minAgeRestrictionValidation = body('minAgeRestriction').isInt({min: 0, max: 100})
const publicationDateValidation = body('publicationDate').trim().isLength({min: 8, max: 100})


export const VideosRouter = Router();

VideosRouter.get('/videos', titleValidation, authorValidation, availableResolutionsVideoValidation, canBeDownloadedValidation, minAgeRestrictionValidation,
    publicationDateValidation, inputValidationMiddleware,
    (req: Request, res: Response) => {
        const findVideo = VideoRepository.findVideo(req.query.title?.toString())
        res.status(200).send(findVideo)
    })
VideosRouter.get('/videos/:id', titleValidation, authorValidation, availableResolutionsVideoValidation, canBeDownloadedValidation, minAgeRestrictionValidation,
    publicationDateValidation, inputValidationMiddleware,
    (req: Request, res: Response) => {
        let video = VideoRepository.findVideoByID(+req.params.id)
        if (video) {
            res.status(200).send(video)
        } else {
            res.send(404)
        }
    })
VideosRouter.delete('/videos/:id', (req: Request, res: Response) => {
    const isDeleted = VideoRepository.deleteVideo(+req.params.id)
    if (isDeleted) {
        res.send(204)
    } else {
        res.send(404)
    }
})
VideosRouter.put('/videos/:id',
    titleValidation, authorValidation, availableResolutionsVideoValidation, canBeDownloadedValidation, minAgeRestrictionValidation,
    publicationDateValidation, inputValidationMiddleware,
    (req: Request, res: Response) => {
        const isUpdate = VideoRepository.updateVideo(+req.params.id, req.body.title)
        if (isUpdate) {
            const video = VideoRepository.findVideoByID(+req.params.id)
            res.status(200).send(video)
        } else {
            res.send(404)
        }
    })
VideosRouter.post('/videos',
    titleValidation, authorValidation, availableResolutionsVideoValidation, canBeDownloadedValidation, minAgeRestrictionValidation,
    publicationDateValidation, inputValidationMiddleware,
    (req: Request, res: Response) => {
        const newVideo = VideoRepository.createVideo(req.body.title, req.body.author, req.body.availableResolutions, req.body.canBeDownloaded,
            req.body.minAgeRestriction, req.body.publicationDate)
        videos.push(newVideo);
        res.status(201).send(newVideo)

    })
VideosRouter.delete('/testing/all-data', (req: Request, res: Response) => {
    for (let i = 0; i < videos.length; i++) {
        videos.splice(i, 1);
    }
    res.send(204)
})