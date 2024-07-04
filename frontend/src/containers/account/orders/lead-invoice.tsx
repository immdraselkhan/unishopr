import Logo from "@components/ui/logo";
import React, { FC } from "react";
import { IoCheckmarkCircle } from "react-icons/io5";
import { LeadRes, OrderRes } from "@redux/services/order/type";
import { Constants } from "@utils/constants";
import { localCountry } from "@utils/auth";
import { shortDate, shortDateWithTime } from "@utils/utilities";
import { useUpdateLeadMutation } from "@redux/services/order/api";
import { confirmAlert } from "@utils/alert";
import { useRouter } from "next/router";

const LeadInvoice: FC<{ lead?: LeadRes | null, onConfirm?: () => void, onCancel?: () => void }> = ({ lead, onConfirm, onCancel }) => {
    const router = useRouter();
    const country = localCountry();
    const [updateLead, updateLeadParams] = useUpdateLeadMutation();

    return (
        <div className="bg-white rounded-lg w-full">
            <div className="px-5 md:px-20 py-20">
                {/*<div className="border border-gray-300 bg-gray-50 px-4 lg:px-5 py-4 rounded-md flex items-center justify-start text-heading text-sm md:text-base mb-6 lg:mb-8">*/}
                {/*    <span className="w-10 h-10 me-3 lg:me-4 rounded-full bg-gray-300 flex items-center justify-center flex-shrink-0">*/}
                {/*        <IoCheckmarkCircle className="w-5 h-5 text-green-600" />*/}
                {/*    </span>*/}
                {/*    Your order is {order?.status}*/}
                {/*</div>*/}

                <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
                    <div className="flex flex-col">
                        <h2 className="text-3xl sm:py-5">{lead?.user?.firstName} {lead?.user?.lastName}</h2>
                        <span className="font-normal text-sm">{lead?.user?._id?.email}</span>
                    </div>
                    <div className="flex flex-col sm:justify-end sm:items-end">
                        <h2 className="text-3xl sm:py-5">Order</h2>
                        <dl className="max-w-1/2">
                            <div className="grid grid-cols-2 items-end">
                                <dt className="font-normal text-sm">
                                    Lead ID
                                </dt>
                                <dd className="text-sm text-heading font-bold">
                                    {lead?.leadId}
                                </dd>
                            </div>
                            <div className="grid grid-cols-2">
                                <dt className="font-normal text-sm">
                                    Issue Date
                                </dt>
                                <dd className="text-sm text-heading font-bold">
                                    {lead?.createdAt ? shortDate(lead?.createdAt) : "N/A"}
                                </dd>
                            </div>
                        </dl>
                    </div>
                </div>

                {lead?.travel?.travelId ? (
                    <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 mt-10">
                        {lead?.payment ? (
                            <div className="flex flex-col">
                                <h2 className="text-3xl sm:py-5">Payment</h2>
                                <dl className="max-w-1/2">
                                    <div className="grid grid-cols-2 items-end">
                                        <dt className="font-normal text-sm">
                                            Gateway
                                        </dt>
                                        <dd className="text-sm text-heading font-bold">
                                            {lead?.payment?.gateway}
                                        </dd>
                                    </div>
                                    <div className="grid grid-cols-2">
                                        <dt className="font-normal text-sm">
                                            Invoice ID
                                        </dt>
                                        <dd className="text-sm text-heading font-bold">
                                            {lead?.payment?.invoiceNo}
                                        </dd>
                                    </div>
                                    <div className="grid grid-cols-2">
                                        <dt className="font-normal text-sm">
                                            Transaction No
                                        </dt>
                                        <dd className="text-sm text-heading font-bold">
                                            {lead?.payment?.transactionId}
                                        </dd>
                                    </div>
                                    <div className="grid grid-cols-2">
                                        <dt className="font-normal text-sm">
                                            Payment Date
                                        </dt>
                                        <dd className="text-sm text-heading font-bold">
                                            {lead?.payment?.updatedAt ? shortDate(lead.payment.updatedAt) : "N/A"}
                                        </dd>
                                    </div>
                                </dl>
                            </div>
                        ) : null}
                        <div className="flex flex-col sm:justify-end sm:items-end">
                            <h2 className="text-3xl sm:py-5">Traveler</h2>
                            <dl className="max-w-1/2">
                                <div className="grid grid-cols-2 items-end">
                                    <dt className="font-normal text-sm">
                                        Travel ID
                                    </dt>
                                    <dd className="text-sm text-heading font-bold">
                                        {lead?.travel?.travelId}
                                    </dd>
                                </div>
                                <div className="grid grid-cols-2">
                                    <dt className="font-normal text-sm">
                                        Traveler Name
                                    </dt>
                                    <dd className="text-sm text-heading font-bold">
                                        {lead?.travel?.user?.firstName}&nbsp;{lead?.travel?.user?.lastName}
                                    </dd>
                                </div>
                                <div className="grid grid-cols-2">
                                    <dt className="font-normal text-sm">
                                        Travel Route
                                    </dt>
                                    <dd className="text-sm text-heading font-bold">
                                        {`${lead?.travel?.route?.from?.name} - ${lead?.travel?.route?.to?.name}`}
                                    </dd>
                                </div>
                                <div className="grid grid-cols-2">
                                    <dt className="font-normal text-sm">
                                        Travel Date
                                    </dt>
                                    <dd className="text-sm text-heading font-bold">
                                        {lead?.travel?.travelDate ? shortDate(lead.travel.travelDate) : "N/A"}
                                    </dd>
                                </div>
                            </dl>
                        </div>
                    </div>
                ) : null}

                <div className="md:flex mt-20">
                    {lead?.updates?.length ? (
                        <ol className="relative border-l border-gray-300 dark:border-gray-700 pr-5">
                            {lead?.updates?.map((update, ui) => (
                                <li className="mb-10 ml-4" key={ui}>
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
                                <span className="ms-auto flex-shrink-0">Total</span>
                            </div>

                            <div className="border-b border-gray-300 py-4 items-center lg:px-3">
                                <div className="flex py-2">
                                    <div className="flex border rounded-md border-gray-300 w-16 h-16 flex-shrink-0">
                                        <img
                                            // src={lead?.photo ? Constants.S3_BASE_URL(lead?.photo) : "/assets/placeholder/order-product.svg"}
                                            src={lead?.photo ? lead?.photo : "/assets/placeholder/order-product.svg"}
                                            width="64"
                                            height="64"
                                            className="object-cover"
                                            alt=""
                                        />
                                    </div>
                                    <h6 className="text-sm ps-3 font-regular text-heading">
                                        {lead?.url ? <a className="underline hover:no-underline" href={lead.url} target="_blank">{lead?.name ? lead?.name : lead?.url}</a> : <span>{lead?.name}</span>}
                                    </h6>
                                    <div className="flex ms-auto text-heading text-sm ps-2 flex-shrink-0">
                                        {country?.currencySymbol}&nbsp;{lead?.price}&nbsp;x{lead?.quantity}
                                    </div>
                                </div>

                                {lead?.checkout?.attributes?.map((attribute, ai) => (
                                    <div className="flex" key={ai}>
                                        <h6 className="text-sm ps-3 font-regular text-heading">
                                            + {attribute?.name}
                                        </h6>
                                        <div className="flex ms-auto text-heading text-sm ps-2 flex-shrink-0">
                                            {country?.currencySymbol}&nbsp;{attribute?.value}
                                        </div>
                                    </div>
                                ))}
                            </div>

                            <div className="flex items-center py-4 lg:py-5 border-b border-gray-300 text-sm lg:px-3 w-full font-semibold text-heading last:border-b-0 last:text-base last:pb-0">
                                Total
                                <span className="ms-auto flex-shrink-0">{country?.currencySymbol}&nbsp;{lead?.checkout?.totalAmount}</span>
                            </div>
                            {lead && lead.status === "checkout" && <div className="flex justify-end pt-6">
                                <button
                                    className="text-sm leading-4 bg-heading text-white px-4 py-2.5 inline-block rounded-md hover:text-white hover:bg-gray-600 mx-1"
                                    onClick={() => router.replace("/account/checkout")}
                                >
                                    Pay Now
                                </button>
                            </div>}
                            {lead && lead.status === "ongoing" && <div className="flex justify-end pt-6">
                                <button
                                    className="text-sm leading-4 bg-heading text-white px-4 py-2.5 inline-block rounded-md hover:text-white hover:bg-gray-600 mx-1"
                                    onClick={() => confirmAlert({ title: "Are you sure you want to confirm this order?" }, (cb) => {
                                        updateLead({
                                            data: {
                                                leadId: lead._id,
                                                status: "resolved"
                                            },
                                            action: () => onConfirm ? onConfirm() : null
                                        })
                                    })}
                                >
                                    Confirm
                                </button>
                                <button
                                    className="text-sm leading-4 bg-heading text-white px-4 py-2.5 inline-block rounded-md hover:text-white hover:bg-gray-600 mx-1 bg-red-900"
                                    onClick={() => confirmAlert({ title: "Are you sure you want to cancel this order?" }, (cb) => {
                                        updateLead({
                                            data: {
                                                leadId: lead._id,
                                                status: "cancelled"
                                            },
                                            action: () => onCancel ? onCancel() : null
                                        })
                                    })}
                                >
                                    Cancel
                                </button>
                            </div>}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default LeadInvoice;
