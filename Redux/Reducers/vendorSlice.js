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
            state.vendor.followers = action.payload.followers;
        },
        updateVendor: (state, action) => {
            state.vendor = action.payload.vendor;
        },
    }
});

export const { setVendor, updateVendorFollowers, updateVendor } = vendorSlice.actions;
export default vendorSlice.reducer;

