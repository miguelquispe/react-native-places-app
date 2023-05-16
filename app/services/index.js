import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const LOCATION_API =
  "https://api.content.tripadvisor.com/api/v1/location";

export const locationsApi = createApi({
  reducerPath: "locationsApi",
  baseQuery: fetchBaseQuery({
    baseUrl: LOCATION_API,
    prepareHeaders: (headers) => {
      headers.set("referer", "https://mqestudio.com");

      return headers;
    },
  }),
  endpoints: (builder) => ({
    getLocations: builder.query({
      query: (queryObj) => ({
        url: `/nearby_search`,
        params: { ...queryObj },
      }),
      transformResponse: (response) => response.data,
    }),

    details: builder.query({
      queryFn: async ({ ids, key }, queryApi, options, baseQuery) => {
        const results = await Promise.all(
          ids.map((id) => baseQuery(`/${id}/details?key=${key}`))
        );

        // Too many requests
        const hasManyRequests = results.find((result) => result.status === 429);

        if (hasManyRequests) {
          return { error: { message: "Too many requests", code: 429 } };
        }

        const merged = [].concat(...results.map((result) => result.data));

        const errors = [].concat(
          ...results
            .filter((result) => result.error)
            .map((result) => result.error)
        );

        if (errors.length) {
          return {
            error: errors,
          };
        }

        return { data: merged };
      },
    }),
  }),
});

export const {
  useLazyGetLocationsQuery,
  // useDetailQuery,
  // useLazyDetailQuery,
  // useDetailsQuery,
  useLazyDetailsQuery,
} = locationsApi;
