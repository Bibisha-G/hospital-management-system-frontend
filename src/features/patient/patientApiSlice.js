import { apiSlice } from "../../app/api/apiSlice";

export const doctorApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    createReview: builder.mutation({
      query: (body) => {
        return {
          url: `/reviews/`,
          method: "POST",
          body: body
        };
      },
      invalidatesTags: ['Doctor'],
      transformErrorResponse: (response) => ({
        status: response.status,
        error: response.error,
        message: response.data?.message,
      }),
    }),
  }),
});

export const {
  useCreateReviewMutation
} = doctorApiSlice;
