import { motion } from "framer-motion";
import { fadeInTop } from "@utils/motion/fade-in-top";
import { FC, Fragment, useState } from "react";
import { PaymentRes } from "@redux/services/account/type";

const PaymentList: FC<{ payments?: PaymentRes }> = ({ payments }) => {

    return (
        <Fragment>
            <motion.div
                layout
                initial="from"
                animate="to"
                exit="from"
                //@ts-ignore
                variants={fadeInTop(0.35)}
                className={`w-full flex flex-col`}
            >
                <table className="table-auto">
                    <thead className="text-sm lg:text-base">
                        <tr>
                            <th className="bg-gray-100 p-4 text-heading font-semibold first:rounded-ts-md">
                                InvoiceNo
                            </th>
                            <th className="bg-gray-100 text-start p-4 text-heading font-semibold lg:text-center">
                                TransactionId
                            </th>
                            <th className="bg-gray-100 text-end p-4 text-heading font-semibold lg:text-end last:rounded-te-md">
                                Amount
                            </th>
                            <th className="bg-gray-100 text-end p-4 text-heading font-semibold lg:text-end last:rounded-te-md">
                                Products
                            </th>
                            <th className="bg-gray-100 text-end p-4 text-heading font-semibold lg:text-end last:rounded-te-md">
                                Status
                            </th>
                        </tr>
                    </thead>
                    <tbody className="text-sm lg:text-base">
                        {payments?.data?.map(payment => {
                            return (
                                <tr key={payment._id} className="border-b border-gray-300 last:border-b-0">
                                    <td className="px-4 py-5 underline hover:no-underline text-body text-center">
                                        {payment.invoiceNo}
                                    </td>
                                    <td className="px-4 py-5 text-center text-heading">
                                        {payment?.transactionId ?? "N/A"}
                                    </td>
                                    <td className="px-4  py-5 text-center text-heading">
                                        {payment?.amount}
                                    </td>
                                    <td className="px-4 text-center py-5 text-heading">
                                        {payment?.products?.map((product, pi) => (
                                            <span key={pi}>
                                                {pi % 2 === 0 ? `${product.name}` : `, ${product.name}`}
                                            </span>
                                        ))}
                                    </td>
                                    <td className="px-4 text-end py-5 text-heading">
                                        {payment?.status}
                                    </td>
                                </tr>
                            )
                        })}
                    </tbody>
                </table>
            </motion.div>
        </Fragment>
    );
}

export default PaymentList;
