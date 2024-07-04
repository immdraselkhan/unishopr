import { createApi } from "@reduxjs/toolkit/query/react";
import {Constants} from "@utils/constants";
import {
    setLocalStorage,
    removeLocalStorage,
    validateStatus,
    axiosBaseQuery,
    setLocalStorageUserInfo
} from "@utils/auth";
import {
    SignUp,
    SignUpRes,
    SignIn,
    SignInRes,
    LogOutRes,
    Renew,
    LostPassword,
    ResetPassword,
    OtpVerify,
    OtpVerifyRes, SocialSignIn
} from "./type";

export const authApi = createApi({
    reducerPath: "authApi",
    baseQuery: axiosBaseQuery({auth: Constants.AUTH_TYPE.basic}),
    endpoints: (builder) => ({
        signUp: builder.mutation<SignUpRes, SignUp>({
            query: (args) => ({
                url: `${Constants.AUTH_ENDPOINT}/register`,
                method: 'POST',
                body: args.data,
                validateStatus: (response, result) => validateStatus({status: response.status, message: result.message, action: args.action, alert: true})
            }),
            transformResponse: async (res: SignUpRes) => {
                await setLocalStorageUserInfo(res);
                return res;
            }
        }),
        otpVerify: builder.mutation({
            query: (args: OtpVerify) => ({
                url: `${Constants.AUTH_ENDPOINT}/otp-verify`,
                method: 'PUT',
                body: args.data,
                validateStatus: (response, result) => validateStatus({status: response.status, message: result.message, action: args.action, alert: true})
            }),
            transformResponse: async (res: OtpVerifyRes) => {
                await setLocalStorage(res);
                return res;
            }
        }),
        signIn: builder.mutation<SignInRes, SignIn>({
            query: (args) => ({
                url: `${Constants.AUTH_ENDPOINT}/login`,
                method: 'POST',
                body: args.data,
                validateStatus: (response, result) => validateStatus({status: response.status, message: result.message, action: args.action, alert: true})
            }),
            transformResponse: async (res: SignInRes) => {
                await setLocalStorageUserInfo(res);
                return res;
            }
        }),
        socialSignIn: builder.mutation<SignInRes, SocialSignIn>({
            query: (args) => ({
                url: `${Constants.AUTH_ENDPOINT}/social-login`,
                method: 'POST',
                body: args.data,
                validateStatus: (response, result) => validateStatus({status: response.status, message: result.message, action: args.action, alert: true})
            }),
            transformResponse: async (res: SignInRes) => {
                await setLocalStorageUserInfo(res);
                return res;
            }
        }),
        renew: builder.mutation<SignInRes, Renew>({
            query: (arg) => ({
                url: `${Constants.AUTH_ENDPOINT}/renew`,
                method: 'POST',
                body: arg.body,
                validateStatus: (response, result: OtpVerifyRes) => {
                    if (response.status === 201) {
                        setLocalStorage(result).then(() => arg.render());
                        return true
                    } else {
                        removeLocalStorage(true).then(r => null)
                        return false
                    }
                },
            })
        }),
        lostPassword: builder.mutation({
            query: (data: LostPassword) => ({
                url: `${Constants.AUTH_ENDPOINT}/lost-password`,
                method: 'POST',
                body: data,
                validateStatus: (response, result) => validateStatus({status: response.status, message: result.message, alert: true})
            }),
        }),
        resetPassword: builder.mutation({
            query: (data: ResetPassword) => ({
                url: `${Constants.AUTH_ENDPOINT}/reset-password`,
                method: 'POST',
                body: data,
                validateStatus: (response, result) => validateStatus({status: response.status, message: result.message, alert: true})
            }),
        }),
    }),
});

export const logoutApi = createApi({
    reducerPath: "logoutApi",
    baseQuery: axiosBaseQuery({auth: Constants.AUTH_TYPE.bearer}),
    endpoints: (builder) => ({
        logOut: builder.mutation({
            query: (arg: {action: () => void}) => ({
                url: `${Constants.AUTH_ENDPOINT}/logout`,
                method: 'DELETE',
                validateStatus: (response) => {
                    if (response.status === 202) {
                        arg.action()
                        return true
                    } else {
                        removeLocalStorage(true).then(r => null)
                        return false
                    }
                },
            }),
            transformResponse: async (res: LogOutRes) => {
                await removeLocalStorage();
                return res;
            }
        }),
    }),
});

export const { useSignUpMutation, useSocialSignInMutation, useSignInMutation, useOtpVerifyMutation, useRenewMutation, useLostPasswordMutation, useResetPasswordMutation } = authApi;
export const { useLogOutMutation } = logoutApi;
