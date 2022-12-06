import {createSlice} from '@reduxjs/toolkit';

const initialState = {
    user: null,
    token: null,
    videos: [],
    products: [],
};

export const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        setLogin: (state, action) => {
            state.user = action.payload.user;
            state.token = action.payload.token;
        },
        setLogout: (state) => {
            state.user = null;
            state.token = null;
        },
        setStateVideos: (state, action) => {
            state.videos = action.payload.videos;
        },
        setStateVideo: (state, action) => {
            const updatedVideos = state.videos.map((video) => {
                if (video._id === action.payload.video._id) return action.payload.video;
                return video;
            });
            state.videos = updatedVideos;
        },
        setStateProducts: (state, action) => {
            state.products = aciton.payload.products;
        },
    },
});

export const { setLogin, setLogout, setVideos, setVideo, setProducts} = authSlice.actions;
export default authSlice.reducer;