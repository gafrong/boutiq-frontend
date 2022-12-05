import {
    SET_VIDEO_LIKE,
    SET_VIDEO_LIKES
} from '../constants';

export const setVideoLike = (payload) => {
    return {
        type: SET_VIDEO_LIKE,
        payload
    }
} 

export const setVideoLikes = (payload) => {
    return {
        type: SET_VIDEO_LIKES,
        payload
    }
}

