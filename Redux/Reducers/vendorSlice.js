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
    }
});

export const { setVendor } = vendorSlice.actions;
export default vendorSlice.reducer;