import { createApi } from "@reduxjs/toolkit/query/react";
import { Constants } from "@utils/constants";
import { axiosBaseQuery } from "@utils/auth";
import {
  CountriesRes,
  CategoryTreeRes,
  CitiesRes,
} from "@redux/services/utilities/type";

export const utilitiesApi = createApi({
  reducerPath: "utilitiesApi",
  baseQuery: axiosBaseQuery({ auth: Constants.AUTH_TYPE.basic }),
  endpoints: (builder) => ({
    countries: builder.query<CountriesRes, string>({
      query: () => `${Constants.UTILITIES}/countries`,
    }),
    categoryTree: builder.query<CategoryTreeRes, string>({
      query: () => `${Constants.UTILITIES}/category-tree`,
    }),
    categoryTreeMobile: builder.query<CategoryTreeRes, string>({
      query: () => `${Constants.UTILITIES}/category-tree-mobile`,
    }),
    cities: builder.query<CitiesRes, string>({
      query: () => `${Constants.UTILITIES}/cities`,
    }),
  }),
});

export const {
  useCountriesQuery,
  useCategoryTreeQuery,
  useCategoryTreeMobileQuery,
  useCitiesQuery,
} = utilitiesApi;
