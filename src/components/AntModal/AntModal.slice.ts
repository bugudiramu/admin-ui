import { PayloadAction, createSlice } from "@reduxjs/toolkit";

const initialState = {
  isModalOpen: false,
};

export const antModalSlice = createSlice({
  name: "antModalSlice",
  initialState,
  reducers: {
    toggleModal: (state, action: PayloadAction<boolean>) => {
      state.isModalOpen = action.payload;
    },
  },
});

export const {toggleModal} = antModalSlice.actions

export default antModalSlice.reducer
