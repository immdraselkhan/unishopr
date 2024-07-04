import React, { FormEvent, Fragment, useEffect, useState } from "react";
import Image from "next/image";
import Link from "@components/ui/link";
import Router, { useRouter } from "next/router";
import { IoChatbubbleEllipsesOutline, IoCheckmarkCircleOutline } from "react-icons/io5";
import { useWindowSize } from "@utils/use-window-size";
import Input from "@components/ui/input";
import Button from "@components/ui/button";
import { BsArrowRightCircle } from "react-icons/bs";
import Divider from "@components/ui/divider";
import ModalVideo from "react-modal-video";
import "react-modal-video/css/modal-video.css";
import Container from "@components/ui/container";
import Carousel from "@components/ui/carousel/carousel";
import { SwiperSlide } from "swiper/react";
import SectionHeader from "@components/common/section-header";
import BannerCard from "@components/common/banner-card";
import ProgressCard from "@components/common/progress-card";
import Card from "@components/common/card";
import CollectionCard from "@components/common/collection-card";
import { getProductDiscount, isEven } from "@utils/utilities";
import TextInformation from "@components/common/text-information";
import Text from "@components/ui/text";
import ProductFeedLoader from "@components/ui/loaders/product-feed-loader";
import { Constants } from "@utils/constants";
import {
    useNewArrivalsQuery,
    useBestSellingQuery,
    useBannersQuery,
    useBrandsQuery,
    useRecentOrdersQuery
} from "@redux/services/landing/api";
import {LeadProduct, Product} from "@redux/services/landing/type";
import ProductBox from "@containers/products/product-box";
import Modal from "@components/common/modal/modal";
import ProductCardLoader from "@components/ui/loaders/product-card-loader";
import LoginForm from "@containers/auth/login-form";
import OrderProductBox from "@containers/products/Order-product-box";

const Landing: React.FC = () => {
    const router = useRouter();
    const { auth, redirect } = router.query;
    const year = new Date().getFullYear();
    const { width } = useWindowSize();
    const newArrivals = useNewArrivalsQuery("")
    const bestSellings = useBestSellingQuery("")
    const recentOrders = useRecentOrdersQuery("")
    const banners = useBannersQuery("")
    const brands = useBrandsQuery("")

    const [productModal, setProductModal] = useState<{ show: boolean, product: Product | null }>({ show: false, product: null })
    const [orderProductModal, setOrderProductModal] = useState<{ show: boolean, product: LeadProduct | null }>({ show: false, product: null })
    const [authModal, setAuthModal] = useState(false);

    useEffect(() => {
        if (auth && auth === 'signIn') {
            console.log(auth)
            console.log(redirect)
            setAuthModal(!authModal)
        }
    }, [auth])

    const data = {
        exclusiveName: "Shop Anywhere",
        exclusiveData: [
            {
                id: 1,
                slug: "/order",
                buttonText: "Request with Unishopr",
                image: `/assets/images/exclusive/women-${Math.floor((Math.random() * 7) + 1)}.png`,
                backgroundColor: "bg-gray-150",
            },
            {
                id: 2,
                slug: "/travel",
                buttonText: "Travel with Unishopr",
                image: "/assets/images/exclusive/men.png",
                backgroundColor: "bg-linenSecondary",
            },
        ],
        featureData: [
            {
                id: 1,
                icon: "/assets/images/feature/delivery.png",
                title: "Fastest Delivery",
                description: "Doorstep delivery of Cross Border Trade products in 25 days",
            },
            {
                id: 2,
                icon: "/assets/images/feature/support.png",
                title: "Best Support",
                description: "Feel free to contact us via Call, Live Chat, and Facebook.",
            },
            {
                id: 3,
                icon: "/assets/images/feature/refund.png",
                title: "Trusted Refund Policy",
                description: "Shop without Hesitation as you are covered by refund policy",
            },
            {
                id: 4,
                icon: "/assets/images/feature/emi.png",
                title: "EMI",
                description: "Upto 36 months EMI",
            },
        ],
        appDownloadData: {
            title: "The Traveler App",
            subTitle: "lorem ipsum dolet togor",
            appImage: "/assets/images/app.png",
            appButtons: [
                {
                    id: 1,
                    slug: "/#",
                    altText: "button-app-store",
                    appButton: "/assets/images/app-store.svg",
                    buttonWidth: 209,
                    buttonHeight: 60,
                },
                {
                    id: 2,
                    slug: "/#",
                    altText: "button-play-store",
                    appButton: "/assets/images/play-store.svg",
                    buttonWidth: 209,
                    buttonHeight: 60,
                },
            ],
        }
    };

    const breakpoints = {
        "1025": {
            slidesPerView: 3,
            spaceBetween: 28,
        },
        "480": {
            slidesPerView: 2,
            spaceBetween: 20,
        },
        "0": {
            slidesPerView: 1,
            spaceBetween: 12,
        },
    };

    const brandBreakpoints = {
        "1720": {
            slidesPerView: 8,
            spaceBetween: 28,
        },
        "1400": {
            slidesPerView: 7,
            spaceBetween: 28,
        },
        "1025": {
            slidesPerView: 6,
            spaceBetween: 20,
        },
        "768": {
            slidesPerView: 5,
            spaceBetween: 20,
        },
        "500": {
            slidesPerView: 4,
            spaceBetween: 20,
        },
        "0": {
            slidesPerView: 3,
            spaceBetween: 12,
        },
    };

    const flashSaleCarouselBreakpoint = {
        "1280": {
            slidesPerView: 1,
        },
        "768": {
            slidesPerView: 2,
            spaceBetween: 20,
        },
        "0": {
            slidesPerView: 1,
        },
    };


    const [orderForm, setOrderForm] = useState({ url: "" });
    const handleOrderSubmit = (e: FormEvent) => {
        e.preventDefault();

        const accessToken = localStorage.getItem(Constants.ACCESS_TOKEN);
        if (accessToken) {
            router.push(`/order?url=${orderForm.url}`)
        } else {
            setAuthModal(true)
        }
    }

    const [isOpen, setOpen] = useState(false);
    const openVideo = (e: any) => {
        e.preventDefault();
        setOpen(true);
    }

    const bannerStaticOne = banners?.data?.data?.find(x => x.position === "landingStaticOne");
    const bannerSlider = banners?.data?.data?.filter(x => x.position === "landingSlider");
    const bannerStaticTwo = banners?.data?.data?.find(x => x.position === "landingStaticTwo");
    const landingApp = banners?.data?.data?.find(x => x.position === "landingApp");
    const travelerBanner = banners?.data?.data?.find(x => x.position === "landingTraveler");

    return (
        <Fragment>
            <div className={`rounded-md overflow-hidden lg:block mb-12 md:mb-14 xl:mb-16 px-2.5 mx-auto max-w-[1920px]`}>
                <div className="lg:flex justify-between">
                    {data.exclusiveData.slice(0, 2).map((item: any) => (
                        <div
                            className={`group lg:w-2/4 flex justify-between items-end relative transition duration-200 ease-in flex-row-reverse ${item.backgroundColor}`}
                            key={`exclusive--key${item.id}`}
                        >
                            <div
                                className={`exclusiveImage relative z-10 flex transform transition duration-200 ease-in group-hover:scale-105 ms-auto 2xl:pe-24 3xl:pe-40`}
                            >
                                <Image
                                    src={item.image}
                                    alt={item.buttonText}
                                    width={600}
                                    height={600}
                                />
                            </div>
                            <Link
                                href={item.slug}
                                className={`absolute z-10 bottom-3 sm:bottom-5 inline-block bg-white shadow-product rounded-md text-heading lowercase text-sm xl:text-xl 2xl:text-xl sm:uppercase px-3 sm:px-5 xl:px-6 2xl:px-8 py-2.5 sm:py-4 xl:py-5 2xl:py-7 transform transition duration-300 ease-in-out hover:bg-heading hover:text-white ${item.id === 2 ? "start-3 sm:start-5 xl:start-7" : "end-3 sm:end-5 xl:end-7"
                                    } xl:bottom-7 xl:top-auto`}
                            >
                                {item.buttonText}
                            </Link>
                            {data.exclusiveName && (
                                <div
                                    className={`z-0 absolute top-10 xl:top-12 2xl:top-16 3xl:top-24 uppercase text-black opacity-10 text-xl xl:text-2xl 3xl:text-3xl tracking-widest leading-5 ${item.id === 2 ? "start-5 xl:start-7" : "end-5 xl:end-7"
                                        }`}
                                >
                                    {item.id !== 2
                                        ? `${data.exclusiveName}`
                                        : "Travel Everywhere"}
                                </div>
                            )}

                            {year && (
                                <div
                                    className={`exclusiveYear absolute top-16 xl:top-20 2xl:top-24 3xl:top-32 start-0 z-10 text-black font-bold leading-none tracking-widest ${item.id === 2 ? "text-start pl-4 start-0" : "text-end end-0"
                                        }`}
                                >
                                    {item.id !== 2
                                        ? year.toString().slice(0, 2)
                                        : year.toString().slice(2, 4)}
                                </div>
                            )}
                        </div>
                    ))}
                </div>
            </div>

            <form onSubmit={handleOrderSubmit}>
                <div className="my-10 lg:my-16 xl:my-20 px-4 md:px-10 lg:px-0 pb-2 lg: xl:max-w-screen-xl mx-auto flex flex-col md:flex-row w-full mx-auto">
                    <div className=" flex h-full flex-col mx-auto lg:w-3/4 ">
                        <div className="flex pb-7 md:pb-9 md:-mt-1.5">
                            <h4 className="text-2xl md:text-5xl 2xl:text-3xl font-bold text-heading">
                                Request products from USA, India and Malaysia
                            </h4>
                        </div>
                        <div className="flex flex-col space-y-5 text-semibold">
                            <div className="flex flex-col md:flex-row space-y-2 md:space-y-0">
                                <div className="flex items-center me-2 justify-start text-sm md:text-base">
                                    <span className="w-6 h-6 me-2 lg:me-2 flex items-center justify-center flex-shrink-0">
                                        <IoCheckmarkCircleOutline className="w-5 h-5" />
                                    </span>
                                    Receive your product in 1-2 weeks
                                </div>
                                <div className="flex items-center justify-start text-sm md:text-base">
                                    <span className="w-6 h-6 lg:ml-2 me-2 lg:me-2 flex items-center justify-center flex-shrink-0">
                                        <IoCheckmarkCircleOutline className="w-5 h-5" />
                                    </span>
                                    Delivered by verified trusted travelers
                                </div>
                            </div>
                            <div className="flex flex-col md:flex-row space-y-5 md:space-y-0 space-x-4 items-center">
                                <Input
                                    name="url"
                                    onChange={({ target }) => setOrderForm({ ...orderForm, url: target.value })}
                                    className="relative w-full"
                                    placeholderKey="Paste the URL of the product"
                                    required={true}
                                    errorKey={""}
                                    type="url"
                                    variant="solid"
                                />
                                <div className="relative">
                                    <Button
                                        type="submit"
                                        id="step-one-submit-button"
                                        className="h-12 lg:h-12 text-sm lg:text-base w-full sm:w-auto"
                                    >
                                        Request
                                    </Button>
                                </div>
                            </div>
                            <div className="flex items-center justify-start text-sm md:text-base">
                                <span className="w-6 h-6 me-2 lg:me-2 flex items-center justify-center flex-shrink-0">
                                    <BsArrowRightCircle className="w-4 h-4" />
                                </span>
                                <a href="https://www.youtube.com/watch?v=MnKRdirIbbc&ab_channel=UniShoprInc" onClick={openVideo}>
                                    <u>
                                        <span> How to order from abroad with Unishopr </span>
                                    </u>
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
                {
                    typeof window !== "undefined" &&
                    (
                        <ModalVideo
                            channel="youtube"
                            // autoplay
                            isOpen={isOpen}
                            videoId="MnKRdirIbbc"
                            onClose={() => setOpen(false)}
                        />
                    )
                }
            </form >
            <Container>
                <div className="grid grid-cols-1 xl:grid-cols-3 gap-y-12 lg:gap-y-14 xl:gap-y-0 xl:gap-x-7  mb-12 lg:mb-14 xl:mb-7">
                    {
                        bannerStaticOne && (
                            <div className="mx-auto xl:h-full xl:col-span-2">
                                <Link
                                    // @ts-ignore
                                    target={"_blank"}
                                    href={bannerStaticOne.url}
                                    className="h-full group flex justify-center relative overflow-hidden"
                                >
                                    <img
                                        src={Constants.S3_BASE_URL(bannerStaticOne ? bannerStaticOne.photo : "")}
                                        width={width < 480 ? 450 : 1190}
                                        height={width < 480 ? 150 : 450}
                                        alt={bannerStaticOne?.name}
                                        className="bg-gray-300 object-cover w-full"
                                    />
                                    <div className="absolute top-0 -start-full h-full w-1/2 z-5 block transform -skew-x-12 bg-gradient-to-r from-transparent to-white opacity-40 group-hover:animate-shine" />
                                </Link>
                            </div>
                        )
                    }
                    <div
                        className="flex flex-col border border-gray-300 rounded-lg pt-6 sm:pt-7 lg:pt-8 xl:pt-7 2xl:pt-9 px-4 md:px-5 lg:px-7 pb-6 lg:pb-7 gridSlim xl:px-5 2xl:px-7 col-span-full xl:col-span-1 lg:mb-1 xl:mb-0"
                    >
                        <SectionHeader
                            sectionHeading="Flash Sale"
                            className="mb-4 md:mb-5 lg:mb-6 xl:mb-5 2xl:mb-6 3xl:mb-8"
                        />
                        <div
                            className="heightFull"
                        >
                            <Carousel
                                breakpoints={
                                    flashSaleCarouselBreakpoint ? flashSaleCarouselBreakpoint : breakpoints
                                }
                                autoplay={{
                                    delay: 3500,
                                }}
                                buttonSize="small"
                                buttonGroupClassName="-mt-8 md:-mt-10 2xl:-mt-12 3xl:-mt-14"
                                className="-mx-0 md:-mx-2.5 xl:-mx-0"
                            >
                                {bestSellings.data?.data?.map((product) => (
                                    <SwiperSlide key={`product--key${product._id}`}>
                                        <div className={"flex justify-center align-items-center"}>
                                            <div className="h-full flex flex-col justify-between align-items-center ">
                                                <div className="">
                                                    <div
                                                        key={product._id}
                                                        className="group box-border overflow-hidden flex rounded-md cursor-pointer pe-0 pb-2 lg:pb-3 flex-col items-start bg-white transition duration-200 ease-in-out transform hover:-translate-y-1 hover:md:-translate-y-1.5"
                                                        onClick={() => setProductModal({ show: true, product: product })}
                                                        role="button"
                                                        title={product?.name}
                                                    >
                                                        <div className="flex">
                                                            <img
                                                                src={Constants.S3_BASE_URL(product.file.cover)}
                                                                // width={400}
                                                                // height={}
                                                                // loading={false}
                                                                // quality={100}
                                                                style={{ maxHeight: "400px", maxWidth:"400px" }}
                                                                alt={product.name}
                                                                className="bg-gray-300 object-cover rounded-s-md w-full rounded-md transition duration-200 ease-in group-hover:rounded-b-none"
                                                            />
                                                        </div>
                                                        <div className="w-full overflow-hidden md:px-2.5 xl:px-4 pt-4">
                                                            <h2 className="text-heading font-bold max-w-[250px] truncate mb-1 text-sm md:text-base md:mb-1.5 text-sm sm:text-base md:text-sm lg:text-base xl:text-lg">
                                                                {product?.name}
                                                            </h2>
                                                            <p className="text-body text-xs lg:text-sm leading-normal xl:leading-relaxed max-w-[250px] truncate">
                                                                {product?.description.short}
                                                            </p>
                                                            <div
                                                                className={`text-heading font-semibold text-sm sm:text-base mt-1.5 space-s-2 lg:text-lg lg:mt-2.5`}
                                                            >
                                                                {getProductDiscount(product.price, product.discount).availability ? (
                                                                    <>
                                                                        <span className="inline-block"> ৳ {product?.price.new}</span>
                                                                        <del className="sm:text-base font-normal text-gray-800">
                                                                            ৳ {product?.price.regular}
                                                                        </del>
                                                                    </>
                                                                ) :
                                                                    <span className="inline-block"> ৳ {product?.price.regular}</span>
                                                                }
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                                {/*<ProgressCard*/}
                                                {/*    soldProduct={10}*/}
                                                {/*    totalProduct={product?.stock.quantity}*/}
                                                {/*/>*/}
                                            </div>
                                        </div>
                                    </SwiperSlide>
                                ))}
                            </Carousel>
                        </div>
                    </div>
                </div>
                {
                    bannerSlider && (
                        <div className='mb-12 md:mb-12 lg:mb-14 pb-0.5 xl:pb-1.5'>
                            <Carousel breakpoints={breakpoints} autoplay={{ delay: 5000 }}>
                                {bannerSlider?.map((banner: any) => (
                                    <SwiperSlide key={`promotion-banner-key-${banner?._id}`}>
                                        <BannerCard
                                            banner={banner}
                                            href={banner.url}
                                            effectActive={true}
                                        />
                                    </SwiperSlide>
                                ))}
                            </Carousel>
                        </div>
                    )
                }

                <Divider />

                <div className="mb-9 md:mb-10 xl:mb-12">
                    <SectionHeader sectionHeading={"Best Sellers"} />

                    <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 2xl:grid-cols-5 gap-x-3 md:gap-x-5 xl:gap-x-7 gap-y-3 xl:gap-y-5 2xl:gap-y-8">
                        {bestSellings.isLoading ? <ProductFeedLoader limit={10} uniqueKey="best-selling-product" /> : null}
                        {
                            bestSellings.data?.data?.map((bestSelling, pi) => (
                                <div
                                    key={pi}
                                    className="group box-border overflow-hidden flex rounded-md cursor-pointer pe-0 pb-2 lg:pb-3 flex-col items-start bg-white transition duration-200 ease-in-out transform hover:-translate-y-1 hover:md:-translate-y-1.5 hover:shadow-product"
                                    onClick={() => setProductModal({ show: true, product: bestSelling })}
                                    role="button"
                                    title={bestSelling?.name}
                                >
                                    <div className="flex mb-3 md:mb-3.5">
                                        <img
                                            src={Constants.S3_BASE_URL(bestSelling.file.cover)}
                                            width={340}
                                            height={440}
                                            // loading={false}
                                            // quality={100}
                                            alt={bestSelling.name}
                                            className="bg-gray-300 object-cover rounded-s-md w-full rounded-md transition duration-200 ease-in group-hover:rounded-b-none"
                                        />
                                    </div>
                                    <div className="w-full overflow-hidden md:px-2.5 xl:px-4">
                                        <h2 className="text-heading font-semibold truncate mb-1 text-sm md:text-base md:mb-1.5 text-sm sm:text-base md:text-sm lg:text-base xl:text-lg">
                                            {bestSelling?.name}
                                        </h2>
                                        <p className="text-body text-xs lg:text-sm leading-normal xl:leading-relaxed max-w-[250px] truncate">
                                            {bestSelling?.description.short}
                                        </p>
                                        <div
                                            className={`text-heading font-semibold text-sm sm:text-base mt-1.5 space-s-2 lg:text-lg lg:mt-2.5`}
                                        >
                                            {getProductDiscount(bestSelling.price, bestSelling.discount).availability ? (
                                                <>
                                                    <span className="inline-block"> ৳ {bestSelling?.price.new}</span>
                                                    <del className="sm:text-base font-normal text-gray-800">
                                                        ৳ {bestSelling?.price.regular}
                                                    </del>
                                                </>
                                            ) :
                                                <span className="inline-block"> ৳ {bestSelling?.price.regular}</span>
                                            }
                                        </div>
                                    </div>
                                </div>
                            ))
                        }
                    </div>
                </div>

                {
                    bannerStaticTwo && (
                        <BannerCard
                            key={`banner--key${bannerStaticTwo?.name}`}
                            banner={bannerStaticTwo}
                            href={bannerStaticTwo?.url}
                            className="mb-12 lg:mb-14 xl:mb-16 pb-0.5 lg:pb-1 xl:pb-0"
                            classNameInner="h-28 sm:h-auto"
                        />
                    )
                }
                <div className="mb-9 md:mb-10 xl:mb-12">
                    <SectionHeader sectionHeading={"New Arrivals"} />

                    <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 2xl:grid-cols-5 gap-x-3 md:gap-x-5 xl:gap-x-7 gap-y-3 xl:gap-y-5 2xl:gap-y-8">
                        {newArrivals.isLoading ? <ProductFeedLoader limit={10} uniqueKey="new-arrivals-product" /> : null}
                        {
                            newArrivals.data?.data?.map((newArrival, pi) => (
                                <div
                                    key={pi}
                                    className="group box-border overflow-hidden flex rounded-md cursor-pointer pe-0 pb-2 lg:pb-3 flex-col items-start bg-white transition duration-200 ease-in-out transform hover:-translate-y-1 hover:md:-translate-y-1.5 hover:shadow-product"
                                    onClick={() => setProductModal({ show: true, product: newArrival })}
                                    role="button"
                                    title={newArrival?.name}
                                >
                                    <div className="flex mb-3 md:mb-3.5">
                                        <img
                                            src={Constants.S3_BASE_URL(newArrival.file.cover)}
                                            width={340}
                                            height={440}
                                            // loading={false}
                                            // quality={100}
                                            alt={newArrival.name}
                                            className="bg-gray-300 object-cover rounded-s-md w-full rounded-md transition duration-200 ease-in group-hover:rounded-b-none"
                                        />
                                    </div>
                                    <div className="w-full overflow-hidden md:px-2.5 xl:px-4">
                                        <h2 className="text-heading font-semibold truncate mb-1 text-sm md:text-base md:mb-1.5 text-sm sm:text-base md:text-sm lg:text-base xl:text-lg">
                                            {newArrival?.name}
                                        </h2>
                                        <p className="text-body text-xs lg:text-sm leading-normal xl:leading-relaxed max-w-[250px] truncate">
                                            {newArrival?.description.short }
                                        </p>
                                        <div
                                            className={`text-heading font-semibold text-sm sm:text-base mt-1.5 space-s-2 lg:text-lg lg:mt-2.5 position-relative`}
                                        >
                                            {getProductDiscount(newArrival.price, newArrival.discount).availability ? (
                                                <>
                                                    <span className="inline-block"> ৳ {newArrival?.price.new}</span>
                                                    <del className="sm:text-base font-normal text-gray-800">
                                                        ৳ {newArrival?.price.regular}
                                                    </del>
                                                </>
                                            ) :
                                                <span className="inline-block"> ৳ {newArrival?.price.regular}</span>
                                            }
                                        </div>
                                    </div>
                                </div>
                            ))
                        }
                    </div>
                </div>
                <Divider />

                <div className="mb-9 md:mb-10 xl:mb-12">
                    <SectionHeader sectionHeading={"Recent Orders"} />
                    <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 2xl:grid-cols-5 gap-x-3 md:gap-x-5 xl:gap-x-7 gap-y-3 xl:gap-y-5 2xl:gap-y-8">
                        {recentOrders.isLoading ? <ProductFeedLoader limit={10} uniqueKey="new-arrivals-product" /> : null}
                        {
                            recentOrders.data?.data?.map((recentOrder, re) => (
                                <div
                                    key={re}
                                    className="group box-border overflow-hidden flex rounded-md cursor-pointer pe-0 pb-2 lg:pb-3 flex-col items-start bg-white transition duration-200 ease-in-out transform hover:-translate-y-1 hover:md:-translate-y-1.5 hover:shadow-product"
                                    onClick={() => setOrderProductModal({ show: true, product: recentOrder })}
                                    role="button"
                                    title={recentOrder?.name}
                                >
                                    <div className="flex mb-3 md:mb-3.5">
                                        <img
                                            src={recentOrder?.photo ?? "/assets/images/dummy-product.png"}
                                            width={340}
                                            height={440}
                                            // loading={false}
                                            // quality={100}
                                            alt={recentOrder.name}
                                            className="bg-gray-300 object-cover rounded-s-md w-full rounded-md transition duration-200 ease-in group-hover:rounded-b-none"
                                        />
                                    </div>
                                    <div className="w-full overflow-hidden md:px-2.5 xl:px-4">
                                        <h2 className="text-heading font-semibold truncate mb-1 text-sm md:text-base md:mb-1.5 text-sm sm:text-base md:text-sm lg:text-base xl:text-lg">
                                            {recentOrder?.name}
                                        </h2>
                                        <p className="text-body text-xs lg:text-sm leading-normal xl:leading-relaxed max-w-[250px] truncate">
                                            {recentOrder?.description}
                                        </p>
                                        <div
                                            className={`text-heading font-semibold text-sm sm:text-base mt-1.5 space-s-2 lg:text-lg lg:mt-2.5`}
                                        >
                                                <span className="inline-block"> ৳ {recentOrder?.price}</span>
                                        </div>
                                    </div>
                                </div>
                            ))
                        }
                    </div>
                </div>

                <Divider />
                <div className="mb-11 md:mb-11 lg:mb-12 xl:mb-14 lg:pb-1 xl:pb-0">
                    <SectionHeader sectionHeading="Top Brands" />
                    <Carousel
                        breakpoints={brandBreakpoints}
                        buttonGroupClassName="-mt-4 md:-mt-5 xl:-mt-7"
                        autoplay={{
                            delay: 4000,
                        }}
                    >
                        {
                            brands?.data?.data.map((brand) => (
                                <SwiperSlide key={`brand--key${brand.name}`}>
                                    <Card
                                        item={brand}
                                        variant="rounded"
                                        size="medium"
                                        href={{
                                            pathname: `${brand.url}`,
                                            query: {},
                                        }}
                                    />
                                </SwiperSlide>
                            ))}
                    </Carousel>
                </div>
                <div
                    className="mb-12 md:mb-14 xl:mb-16bg-gray-200 feature-block-wrapper border border-gray-300 rounded-md w-full grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-10 md:gap-12 xl:gap-0 overflow-hidden py-12 xl:py-0 sm:px-4 md:px-8 lg:px-16 xl:px-0"
                >
                    {data?.featureData.map((item) => (
                        <TextInformation item={item} key={item.id} />
                    ))}
                </div>
                <div
                    className=
                    "flex justify-between items-end rounded-lg bg-gray-200 pt-5 md:pt-8 lg:pt-10 xl:pt-14 px-6 md:px-12 lg:px-20 2xl:px-24 3xl:px-36 bg-linen"
                >
                    <div className="flex-shrink-0 w-full sm:w-60 md:w-96 lg:w-auto lg:max-w-lg xl:max-w-xl lg:flex lg:items-center pb-5 md:pb-8 lg:pb-12 xl:pb-16">
                        <div className="py-4 md:py-6 xl:py-8 text-center sm:text-start">
                            <Text
                                variant="mediumHeading"
                                className="-mt-1 mb-2 md:mb-3 lg:mb-3.5 xl:mb-4"
                            >
                                {landingApp?.name}
                            </Text>
                            <h2
                                className="text-heading text-md sm:text-xl md:text-3xl xl:text-4xl 2xl:text-5xl font-normal leading-7 sm:leading-8 md:leading-snug xl:leading-relaxed 2xl:leading-snug mb-6 md:mb-8 lg:mb-9 xl:mb-12 2xl:mb-14 lg:pe-20 2xl:pe-0"

                            >
                                {landingApp?.description}
                            </h2>
                            <div className="flex justify-center sm:justify-start space-s-2 md:space-s-3 px-6 sm:px-0">
                                {data.appDownloadData.appButtons?.map((item) => (
                                    <Link
                                        key={item.id}
                                        href={item.slug}
                                        className="inline-flex transition duration-200 ease-in hover:box-shadow hover:opacity-80"
                                    >
                                        <img
                                            src={item.appButton}
                                            alt={item.altText}
                                            className="w-36 lg:w-44 xl:w-auto"
                                            width={item.buttonWidth}
                                            height={item.buttonHeight}
                                        />
                                    </Link>
                                ))}
                            </div>
                        </div>
                    </div>
                    <div className="hidden sm:flex items-end ps-4 -me-0.5 2xl:-me-1.5 w-60 md:w-72 lg:w-96 xl:w-auto">
                        <img
                            src={Constants.S3_BASE_URL(landingApp ? landingApp.photo : "")}
                            alt={data.appDownloadData.subTitle}
                            width={375}
                            height={430}
                        />
                    </div>
                </div>

                {/* <div className="my-8 md:my-12 lg:my-16 xl:my-20 3xl:my-24 pb-5 lg:pb-3.5 2xl:pb-5 pt-3 lg:pt-1.5 2xl:pt-2 3xl:pt-3 text-center">
                    <div className="max-w-md mx-auto mb-4 md:mb-5 xl:mb-8 2xl:mb-10 3xl:mb-12">
                        <Text variant="mediumHeading" className="mb-2 md:mb-3 lg:mb-3.5">
                            Our Travelers
                        </Text>
                        <p className="text-body text-xs md:text-sm leading-6 md:leading-7">
                            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Alias aliquam commodi corporis deserunt ducimus eligendi et expedita illo, ipsum omnis pariatur quas quo vitae?
                        </p>
                    </div>
                    <div className="mb-2.5 md:mb-0 xl:mb-2 2xl:mb-4 3xl:mb-6 md:px-20 lg:px-40 xl:px-0 flex align-items-center justify-center">
                        <img
                            src={Constants.S3_BASE_URL(travelerBanner ? travelerBanner.photo : "")}
                            alt={travelerBanner?.name}
                            width={870}
                            height={300}
                        />
                    </div>
                </div> */}

                <div className={`bg-linen px-5 sm:px-8 md:px-16 2xl:px-24 flex flex-col xl:flex-row justify-center xl:justify-between items-center rounded-lg bg-gray-200 py-10 md:py-14 lg:py-16`}>
                    <div className="-mt-1.5 lg:-mt-2 xl:-mt-0.5 text-center xl:text-start mb-7 md:mb-8 lg:mb-9 xl:mb-0">
                        <Text
                            variant="mediumHeading"
                            className="mb-2 md:mb-2.5 lg:mb-3 xl:mb-3.5"
                        >
                            Get Expert Tips In Your Inbox
                        </Text>
                        <p className="text-body text-xs md:text-sm leading-6 md:leading-7">
                            Subscribe to our newsletter and stay updated.
                        </p>
                    </div>
                    <form
                        // onSubmit={handleSubmit(onSubmit)}
                        className="flex-shrink-0 w-full sm:w-96 md:w-[545px]"
                        noValidate
                    >
                        <div className="flex flex-col sm:flex-row items-start justify-end">
                            <Input
                                placeholderKey="Write your email here"
                                name={"subscribe"}
                                // onChange={({ target }) => setFormData({ ...formData, firstName: target.value })}
                                inputClassName="px-4 lg:px-7 h-12 lg:h-14 text-center sm:text-start bg-white"
                                variant="solid"
                                className="w-full"
                            />
                            <Button className="mt-3 sm:mt-0 w-full sm:w-auto sm:ms-2 md:h-full flex-shrink-0">
                                <span className="lg:py-0.5">Subscribe</span>
                            </Button>
                        </div>
                    </form>
                </div>
            </Container>

            <Modal
                open={productModal.show}
                onClose={() => setProductModal({ show: false, product: null })}
            >
                <ProductBox product={productModal.product} />
            </Modal>

            <Modal
                open={orderProductModal.show}
                onClose={() => setOrderProductModal({ show: false, product: null })}
            >
                <OrderProductBox product={orderProductModal.product} />
            </Modal>

            <Modal open={authModal} onClose={() => setAuthModal(!authModal)}>
                <LoginForm action={() => {
                    setAuthModal(false)
                    if (orderForm.url) router.push(`/order?url=${orderForm.url}`)
                    else {
                        // @ts-ignore
                        document.getElementById("step-one-submit-button").click();
                    }
                }} />
            </Modal>
        </Fragment >
    );
};

export default Landing;


