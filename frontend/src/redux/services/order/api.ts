import { createApi } from "@reduxjs/toolkit/query/react";
import { Constants } from "@utils/constants";
import { validateStatus, axiosBaseQuery } from "@utils/auth";
import { AddLeadReq, AddLeadRes, LeadsRes, OrdersReq, OrdersRes, CouponRes, CouponReq, SimpleRes, UpdateLeadReq } from "./type";

export const orderApi = createApi({
    reducerPath: "orderApi",
    baseQuery: axiosBaseQuery({ auth: Constants.AUTH_TYPE.bearer }),
    endpoints: (builder) => ({
        leads: builder.query<LeadsRes, string | { status: string }>({
            query: (args) => `${Constants.ORDER}/leads?status=${typeof args !== "string" ? args?.status : ""}`,
        }),
        addLead: builder.mutation<AddLeadRes, AddLeadReq>({
            query: (args) => ({
                url: `${Constants.ORDER}/leads`,
                method: 'POST',
                body: args.data,
                validateStatus: (response, result) => validateStatus({ status: response.status, message: result.message, action: () => args?.action ? args.action(result?.data?._id ?? "") : () => {}, alert: true })
            })
        }),
        updateLead: builder.mutation<SimpleRes, UpdateLeadReq>({
            query: (args) => ({
                url: `${Constants.ORDER}/leads`,
                method: 'PUT',
                body: args.data,
                validateStatus: (response, result) => validateStatus({ status: response.status, message: result.message, action: args.action, alert: true })
            })
        }),
        orders: builder.query<OrdersRes, OrdersReq>({
            query: (args) => `${Constants.ORDER}/orders?status=${args.status}`,
        }),
        checkCoupon: builder.mutation<CouponRes, CouponReq>({
            query: (arg) => ({
                url: `${Constants.PAYMENTS}/coupon`,
                method: 'POST',
                body: arg.data,
                validateStatus: (response, result) => {
                    if (arg.action && result?.data) arg.action(result.data)
                    return validateStatus({ status: response.status, message: result.message, alert: true })
                }
            })
        }),
    }),
});

export const { useLeadsQuery, useAddLeadMutation, useUpdateLeadMutation, useOrdersQuery, useCheckCouponMutation } = orderApi;