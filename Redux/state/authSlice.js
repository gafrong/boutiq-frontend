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
        setVideoProducts: (state, action) => {
            state.products = action.payload.products;
        },
        setVideoProduct: (state, action) => {
            const updatedProducts = state.products.map((product) => {
                if (product.product._id === action.payload.product._id) return action.payload;
                return product;
            });
            state.products = updatedProducts;
        },
    },
});

export const { setLogin, setLogout, setStateVideos, setStateVideo, setVideoProducts, setVideoProduct} = authSlice.actions;
export default authSlice.reducer;