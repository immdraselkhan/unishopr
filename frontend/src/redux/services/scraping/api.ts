import {createApi, fetchBaseQuery} from "@reduxjs/toolkit/query/react"
import {Constants} from "@utils/constants"
import {ScrapperReq, ScrapperRes} from "@redux/services/scraping/type"
import {axiosBaseQuery, validateStatus} from "@utils/auth";

export const scrapingApi = createApi({
    reducerPath: "scrapingApi",
    baseQuery: axiosBaseQuery({ auth: "basic", baseUrl: Constants.SCRAPING_ENDPOINT }),
    endpoints: (builder) => ({
        scrapper: builder.mutation<ScrapperRes, ScrapperReq>({
            query: (args) => ({
                url: `scraping?url=${args.url}`,
                method: 'POST',
                validateStatus: (response, result) => validateStatus({status: response.status, message: result.message, action: () => args.action(result.data), alert: false})
            })
        }),
    }),
});

export const {useScrapperMutation} = scrapingApi;
