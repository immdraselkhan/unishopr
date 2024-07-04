import React, { Fragment, useState } from "react";
import { PageHeader, Table, Avatar, Button as AntButton, Typography, Tooltip } from "antd";
import { shortDate, shortDateWithTime } from "../../../utility/dataTime";
import { Constants } from "../../../config/constants";
import { Scope } from "../../../services/scopeService";
import FontAwesome from "react-fontawesome";
import { Button } from "../../../components/buttons/buttons";
import FeatherIcon from "feather-icons-react";
import { Link } from "react-router-dom";
const { Paragraph } = Typography;

const OrderList = (
    {
        isLoading,
        orders,
        getOrders,
        getOrderInfo,
        showInvoice,
        showLeadInvoice,
        handleOk,
        extra,
        state,
        setState,
        userDropDownAction,
        getLeadForUpdate,
        filters,
        setFilters,
        downloadOrders,
        showPaymentInvoiceModal
    }
) => {
    const [ellipsis, setEllipsis] = useState(true);
    console.log(orders)
    const columns = [
        {
            title: 'Order ID',
            dataIndex: 'orderId',
            key: 'orderId',
        },
        {
            title: 'Invoice ID',
            render: (order) => <Fragment>
                <a onClick={() => showPaymentInvoiceModal(order.payment?.invoiceId)}>{order.payment?.invoiceId}</a>
            </Fragment>
        },
        {
            title: 'Travel ID',
            render: (order) => <Fragment>
                {order?.products[0]?.leadId?.travel?.travelId ? (
                    <Tooltip placement="top" title={`Traveler: ${order?.products[0]?.leadId?.travel?.user?.firstName} ${order?.products[0]?.leadId?.travel?.user?.lastName}, Date: ${shortDate(order?.products[0]?.leadId?.travel?.travelDate)}, From: ${order?.products[0]?.leadId?.travel?.route?.from?.name}, To: ${order?.products[0]?.leadId?.travel?.route?.to?.name}`}>
                        <span className="pointer text-bold">{order?.products[0]?.leadId?.travel?.travelId}</span>
                    </Tooltip>
                ) : "Unassigned"}
            </Fragment>
        },
        {
            title: 'User',
            render: (order) => <span className="d-flex">
                {/* <Avatar src={`${Constants.BASE_MEDIA_URL}${order?.user?.photo}`} /> */}
                {
                    order?.user?.photo ? <Avatar src={order?.user?.photo} /> : <Avatar src={"https://cdn0.iconfinder.com/data/icons/user-pictures/100/matureman1-512.png"} />
                }
                <span className="pl-5">
                    <Link target="_blank" to={`/admin/client/users-profile/${order.user._id._id}`}>
                        {`${order?.user?.firstName} ${order?.user?.lastName}`}<br />
                        {`${order?.user?._id?.phone?.country?.code}${order?.user?._id?.phone?.phone}`}<br />
                        {`${order?.user?._id?.email}`}
                    </Link>
                </span>
            </span>
        },
        {
            title: 'Products',
            render: (order) => <Fragment>
                <Paragraph
                    style={
                        ellipsis
                            ? {
                                width: 200,
                            }
                            : undefined
                    }
                    ellipsis={
                        ellipsis
                            ? {
                                tooltip: `${order.products.map((product, pi) => `${pi % 2 === 0 ? `${product.name}` : `, ${product.name}`}`)}`,
                            }
                            : false
                    }
                >
                    {order.products.map((product, pi) => (
                        <div key={pi}>
                            {product?.leadId ? (
                                <a href={product.leadId?.url} target={"_blank"} className="pl-5">
                                    {pi % 2 === 0 ? `${product.name}` : `, ${product.name}`}
                                </a>
                            ) : (
                                <span>{pi % 2 === 0 ? `${product.name}` : `, ${product.name}`}</span>
                            )}
                        </div>
                    ))}
                </Paragraph>
            </Fragment>
        },
        {
            title: 'Quantity',
            render: (order) => <div className="text-center">{order.products[0].quantity}</div>
        },
        {
            title: 'Description',
            render: (order) => <Fragment>
                <Paragraph
                    style={
                        ellipsis
                            ? {
                                width: 200,
                            }
                            : undefined
                    }
                    ellipsis={
                        ellipsis
                            ? {
                                tooltip: `${order.products.map((product, pi) => `${pi % 2 === 0 ? `${product?.leadId?.description}` : `, ${product?.leadId?.description}`}`)}`,
                            }
                            : false
                    }
                >
                    {order.products?.map(product => (product?.leadId?.description))}
                </Paragraph>
            </Fragment>
        },
        // {
        //     title: 'Invoice No',
        //     render: (order) => <Fragment>
        //         {order.payment?.invoiceNo}
        //     </Fragment>
        // },
        {
            title: 'Paid Amount',
            render: (order) => <span>
                {order.payment?.paidAmount}
            </span>
        },
        {
            title: 'Foreign Price',
            render: (order) => <span>
                {order?.products[0]?.leadId?.foreignCurrency} {order?.products[0]?.leadId?.foreignPrice}
            </span>
        },
        {
            title: 'From',
            render: (order) => <span>
                {order?.products[0]?.leadId?.route?.from?.name}
            </span>
        },
        {
            title: 'To',
            render: (order) => <span>
                {order?.products[0]?.leadId?.route?.to?.name}
            </span>
        },
        {
            title: 'Created At',
            dataIndex: 'createdAt',
            key: 'createdAt',
            render: (key) => <>{shortDateWithTime(key)}</>
        },
        {
            title: 'Type',
            dataIndex: 'type',
            key: 'type',
        },
        {
            title: 'Status',
            dataIndex: 'status',
            key: 'status',
        },
        {
            title: <div className="text-right">Action</div>,
            render: (key) => <div className="text-right">
                {Scope.checkScopes(['workspace_leads_update']) && key?.type && key.type === 'lead' && (
                    <AntButton
                        size="small"
                        type="ghost"
                        className="minimum-mr color-gray border-gray"
                        onClick={() => getLeadForUpdate(key.products[0].leadId._id)}
                        icon={<FontAwesome name={"calendar"} />}
                    />
                )}
                {Scope.checkScopes(['workspace_orders_update']) && (
                    <AntButton
                        size="small"
                        type="ghost"
                        className="color-info border-info minimum-mr"
                        icon={<FontAwesome name={"edit"} />}
                        onClick={() => getOrderInfo(key)}
                    />
                )}
                {Scope.checkScopes(['workspace_orders_index']) && (
                    <AntButton
                        size="small"
                        type="ghost"
                        className="color-primary border-primary"
                        icon={<FontAwesome name={"eye"} />}
                        onClick={() => key.type === "lead" ? showLeadInvoice(key.products[0].leadId._id) : showInvoice(key)}
                    />
                )}
            </div>
        },
    ];

    const getExtra = () => {
        return extra(userDropDownAction)
    }
    const headerButtons = [
        <div key="0" className="page-header-action">
            {Scope.checkScopes(['workspace_orders_index']) && (
                <Button
                    size="medium"
                    className="minimum-mr"
                    type="primary"
                    danger={true}
                    onClick={() => downloadOrders()}
                >
                    <FeatherIcon icon="download" size={14} />
                    Download
                </Button>
            )}
        </div>,
        <div key="1" className="page-header-action">
            {Scope.checkScopes(['workspace_orders_index']) && (
                <Button
                    size="medium"
                    className="minimum-mr"
                    type="secondary"
                    onClick={() => setState({ ...state, filterVisible: true })}
                >
                    <FeatherIcon icon="filter" size={14} />
                    Filters
                </Button>
            )}
        </div>
    ];

    return (
        <div>
            <PageHeader
                ghost={false}
                title="Orders"
                subTitle={`List of all ${orders?.total ?? orders?.length} Orders.`}
                onBack={() => window.history.back()}
                extra={extra ? [getExtra()] : headerButtons}
            >
                <Table
                    rowKey="_id"
                    bordered={false}
                    className="table-responsive"
                    loading={isLoading}
                    dataSource={orders?.data || orders}
                    columns={columns}
                    // scroll={{ y: window.innerHeight / 2  }}
                    pagination={{
                        total: orders.total,
                        current: orders.page,
                        onChange: async (pageNo, perPageNo) => await setFilters({ ...filters, page: pageNo, perPage: perPageNo }),
                    }} />
            </PageHeader>
        </div>
    )
}

export default OrderList;
