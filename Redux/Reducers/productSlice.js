import {createSlice} from '@reduxjs/toolkit';

const initialState = {
    videoProducts: [],
    products: [],
};

export const productSlice = createSlice({
    name: "product",
    initialState,
    reducers: {
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
        setProducts: (state, action) => {
            state.products = action.payload.products;
        },
        setProduct: (state, action) => {
            const updatedProducts = state.products.map((product) => {
                if (product._id === action.payload.product._id) return action.payload.product;
                return product;
            });
            state.products = updatedProducts;
        },
        setVideoProducts: (state, action) => {
            state.videoProducts = action.payload.videoProducts;
        },
        setVideoProduct: (state, action) => {
            const updatedVideoProducts = state.videoProducts.map((product) => {
                if (product.product._id === action.payload.product._id) return action.payload; 
                return product;
            });
            state.videoProducts = updatedVideoProducts;
        },
    }
});

export const { setLogin, setLogout, setStateVideos, setStateVideo, setProducts, setProduct, setVideoProducts, setVideoProduct} = productSlice.actions;
export default productSlice.reducer;