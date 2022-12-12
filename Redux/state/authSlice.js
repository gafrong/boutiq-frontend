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
            // console.log('STATE', state);
            console.log('ACTION', action);
            const updatedProducts = state.products.map((product) => {
                // console.log('PRODUCT', product.product)
                // console.log('PAYLOAD ID', action.payload.product)
                if (product.product._id === action.payload.product._id) return action.payload;
                return product;
            });
            console.log('UPDATED', updatedProducts);
            console.log('STATE', state.products)
            state.products = updatedProducts;
            // console.log('STATE PRO', state.products)
        },
    },
});

export const { setLogin, setLogout, setStateVideos, setStateVideo, setVideoProducts, setVideoProduct} = authSlice.actions;
export default authSlice.reducer;