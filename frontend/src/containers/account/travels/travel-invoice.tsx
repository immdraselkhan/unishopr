import React, { FC } from "react";
import { Constants } from "@utils/constants";
import { localCountry } from "@utils/auth";
import { shortDate, shortDateWithTime } from "@utils/utilities";
import { TravelRes } from "@redux/services/travel/type";

const TravelInvoice: FC<{ travel: TravelRes | null }> = ({ travel }) => {
    const country = localCountry();

    return (
        <div className="bg-white rounded-lg w-full">
            <div className="px-5 md:px-20 py-20">
                <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
                    <div className="flex flex-col">
                        <h2 className="text-3xl sm:py-5">{travel?.user?.firstName} {travel?.user?.lastName}</h2>
                        {/* <span className="font-normal text-sm">{order?.user?._id?.email}</span> */}
                    </div>
                    <div className="flex flex-col sm:justify-end sm:items-end">
                        <h2 className="text-3xl sm:py-5">Travel</h2>
                        <dl className="max-w-1/2">
                            <div className="grid grid-cols-2 items-end">
                                <dt className="font-normal text-sm">
                                    Travel Id:
                                </dt>
                                <dd className="text-sm text-heading font-bold ms-2">
                                    {travel?.travelId}
                                </dd>
                            </div>
                            <div className="grid grid-cols-2 items-end">
                                <dt className="font-normal text-sm">
                                    Travel Date:
                                </dt>
                                <dd className="text-sm text-heading font-bold ms-2">
                                    {travel?.travelDate ? shortDate(travel?.travelDate) : "N/A"}
                                </dd>
                            </div>
                            <div className="grid grid-cols-2 items-end">
                                <dt className="font-normal text-sm">
                                    From:
                                </dt>
                                <dd className="text-sm text-heading font-bold ms-2">
                                    {travel?.route.from.name}
                                </dd>
                            </div>
                            <div className="grid grid-cols-2 items-end">
                                <dt className="font-normal text-sm">
                                    To:
                                </dt>
                                <dd className="text-sm text-heading font-bold ms-2">
                                    {travel?.route.to.name}
                                </dd>
                            </div>
                            <div className="grid grid-cols-2 items-end">
                                <dt className="font-normal text-sm">
                                    Capacity:
                                </dt>
                                <dd className="text-sm text-heading font-bold ms-2">
                                    {travel?.weight.capacity} kg
                                </dd>
                            </div>
                            <div className="grid grid-cols-2 items-end">
                                <dt className="font-normal text-sm">
                                    Loaded:
                                </dt>
                                <dd className="text-sm text-heading font-bold ms-2">
                                    {travel?.weight.loaded} kg
                                </dd>
                            </div>
                        </dl>
                    </div>
                </div>

                <div className="md:flex mt-20">
                    {travel?.leads?.length && travel?.leads[0]?._id?.updates?.length ? (
                        <ol className="relative border-l border-gray-300 dark:border-gray-700 pr-5">
                            {travel.leads[0]._id?.updates?.map((update: any, ai: any) => (
                                <li className="mb-10 ml-4" key={ai}>
                                    <div className="absolute w-3 h-3 bg-gray-500 rounded-full mt-1.5 -left-1.5 border border-white dark:border-gray-900 dark:bg-gray-700" />
                                    <time className="mb-1 text-sm font-normal leading-none">{shortDateWithTime(update.createdAt)}</time>
                                    <h3 className="text-md font-semibold text-heading">{update.title}</h3>
                                    <p className="mb-4 text-sm font-regular text-heading">{update.description}</p>
                                </li>
                            ))}
                        </ol>
                    ) : null}

                    <div className="w-full">
                        <div className="pt-12 md:pt-0">
                            <div className="flex p-4 rounded-md bg-gray-150 text-sm font-semibold text-heading">
                                <span>Product</span>
                                <span className="ms-auto text-right">Price</span>
                            </div>

                            {travel?.leads.map((lead: any, li: any) => (
                                <div className="border-b border-gray-300 py-4 items-center lg:px-3" key={li}>
                                    <div className="flex py-2">
                                        <div className="flex border rounded-md border-gray-300 w-16 h-16 flex-shrink-0">
                                            <img
                                                src={lead?.photo ? Constants.S3_BASE_URL(lead.photo) : "/assets/placeholder/order-product.svg"}
                                                width="64"
                                                height="64"
                                                className="object-cover"
                                                alt=""
                                            />
                                        </div>
                                        <h6 className="text-sm ps-3 font-regular text-heading">
                                            {lead.name}
                                        </h6>
                                        <div className="flex ms-auto text-heading text-sm ps-2 flex-shrink-0">
                                            {country?.currencySymbol}&nbsp;{lead.price}x{lead.quantity}
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default TravelInvoice;
