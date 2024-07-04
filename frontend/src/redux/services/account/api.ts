import { createApi } from "@reduxjs/toolkit/query/react"
import { Constants } from "@utils/constants"
import { axiosBaseQuery, validateStatus, clearLocalCart } from "@utils/auth"
import {
    SimpleRes,
    User,
    UpdateUserReq,
    UpdatePhoneOrEmailReq,
    UpdateProfilePictureReq,
    SslPayReq,
    SslPayRes,
    PaymentRes, ManualPayReq, OtpVerifyReq,
    PartnerRequestReq
} from "@redux/services/account/type";

export const accountApi = createApi({
    reducerPath: "accountApi",
    baseQuery: axiosBaseQuery({ auth: Constants.AUTH_TYPE.bearer }),
    endpoints: (builder) => ({
        getUser: builder.query<User, string>({
            query: () => `${Constants.ACCOUNT}/user`,
        }),
        payments: builder.query<PaymentRes, string >({
            query: (args) => `${Constants.ACCOUNT}/payments`,
        }),
        updateUser: builder.mutation<SimpleRes, UpdateUserReq>({
            query: (data) => ({
                url: `${Constants.ACCOUNT}/user`,
                method: 'PUT',
                body: data,
                validateStatus: (response, result) => validateStatus({ status: response.status, message: result.message, alert: true })
            }),
        }),
        updatePhoneOrEmail: builder.mutation<SimpleRes, UpdatePhoneOrEmailReq>({
            query: (args) => ({
                url: `${Constants.ACCOUNT}/update-phone-email`,
                method: 'PUT',
                body: args.data,
                validateStatus: (response, result) => validateStatus({ status: response.status, message: result.message, action: args.action, alert: true })
            }),
        }),
        otpVerify: builder.mutation<SimpleRes, OtpVerifyReq>({
            query: (args) => ({
                url: `${Constants.ACCOUNT}/otp-verify`,
                method: 'PUT',
                body: args.data,
                validateStatus: (response, result) => validateStatus({ status: response.status, message: result.message, action: args.action, alert: true })
            }),
        }),
        updateProfilePicture: builder.mutation<SimpleRes, UpdateProfilePictureReq>({
            query: (params) => ({
                url: `${Constants.ACCOUNT}/update-profile-picture`,
                method: "PUT",
                body: params,
                validateStatus: (response, result) =>
                    validateStatus({
                        status: response.status,
                        message: result.message,
                        alert: true,
                    }),
            }),
        }),
        sslPay: builder.mutation<SslPayRes, SslPayReq>({
            query: (params) => ({
                url: `${Constants.PAYMENTS}/ssl`,
                method: 'POST',
                body: params,
                validateStatus: (response, result) => validateStatus({status: response.status, message: result.message, alert: true})
            }),
            transformResponse: async (res: SslPayRes) => {
                if (res.data) await clearLocalCart();
                return res;
            }
        }),
        manualPay: builder.mutation<SimpleRes, ManualPayReq>({
            query: (params) => ({
                url: `${Constants.PAYMENTS}/manual`,
                method: 'POST',
                body: params,
                validateStatus: (response, result) => validateStatus({status: response.status, message: result.message, alert: true})
            }),
            transformResponse: async (res: SslPayRes) => {
                if (res.data) await clearLocalCart();
                return res;
            }
        }),
        partnerRequest: builder.mutation<SimpleRes, PartnerRequestReq>({
            query: (args) => ({
                url: `${Constants.ACCOUNT}/partner-request`,
                method: 'PUT',
                body: args.data,
                validateStatus: (response, result) => validateStatus({ status: response.status, message: result.message, alert: true })
            }),
        }),
    })
});

export const {
    useGetUserQuery,
    useUpdateUserMutation,
    useUpdatePhoneOrEmailMutation,
    useOtpVerifyMutation,
    useUpdateProfilePictureMutation,
    useSslPayMutation,
    useManualPayMutation,
    usePaymentsQuery,
    usePartnerRequestMutation
} = accountApi;
