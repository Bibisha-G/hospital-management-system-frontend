import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { BASE_URL } from "../../constants/constants";

const baseQuery = fetchBaseQuery({
  baseUrl: BASE_URL,
  tagTypes: ["Auth"],
  keepUnusedDataFor: 30,
  prepareHeaders: (headers, { getState }) => {
    const accessToken = getState().auth.accessToken;
    if (accessToken) {
      headers.set("Authorization", accessToken);
    }
    return headers;
  },
});

export const apiSlice = createApi({
  baseQuery: baseQuery,
  endpoints: (builder) => ({}),
});
