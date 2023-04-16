import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const baseQuery = fetchBaseQuery({});

export const thirdPartyApiSlice = createApi({
  reducerPath: "thirdPartyApi",
  baseQuery: baseQuery,
  endpoints: (builder) => ({
    cloudinaryUpload: builder.mutation({
      query: (files) => ({
        url: "https://api.cloudinary.com/v1_1/dp9ue01er/image/upload",
        method: "POST",
        body: files,
      }),

      transformResponse: (response) => ({ ...response, status: 200 }),
    }),
  }),
});

export const { useCloudinaryUploadMutation } = thirdPartyApiSlice;
