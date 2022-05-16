import { configureStore } from "@reduxjs/toolkit";
import toastrSlice from "./toastr";

const store = configureStore({
    reducer: {
        toastr: toastrSlice.reducer,
    },
});

export const toastrActions = toastrSlice.actions;

export default store;
