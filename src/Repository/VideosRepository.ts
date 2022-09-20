export type VideoType = {
    id: number,
    title: string,
    author: string,
    availableResolutions: any[],
    canBeDownloaded: boolean,
    minAgeRestriction: number | null,
    publicationDate: string,
    createdAt: string,
}

const videos: VideoType[] = []

export const VideoRepository = {
    findVideo(title: string | null | undefined) {
        if (title) {
            return videos.filter(p => p.title.indexOf(title) > -1)
        } else {
            return videos
        }
    },
    findVideoByID(id: number) {
        return videos.find(p => p.id === +id)
    },
    deleteVideo(id: number) {
        for (let i = 0; i < videos.length; i++) {
            if (videos[i].id === +id) {
                videos.splice(i, 1);
                return true
            }
        }
        return false
    }, deleteAllVideo() {
        for (let i = 0; i < videos.length; i++) {
            videos.splice(i, 1);
        }
        return true
    },
    updateVideo(id: number, title: string, author: string, canBeDownloaded: boolean, minAgeRestriction: number, publicationDate: string, availableResolutions: any) {
        let video = videos.find(p => p.id === +id)
        if (video) {
            video.title = title
            video.canBeDownloaded = canBeDownloaded
            video.minAgeRestriction = minAgeRestriction
            video.publicationDate = publicationDate
            video.availableResolutions = availableResolutions
            video.author = author
            return true
        } else {
            return false
        }
    },
    createVideo(title: string, author: string, availableResolutions: any,) {
        const newVideo: VideoType = {
            id: +(new Date()),
            title: title,
            author: author,
            availableResolutions: availableResolutions,
            canBeDownloaded: false,
            minAgeRestriction: null,
            publicationDate: new Date((Date.now() + (3600 * 1000 * 24))).toISOString(),
            createdAt: new Date().toISOString()
        }
        videos.push(newVideo)
        return newVideo

    }
}