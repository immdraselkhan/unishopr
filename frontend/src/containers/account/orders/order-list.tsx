import { motion } from "framer-motion";
import { fadeInTop } from "@utils/motion/fade-in-top";
import Modal from "@components/common/modal/modal";
import { FC, Fragment, useEffect, useState } from "react";
import { LeadRes, LeadsRes, OrderRes, OrdersRes } from "@redux/services/order/type";
import LeadInvoice from "@containers/account/orders/lead-invoice";
import OrderInvoice from "@containers/account/orders/order-invoice";
import { useRouter } from "next/router";

const OrderList: FC<{ leads?: LeadsRes, orders?: OrdersRes, refetch?: () => void }> = ({ leads, orders, refetch }) => {
    const [orderModal, setOrderModal] = useState<{ show: boolean, lead?: LeadRes | null, order?: OrderRes | null }>({ show: false });

    const router = useRouter();
    const { leadId, orderId } = router.query

    useEffect(() => {
        if (leadId) {
            const lead = leads?.data.find((item) => item.leadId === leadId);
            if (lead) setOrderModal({ show: true, order: null, lead })
        }
    }, [leadId, leads?.data])

    useEffect(() => {
        if (orderId) {
            const order = orders?.data.find((item) => item.orderId === orderId);
            if (order) setOrderModal({ show: true, order, lead: null })
        }
    }, [orderId, orders?.data])

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
                            <th className="bg-gray-100 text-center p-4 text-heading font-semibold first:rounded-ts-md">
                                Order
                            </th>
                            <th className="bg-gray-100 text-start p-4 text-heading font-semibold lg:text-center">
                                Products
                            </th>
                            <th className="bg-gray-100 text-center p-4 text-heading font-semibold lg:text-center last:rounded-te-md">
                                From
                            </th>
                            <th className="bg-gray-100 text-center p-4 text-heading font-semibold lg:text-center last:rounded-te-md">
                                Amount
                            </th>
                            {/*<th className="bg-gray-100 text-end p-4 text-heading font-semibold lg:text-end last:rounded-te-md">*/}
                            {/*    Status*/}
                            {/*</th>*/}
                            <th className="bg-gray-100 p-4 text-heading text-center font-semibold lg:text-center last:rounded-te-md">
                                Details
                            </th>
                        </tr>
                    </thead>
                    <tbody className="text-sm lg:text-base">
                        {leads?.data?.map(lead => {
                            return (
                                <tr key={lead._id} className="border-b border-gray-300 last:border-b-0">
                                    <td className="px-4 py-5 underline text-center hover:no-underline text-body">
                                        {lead.leadId}
                                    </td>
                                    <td className="px-4 py-5 text-heading">
                                        {lead?.url ? <a className="underline hover:no-underline" href={lead.url} target="_blank">{lead?.name ? lead?.name : lead?.url}</a> : <span>{lead?.name}</span>}
                                    </td>
                                    <td className="px-4 text-center py-5 text-heading">
                                        {lead?.route?.from?.name ? lead?.route?.from?.name : "-"}
                                    </td>
                                    <td className="px-4 text-center py-5 text-heading">
                                        {lead.currency}&nbsp;{lead.checkout.totalAmount}
                                    </td>
                                    {/*<td className="px-4 text-end py-5 text-heading">*/}
                                    {/*    {lead.status}*/}
                                    {/*</td>*/}
                                    <td className="text-center px-4 py-5 text-heading">
                                        {lead?.status === "ongoing" || lead?.status === "checkout"
                                            ? <button
                                                className="text-sm leading-4 bg-red-600 text-white px-4 py-2.5 inline-block rounded-md hover:text-white hover:bg-red-700"
                                                onClick={() => setOrderModal({ show: true, order: null, lead })}
                                            >
                                                Track
                                            </button>
                                            : <button
                                                className="text-sm leading-4 bg-heading text-white px-4 py-2.5 inline-block rounded-md hover:text-white hover:bg-gray-600"
                                                onClick={() => setOrderModal({ show: true, order: null, lead })}
                                            >
                                                Track
                                            </button>
                                        }
                                    </td>
                                </tr>
                            )
                        })}

                        {orders?.data?.map(order => {
                            return (
                                <tr key={order._id} className="border-b border-gray-300 last:border-b-0">
                                    <td className="px-4 py-5 underline text-center hover:no-underline text-body">
                                        {order.orderId}
                                    </td>
                                    <td className="px-4 py-5 text-heading">
                                        {order.products.map((product, pi) => (
                                            <span key={pi}>{pi % 2 !== 0 ? ", " : ""}
                                                {product?.leadId?.url ? <a className="underline hover:no-underline" href={product?.leadId?.url} target="_blank">{product?.name ? product?.name : product?.leadId?.url}</a> : <span>{product?.name}</span>}
                                            </span>
                                        ))}
                                    </td>
                                    <td className="px-4 text-center py-5 text-heading">
                                        {order?.products[0]?.leadId?.route?.from?.name ? order?.products[0]?.leadId?.route?.from?.name : "-"}
                                    </td>
                                    <td className="px-4 text-center py-5 text-heading">
                                        {order?.payment?.currency}&nbsp;{order.payment.amount}
                                    </td>
                                    {/*<td className="px-4 text-end py-5 text-heading">*/}
                                    {/*    {order.status}*/}
                                    {/*</td>*/}
                                    <td className="text-center px-4 py-5 text-heading">
                                        <button
                                            className="text-sm leading-4 bg-heading text-white px-4 py-2.5 inline-block rounded-md hover:text-white hover:bg-gray-600"
                                            onClick={() => setOrderModal({ show: true, lead: null, order })}
                                        >
                                            Track
                                        </button>
                                    </td>
                                </tr>
                            )
                        })}
                    </tbody>
                </table>
            </motion.div>
            <Modal open={orderModal.show} onClose={() => setOrderModal({ show: false, lead: null, order: null })}>
                {orderModal.lead ? (
                    <LeadInvoice
                        lead={orderModal.lead}
                        onConfirm={() => {
                            refetch ? refetch() : null;
                            setOrderModal({ show: false, lead: null, order: null })
                        }}
                        onCancel={() => {
                            refetch ? refetch() : null;
                            setOrderModal({ show: false, lead: null, order: null })
                        }}
                    />) : null}
                {orderModal.order ? (<OrderInvoice order={orderModal.order} />) : null}
            </Modal>
        </Fragment>
    );
}

export default OrderList;
