import React from "react";
import { AppProps } from "next/app";
import { Provider } from "react-redux";
import {Toaster} from "react-hot-toast";
import store from "@redux/store";
import Layout from "@components/layout/layout";
import { DefaultSeo } from 'next-seo';

import "@fontsource/open-sans";
import "@fontsource/open-sans/600.css";
import "@fontsource/open-sans/700.css";
import "@fontsource/satisfy";

import "@styles/scrollbar.css";
import "@styles/swiper-carousel.css";
import "@styles/custom-plugins.css";
import "@styles/tailwind.css";
import "@styles/global.css";

function MyApp({ Component, pageProps }: AppProps): JSX.Element {
    return (
        <Provider store={store}>
            {/*<head>*/}
            {/*    <title>Unishopr | Buy & Bring</title>*/}
            {/*    <meta name="title" content="Unishopr | Buy & Bring" />*/}
            {/*    <meta name="description" content="A doorstep of every brand & e-commerce site from the USA, Malaysia & India to Bangladesh. Order original products from Amazon USA, Amazon India, Flipkart,eBay, Walmart, Shopee, Lazada, Puma, Adidas, Nike & Many more websites." />*/}
            {/*    <meta property="og:type" content="website" />*/}
            {/*    <meta property="og:title" content="Unishopr | Buy & Bring" />*/}
            {/*    <meta property="og:description" content="USA,Malaysia & India তে এখন শপিং করুন ঘরে বসেই!" />*/}
            {/*    <meta property="og:image" content="https://admin.unishopr.com/og-image.jpg" />*/}
            {/*    <meta property="og:image:width" content="1200" />*/}
            {/*    <meta property="og:image:height" content="628" />*/}
            {/*    <meta name="theme-color" content="#ff1616" />*/}
            {/*    <link rel="icon" href="/favicons/favicon.ico" />*/}
            {/*    <link rel="icon" type="image/png" sizes="16x16" href="/favicons/favicon-16x16.png" />*/}
            {/*    <link rel="icon" type="image/png" sizes="32x32" href="/favicons/favicon-32x32.png" />*/}
            {/*    <link rel="icon" type="image/png" sizes="48x48" href="/favicons/favicon-48x48.png" />*/}
            {/*    <link rel="apple-touch-icon" sizes="60x60" href="/favicons/favicon-60x60.png" />*/}
            {/*    <link rel="apple-touch-icon" sizes="72x72" href="/favicons/favicon-72x72.png" />*/}
            {/*    <link rel="apple-touch-icon" sizes="76x76" href="/favicons/favicon-76x76.png" />*/}
            {/*    <link rel="icon" type="image/png" sizes="96x96" href="/favicons/favicon-96x96.png" />*/}
            {/*    <link rel="apple-touch-icon" sizes="114x114" href="/favicons/favicon-114x114.png" />*/}
            {/*    <link rel="icon" type="image/png" sizes="128x128" href="/favicons/favicon-128x128.png" />*/}
            {/*    <link rel="apple-touch-icon" sizes="152x152" href="/favicons/favicon-152x152.png" />*/}
            {/*    <link rel="apple-touch-icon" sizes="180x180" href="/favicons/favicon-180x180.png" />*/}
            {/*    <link rel="apple-touch-icon" sizes="192x92" href="/favicons/favicon-192x192.png" />*/}
            {/*    <link rel="icon" type="image/png" sizes="192x92" href="/favicons/favicon-192x192.png" />*/}
            {/*    <link rel="icon" type="image/png" sizes="512x512" href="/favicons/favicon-512x512.png" />*/}
            {/*</head>*/}
            <DefaultSeo
                openGraph={{
                    type: 'website',
                    locale: 'en_IE',
                    url: 'https://www.unishopr.com/',
                    siteName: 'Unishopr',
                    title: 'Unishopr | Buy & Bring',
                    description: 'A doorstep of every brand & e-commerce site from the USA, Malaysia & India to Bangladesh. Order original products from Amazon USA, Amazon India, Flipkart,eBay, Walmart, Shopee, Lazada, Puma, Adidas, Nike & Many more websites.',
                    images: [
                        {
                            url: 'https://unishopr.com/assets/images/og-image.jpg',
                            width: 1200,
                            height: 628,
                            alt: 'Unishopr | Buy & Bring',
                            type: 'image/jpeg',
                        }
                    ],
                }}
                additionalLinkTags={[
                    {
                        rel: 'icon',
                        href: 'https://www.unishopr.com/favicons/favicon.ico',
                    },
                ]}
            />

            <Layout>
                <Component {...pageProps} />
            </Layout>
            <Toaster />
        </Provider>
    );
}

export default MyApp;
