import { apiSlice } from "../../app/api/apiSlice";

export const appointmentApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    createApointment: builder.mutation({
      query: (body) => {
        console.log(body);
        return {
          url: `hospital/appointments/`,
          method: "POST",
          body: { ...body }
        };
      },
      providesTags: ['Appointment'],
      transformErrorResponse: (response) => ({
        status: response.status,
        error: response.error,
        message: response.data?.message,
      }),
    }),
    getDoctorApointments: builder.query({
      query: (id) => {
        console.log(id);
        return {
          url: `hospital/appointments/get_appointments_by_doctor/?doctor_id=${id}`,
          method: "GET",
        };
      },
      invalidatesTags: ['Appointment'],
      transformErrorResponse: (response) => ({
        status: response.status,
        error: response.error,
        message: response.data?.message,
      }),
    }),
    getPatientApointments: builder.query({
      query: (id) => {
        console.log(id);
        return {
          url: `hospital/appointments/get_appointments_by_patient/?patient_id=${id}`,
          method: "GET",
        };
      },
      invalidatesTags: ['Appointment'],
      transformErrorResponse: (response) => ({
        status: response.status,
        error: response.error,
        message: response.data?.message,
      }),
    })
  })
});

export const {
  useCreateApointmentMutation,
  useGetDoctorApointmentsQuery,
  useGetPatientApointmentsQuery
} = appointmentApiSlice;
