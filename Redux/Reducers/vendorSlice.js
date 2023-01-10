import {createSlice} from '@reduxjs/toolkit';

const initialState = {
    vendor: {},
};

export const vendorSlice = createSlice({
    name: "vendor",
    initialState,
    reducers: {
        setVendor: (state, action) => {
            state.vendor = action.payload;
        },
        updateVendorFollowers: (state, action) => {
            // console.log('ACT', action.payload)
            // console.log("STATE",state.vendor.followers)
            state.vendor.followers = action.payload;
            // console.log("ADJ STATE", state.vendor.followers)
        },
    }
});

export const { setVendor, updateVendorFollowers } = vendorSlice.actions;
export default vendorSlice.reducer;

// const updatedProducts = state.products.map((product) => {
//     if (product._id === action.payload.product._id) return action.payload.product;
//     return product;
// });
// state.products = updatedProducts;