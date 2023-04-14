import { createSlice } from "@reduxjs/toolkit";
import { auth } from "../../constants/constants";
import jwtDecode from "jwt-decode";
const { accessToken, refreshToken } = auth;

const initialState = {

};

export const department = createSlice({
  name: "department",
  initialState: initialState,
  reducers: {

  },
});


export default authSlice.reducer;
