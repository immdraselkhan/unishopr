import {Constants} from "@utils/constants"
import {fetchBaseQuery} from "@reduxjs/toolkit/dist/query/react"
import {OtpVerifyRes, SignUpRes} from "@redux/services/auth/type"
import {errorAlert, successAlert, warningAlert} from "@utils/alert"
import {BaseQueryFn} from '@reduxjs/toolkit/query'
import axios, {AxiosError, AxiosRequestConfig, AxiosResponse} from 'axios'
import {CountryType} from "@redux/services/utilities/type";
// import store from "@redux/store";
// import {startLoader, stopLoader} from "@redux/slices/loader";

export interface CartItem {
    _id: string,
    productId?: string,
    leadId?: string,
    type: string,
    name: string,
    thumbnail?: string,
    price: number,
    quantity: number,
    total: number,
    attributes?: {
        attribute: string,
        option: string,
        price: number
    }[],
    extra?: {
        name: string,
        value: number
    }[],
    additional?: {
        name: string,
        value: number
    }[]
}

export interface Carts extends Array<CartItem> { }

export const setLocalStorage = async (cookie: OtpVerifyRes) => {
    await localStorage.setItem(Constants.ACCESS_TOKEN, JSON.stringify(cookie.data.access))
    await localStorage.setItem(Constants.REFRESH_TOKEN, JSON.stringify(cookie.data.refresh))
    await localStorage.setItem(Constants.USER_INFO, JSON.stringify(cookie.data.user))
    await localStorage.setItem(Constants.IS_TRAVELER, JSON.stringify(cookie.data.user.services.traveler.isTraveler))
    return cookie;
}

export const setLocalStorageUserInfo = async (res: SignUpRes) => {
    await localStorage.setItem(Constants.USER_INFO, JSON.stringify(res.data));
    return res;
}

export const setLocalStorageCountry = async (country: CountryType) => {
    await localStorage.setItem(Constants.LOCAL_COUNTRY, JSON.stringify(country));
    window.location.reload();
    return country;
}

export const removeLocalStorage = async (reload=false) => {
    await localStorage.removeItem(Constants.ACCESS_TOKEN);
    await localStorage.removeItem(Constants.REFRESH_TOKEN);
    await localStorage.removeItem(Constants.USER_INFO);
    if (reload) await window.location.reload();
}

export const isLoggedIn =
    typeof window !== "undefined" &&
    localStorage.getItem(Constants.ACCESS_TOKEN) &&
    localStorage.getItem(Constants.REFRESH_TOKEN) &&
    localStorage.getItem(Constants.USER_INFO)

export const accessToken = (): {token: string} => {
    const localAccessToken: any = localStorage.getItem(Constants.ACCESS_TOKEN);
    const accessToken = JSON.parse(localAccessToken);
    return {token: accessToken?.token ? accessToken.token : null}
}

export const userInfo = (): {
    _id: string,
    firstName: string,
    lastName: string,
    phone: {
        country: {
            _id: string,
            name: string
        },
        phone: string
    },
    email: string,
    photo: string,
} => {
    const localUser: any = typeof window !== "undefined" ? localStorage.getItem(Constants.USER_INFO) : null;
    const user = JSON.parse(localUser);
    return {
        _id: user?._id ? user._id : "",
        firstName: user?.firstName ? user.firstName : "",
        lastName: user?.lastName ? user.lastName : "",
        phone: user?.phone ? user.phone : "",
        email: user?.email ? user.email : "",
        photo: user?.photo ? user.photo : "",
    }
}

export const localCountry = (): CountryType => {
    const localCountry: any = typeof window !== "undefined" ? localStorage.getItem(Constants.LOCAL_COUNTRY) : null;
    return JSON.parse(localCountry);
}

export const baseQuery = (params: {auth: string}) => fetchBaseQuery({
    baseUrl: Constants.BASE_ENDPOINT,
    prepareHeaders: (headers) => {
        if (params.auth === Constants.AUTH_TYPE.basic) {
            headers.set('authorization', 'Basic ' + btoa(`${Constants.CLIENT_ID}:${Constants.CLIENT_SECRET}`));
        } else if (params.auth === Constants.AUTH_TYPE.bearer) {
            const {token} = accessToken();
            if (token) {
                headers.set('authorization', `Bearer ${token}`)
            }
        }
        return headers
    },
})

const getHeaders = (type: string) => {
    const {token} = accessToken();
    return (type === 'basic')
        ? {'Content-Type': 'application/json', 'Authorization': `Basic ${btoa(Constants.CLIENT_ID + ':' + Constants.CLIENT_SECRET)}`}
        : {'Content-Type': 'application/json', 'Authorization': `Bearer ${token}`}
};

export const axiosBaseQuery =
    (
        params: {auth: string, baseUrl?: string}
    ): BaseQueryFn<
        {
            url: string
            method: AxiosRequestConfig['method']
            body?: AxiosRequestConfig['data']
            validateStatus?: (response: AxiosResponse, result: AxiosResponse['data']) => void
        } | string,
        unknown,
        unknown
        > =>
        async (args) => {
            try {
                // await store.dispatch(startLoader())
                // @ts-ignore
                document.getElementById("hidden-set-loader-true").click();

                const axiosParams = { url: params.baseUrl ? params.baseUrl + (typeof args === "string" ? args : args.url) : Constants.BASE_ENDPOINT + (typeof args === "string" ? args : args.url), headers: getHeaders(params.auth) };
                typeof args === "object" && args.method ? Object.assign(axiosParams, {method: args.method}) : null;
                typeof args === "object" && args.body ? Object.assign(axiosParams, {data: args.body}) : null;

                const result = await axios(axiosParams)
                if (typeof args === "object" && args.validateStatus) args.validateStatus(result, result.data)

                // await store.dispatch(stopLoader())
                await setTimeout(() => {
                    // @ts-ignore
                    document.getElementById("hidden-set-loader-false").click();
                }, 200)
                return { data: result.data }
            } catch (axiosError) {
                let err = axiosError as AxiosError
                if (typeof args === "object" && args.validateStatus && err.response) args.validateStatus(err.response, err.response?.data)

                // await store.dispatch(stopLoader())
                // @ts-ignore
                document.getElementById("hidden-set-loader-false").click();
                return {
                    error: { status: err.response?.status, data: err.response?.data },
                }
            }
        }

export const validateStatus = (params: {status: number, message: string, alert?: boolean, action?: () => void}): boolean => {
    if (params.status === 200) {
        if (params.alert) successAlert({title: params.message})
        return true
    } else if (params.status === 201) {
        if (params.action) params.action()
        if (params.alert) successAlert({title: params.message})
        return true
    } else if (params.status === 202) {
        if (params.action) params.action()
        if (params.alert) successAlert({title: params.message})
        return true
    } else if (params.status === 204) {
        if (params.alert) warningAlert({title: params.message})
        return true
    } else if (params.status === 401) {
        if (params.alert) errorAlert({title: params.message})
        window.location.reload()
        return false
    } else if (params.status === 406) {
        if (params.alert) errorAlert({title: params.message})
        return false
    } else if (params.status === 400) {
        if (params.alert) errorAlert({title: params.message ? params.message : "Something went wrong!"})
        return false
    } else if (params.status === 404) {
        if (params.alert) errorAlert({title: "Server not found!"})
        return false
    } else if (params.status === 422) {
        if (params.alert) errorAlert({title: "Validation Error!"})
        return false
    } else if (params.status === 500) {
        if (params.alert) errorAlert({title: "Something went wrong!"})
        return false
    }
    return false
}

export const setLocalCart = async (params: CartItem) => {
    const localCart: any = await localStorage.getItem(Constants.LOCAL_CART);
    const cart = JSON.parse(localCart);

    if (localCart && cart && cart.length) {
        const courseExist = cart.find((item: {_id: string}) => item._id === params._id)
        if (!courseExist) {
            await localStorage.setItem(Constants.LOCAL_CART, JSON.stringify([...cart, params]))
            await successAlert({title: "Added to Cart"})
        }
    } else {
        await localStorage.setItem(Constants.LOCAL_CART, JSON.stringify([params]))
        await successAlert({title: "Added to Cart"})
    }

    // @ts-ignore
    document.getElementById("hidden-cart-div").click();
}

export const removeLocalCart = async (params: { _id: string }) => {
    const localCart: any = await localStorage.getItem(Constants.LOCAL_CART);
    const cart = JSON.parse(localCart);

    if (localCart && cart && cart.length) {
        const courseExist = cart.find((item: {_id: string}) => item._id === params._id)
        if (courseExist) {
            cart.splice(cart.findIndex((item: {_id: string}) => item._id === params._id), 1)
            await localStorage.setItem(Constants.LOCAL_CART, JSON.stringify(cart))

            // @ts-ignore
            document.getElementById("hidden-cart-div").click();
            successAlert({title: "Removed from Cart"})
        }
    }
}

export const clearLocalCart = async () => {
    await localStorage.removeItem(Constants.LOCAL_CART);

    // @ts-ignore
    await document.getElementById("hidden-cart-div").click();
}
