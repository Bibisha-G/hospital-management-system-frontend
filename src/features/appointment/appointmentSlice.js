import { createSlice } from "@reduxjs/toolkit";
import { auth } from "../../constants/constants";
import jwtDecode from "jwt-decode";
const { accessToken, refreshToken } = auth;

const initialState = {

};

export const appointmentSlice = createSlice({
  name: "appointment",
  initialState: initialState,
  reducers: {

  },
});


export default appointmentSlice.reducer;
