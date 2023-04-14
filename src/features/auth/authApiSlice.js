import { apiSlice } from "../../app/api/apiSlice";

export const authApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    login: builder.mutation({
      query: (credentials) => ({
        url: "auth/login/",
        method: "POST",
        body: { ...credentials },
      }),
      transformResponse: (response) => ({
        access: response.access,
        refresh: response.refresh,
      }),
      transformErrorResponse: (response) => ({
        status: response.status,
        error: response.error,
        message: response.data?.message,
      }),
    }),

    register: builder.mutation({
      query: (body) => ({
        url: "auth/register/",
        method: "POST",
        body: { ...body },
      }),

      transformResponse: (response) => response,
      transformErrorResponse: (response) => {
        const errors = response.data;
        const errorList = [];
        for (const key in errors) {
          if (errors.hasOwnProperty(key)) {
            const errorMessages = errors[key];
            for (const message of errorMessages) {
              errorList.push(`${key}: ${message}`);
            }
          }
        }
        const errorString = errorList.join("\n");
        return errorString;
      },
    }),
    addProfile: builder.mutation({
      query: (body) => ({
        url: "",
        method: "POST",
        body: body,
      }),
      // invalidatesTags: [{ type: "Houses", id: "LIST" }],
      transformErrorResponse: (response) => ({
        status: response.status,
        message: response.data.message,
      }),
    }),
    updateProfile: builder.mutation({
      query: (body) => {
        const { id, ...updated } = body;
        console.log(updated);
        return {
          url: `patients/${id}/`,
          method: "PATCH",
          body: updated,
        };
      },
    }),
    getUser: builder.mutation({
      query: (id) => {
        return {
          url: `users/${id}`,
          method: "GET",
        };
      },
      transformErrorResponse: (response) => ({
        status: response.status,
        error: response.error,
        message: response.data?.message,
      }),
    }),
    getProfile: builder.mutation({
      query: ({type,id}) => {
        return {
          url: `${type}/${id}`,
          method: "GET",
        };
      },
      transformErrorResponse: (response) => ({
        status: response.status,
        error: response.error,
        message: response.data?.message,
      }),
    }),
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
  useLoginMutation,
  useRegisterMutation,
  useAddProfileMutation,
  useGetUserMutation,
  useUpdateProfileMutation,
  useGetProfileMutation,
  useLazyGetDepartmentsQuery,
  useLazyGetDeptDoctorsQuery
} = authApiSlice;
