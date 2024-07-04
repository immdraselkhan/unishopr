import { createApi } from "@reduxjs/toolkit/query/react";
import {Constants} from "@utils/constants";
import { validateStatus, axiosBaseQuery } from "@utils/auth";
import { AddTravelReq, AddTravelRes, TravelsRes } from "./type";

export const travelApi = createApi({
    reducerPath: "travelApi",
    baseQuery: axiosBaseQuery({auth: Constants.AUTH_TYPE.bearer}),
    endpoints: (builder) => ({
        travels: builder.query<TravelsRes, string>({
            query: () => `${Constants.TRAVEL}`,
        }),
        addTravel: builder.mutation<AddTravelRes, AddTravelReq>({
            query: (args) => ({
                url: `${Constants.TRAVEL}`,
                method: 'POST',
                body: args.data,
                validateStatus: (response, result) => validateStatus({status: response.status, message: result.message, action: () => args.action(result.data._id), alert: true})
            })
        }),
    }),
});

export const { useTravelsQuery, useAddTravelMutation } = travelApi;