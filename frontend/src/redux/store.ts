import {configureStore} from "@reduxjs/toolkit";
import {setupListeners} from "@reduxjs/toolkit/query";
import {useDispatch} from "react-redux";

import {authApi, logoutApi} from "./services/auth/api";
import {utilitiesApi} from "./services/utilities/api";
import {orderApi} from "./services/order/api";
import {travelApi} from "./services/travel/api";
import {accountApi} from "@redux/services/account/api";
import {landingApi} from "./services/landing/api";
import {scrapingApi} from "./services/scraping/api";

export const store = configureStore({
    reducer: {
        [authApi.reducerPath]: authApi.reducer,
        [logoutApi.reducerPath]: logoutApi.reducer,
        [utilitiesApi.reducerPath]: utilitiesApi.reducer,
        [orderApi.reducerPath]: orderApi.reducer,
        [travelApi.reducerPath]: travelApi.reducer,
        [landingApi.reducerPath]: landingApi.reducer,
        [accountApi.reducerPath]: accountApi.reducer,
        [scrapingApi.reducerPath]: scrapingApi.reducer,
    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(
        authApi.middleware,
        logoutApi.middleware,
        utilitiesApi.middleware,
        orderApi.middleware,
        travelApi.middleware,
        accountApi.middleware,
        landingApi.middleware,
        scrapingApi.middleware,
    ),
});

setupListeners(store.dispatch);

export type AppDispatch = typeof store.dispatch;
export const useAppDispatch = () => useDispatch<AppDispatch>();

export default store;
