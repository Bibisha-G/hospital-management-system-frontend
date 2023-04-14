import { apiSlice } from "../../app/api/apiSlice";

export const authApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getDepartments: builder.query({
      query: () => {
        return {
          url: `hospital/departments`,
          method: "GET",
        };
      },
      transformErrorResponse: (response) => ({
        status: response.status,
        error: response.error,
        message: response.data?.message,
      }),
    }),
    getDeptDoctors: builder.query({
      query: () => {
        return {
          url: `hospital/doctors`,
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
  useGetDepartmentsQuery,
  useLazyGetDepartmentsQuery,
  useGetDeptDoctorsQuery,
  useLazyGetDeptDoctorsQuery,
} = authApiSlice;
