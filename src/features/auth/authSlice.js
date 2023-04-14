import { createSlice } from "@reduxjs/toolkit";
import { auth } from "../../constants/constants";
import jwtDecode from "jwt-decode";
const { accessToken, refreshToken } = auth;

const initialState = {
  accessToken: localStorage.getItem(accessToken),
  refreshToken: localStorage.getItem(refreshToken),
  user: null,
  profile:null
};

export const authSlice = createSlice({
  name: "auth",
  initialState: initialState,
  reducers: {
    setCredentials: (state, action) => {
      const { access, refresh } = action.payload;
      state.accessToken = access;
      state.refreshToken = refresh;
      localStorage.setItem(accessToken, access);
      localStorage.setItem(refreshToken, refresh);
    },
    setUser: (state, action) => {
      const user = action.payload;
      state.user = user;
    },
    setProfile: (state, action) => {
      const profile = action.payload;
      state.profile = profile;
    },
    logOut: (state) => {
      state.accessToken = null;
      state.refreshToken = null;
      state.user = null;
      state.profile = null
      localStorage.clear();
    },
  },
});

export const { setCredentials, logOut, setUser, setProfile } = authSlice.actions;

export default authSlice.reducer;

export const selectAccessToken = (state) => state.auth.accessToken;
export const selectRefreshToken = (state) => state.auth.refreshToken;
export const selectUserType = (state) => {
  if (state.auth.accessToken) {
    return jwtDecode(state.auth.accessToken).is_patient == true
      ? "Patient"
      : "Doctor";
  }
  return null;
};
export const selectTypeQuery = (state) => {
  if (state.auth.accessToken) {
    return jwtDecode(state.auth.accessToken).is_patient === true
      ? "patients"
      : "doctors";
  }
  return null;
};

export const selectUser = (state) => {
  return state.auth.user;
};
export const selectProfile = (state) => {
  return state.auth.profile;
};

export const selectUserId = (state) => {
  if (state.auth.accessToken) {
    return jwtDecode(state.auth.accessToken).user_id;
  }
  return null;
};
