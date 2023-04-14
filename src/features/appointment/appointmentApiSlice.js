import { apiSlice } from "../../app/api/apiSlice";

export const appointmentApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    createApointment: builder.mutation({
      query: (body) => {
        console.log(body);
        return {
          url: `hospital/appointments/`,
          method: "POST",
          body: {...body}
        };
      },
      transformErrorResponse: (response) => ({
        status: response.status,
        error: response.error,
        message: response.data?.message,
      }),
    })
  }),
});

export const {
  useCreateApointmentMutation
} = appointmentApiSlice;
