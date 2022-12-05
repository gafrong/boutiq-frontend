import {
    SET_VIDEO_LIKE,
    SET_VIDEO_LIKES
} from '../constants';

const likeVideoReducer = (state = [], action) => {
    switch (action.type) {
        case SET_VIDEO_LIKES:
            return state.likes = action.payload.likes;
        case SET_VIDEO_LIKE:
            const updatedLikes = state.likes.map((like)=>{
                if (like._id === action.payload.like._id) return action.payload.like;
                return like;
            });
            return state.likes = updatedLikes;
    }
    return state;
}

export default likeVideoReducer;