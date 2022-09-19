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

export const VideoRepository = {
    findVideo(title: string | null | undefined) {
        if (title) {
            let filterVideo = videos.filter(p => p.title.indexOf(title) > -1)
            return filterVideo;
        } else {
            return videos
        }
    },
    findVideoByID(id: number) {
        let video = videos.find(p => p.id === +id)
        return video
    },
    deleteVideo(id: number) {
        for (let i = 0; i < videos.length; i++) {
            if (videos[i].id === +id) {
                videos.splice(i, 1);
                return true
            }
        }
        return false
    },
    updateVideo(id: number, title: string) {
        let video = videos.find(p => p.id === +id)
        if (video) {
            video.title = title
            return true
        } else {
            return false
        }
    },
    createVideo(title: string, author: string, availableResolutions: string, canBeDownloaded: boolean, minAgeRestriction: number, publicationDate: string) {
        const newVideo = {
            id: +(new Date()),
            title: title,
            author: author,
            availableResolutions: [
                availableResolutions
            ],
            canBeDownloaded: canBeDownloaded,
            minAgeRestriction: minAgeRestriction,
            publicationDate: publicationDate
        }
        videos.push(newVideo)
        return newVideo

    }
}