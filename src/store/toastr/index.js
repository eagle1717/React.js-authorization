import { createSlice } from "@reduxjs/toolkit";

const toastrSlice = createSlice({
  name: "toastr",
  initialState: {
    toastrInfo: {},
  },
  reducers: {
    show_toastr(state, { payload }) {
      state.toastrInfo = {
        type: payload.type,
        content: payload.content,
      };
    },
    hide_toastr(state) {
      state.toastrInfo = {};
    },
  },
});

export default toastrSlice;
