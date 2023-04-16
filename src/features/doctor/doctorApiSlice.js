import { apiSlice } from "../../app/api/apiSlice";

export const doctorApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getDoctors: builder.query({
      query: () => {
        return {
          url: `/doctors/`,
          method: "GET",
        };
      },
      providesTags: ['Doctors'],
      transformErrorResponse: (response) => ({
        status: response.status,
        error: response.error,
        message: response.data?.message,
      }),
    }),
    getDoctor: builder.query({
      query: (id) => {
        return {
          url: `/doctors/${id}/`,
          method: "GET",
        };
      },
      transformErrorResponse: (response) => ({
        status: response.status,
        error: response.error,
        message: response.data?.message,
      }),
    }),
    setAvailability: builder.mutation({
      query: (props) => {
        const { id, body: update } = props;
        return {
          url: `doctors/${id}/set_availability/`,
          method: "POST",
          body: update,
        };
      },
      transformErrorResponse: (response) => ({
        status: response.status,
        error: response.error,
        message: response.data?.message,
      }),
    }),
    getAvailability: builder.query({
      query: (id) => {
        return {
          url: `doctors/${id}/get_availability/`,
          method: "GET",
          
        };
      },
      transformErrorResponse: (response) => ({
        status: response.status,
        error: response.error,
        message: response.data?.message,
      }),
    }),
  }),
});

export const {
  useGetDoctorsQuery,
  useGetDoctorQuery,
  useSetAvailabilityMutation,
  useGetAvailabilityQuery,
} = doctorApiSlice;
