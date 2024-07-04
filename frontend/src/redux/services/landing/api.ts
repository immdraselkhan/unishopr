import { createApi } from "@reduxjs/toolkit/query/react"
import { Constants } from "@utils/constants"
import { baseQuery } from "@utils/auth"
import {
    ProductsRes,
    ProductsReq,
    ProductRes,
    newArrivalRes,
    RecentOrderRes,
    bannersRes,
    brandsRes, 
    NotificationsRes,
    SimpleRes,
    UpdateNotificationsReq,
} from "@redux/services/landing/type";

export const landingApi = createApi({
    reducerPath: "landingApi",
    baseQuery: baseQuery({ auth: Constants.AUTH_TYPE.basic }),
    endpoints: (builder) => ({
        products: builder.query<ProductsRes, ProductsReq>({
            query: (arg) => `${Constants.PRODUCTS}?page=${arg.page}&perPage=${arg.perPage}&sort=${arg.sort}&categoryId=${arg.categoryId}&subCategoryId=${arg.subCategoryId}&childCategoryId=${arg.childCategoryId}`,
        }),
        product: builder.query<ProductRes, string>({
            query: (_id) => `${Constants.LANDING}/product/${_id}`,
        }),
        newArrivals: builder.query<newArrivalRes, string>({
            query: (arg) => `${Constants.PRODUCTS}/new-arrivals`,
        }),
        bestSelling: builder.query<newArrivalRes, string>({
            query: (arg) => `${Constants.PRODUCTS}/best-selling`,
        }),
        recentOrders: builder.query<RecentOrderRes, string>({
            query: (arg) => `${Constants.PRODUCTS}/recent-orders`,
        }),
        banners: builder.query<bannersRes, string>({
            query: () => `${Constants.LANDING}/banners`,
        }),
        brands: builder.query<brandsRes, string>({
            query: () => `${Constants.LANDING}/brands`,
        }),
        notifications: builder.query<NotificationsRes, string>({
            query: () => `${Constants.LANDING}/notifications`,
        }),
        updateNotifications: builder.mutation<SimpleRes, UpdateNotificationsReq>({
            query: (args) => ({
                url: `${Constants.LANDING}/update-notifications`,
                method: 'PUT',
                body: args.data,
            })
        }),
    }),
});

export const {
    useProductsQuery,
    useProductQuery,
    useRecentOrdersQuery,
    useNewArrivalsQuery,
    useBestSellingQuery,
    useBannersQuery,
    useBrandsQuery,
    useNotificationsQuery,
    useUpdateNotificationsMutation
} = landingApi
