import React, { Fragment, useState } from "react";
import { PageHeader, Table, Avatar, Typography, Button as AntButton } from "antd";
import { shortDateWithTime } from "../../../utility/dataTime";
import { Constants } from "../../../config/constants";
import FontAwesome from "react-fontawesome";
import { Scope } from "../../../services/scopeService";
import { Button } from "../../../components/buttons/buttons";
import FeatherIcon from "feather-icons-react";
import { Link } from "react-router-dom";
const { Paragraph } = Typography;

const PaymentList = ({
    state,
    setState,
    isLoading,
    payments,
    filters,
    setFilters,
    extra,
    userDropDownAction,
    showInfoReqModal,
    showInvoiceModal,
    downloadPayments
}) => {
    const [ellipsis, setEllipsis] = useState(true);
    
    const columns = [
        {
            title: 'Invoice ID',
            dataIndex: 'invoiceId',
            key: 'invoiceId',
            render: (key) => <a onClick={() => showInvoiceModal(key)}>{key}</a>,
        },
        {
            title: 'User',
            render: (payment) => <span className="d-flex">
                {/* <Avatar src={`${Constants.BASE_MEDIA_URL}${payment?.user?.photo}`} /> */}
                {
                    payment?.user?.photo ? <Avatar src={payment?.user?.photo} /> : <Avatar src={"https://cdn0.iconfinder.com/data/icons/user-pictures/100/matureman1-512.png"} />
                }
                <span className="pl-5">
                    <Link target="_blank" to={`/admin/client/users-profile/${payment.user._id._id}`}>
                        {`${payment?.user?.firstName} ${payment?.user?.lastName}`}<br />
                        {`${payment?.user?._id?.phone?.country?.code}${payment?.user?._id?.phone?.phone}`}<br />
                        {`${payment?.user?._id?.email}`}
                    </Link>
                </span>
            </span>
        },
        {
            title: 'Products',
            render: (payment) => <Fragment>
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
                                tooltip: `${payment.products.map((product, pi) => `${pi % 2 === 0 ? `${product.name}` : `, ${product.name}`}`)}`,
                            }
                            : false
                    }
                >
                    {payment.products.map((product, pi) => (
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
            title: 'Amount',
            dataIndex: 'amount',
            key: 'amount',
        },
        {
            title: 'Coupon',
            dataIndex: 'couponId',
            key: 'couponId',
            render: (couponId) => couponId?.code ? couponId?.code : "N/A"
        },
        {
            title: 'Gateway',
            dataIndex: 'gateway',
            key: 'gateway',
        },
        {
            title: 'Screenshot',
            dataIndex: 'screenshot',
            key: 'screenshot',
            render: (screenshot) => screenshot ? <a href={Constants.S3_BASE_URL(screenshot)} target="_blank">Image</a> : "N/A"
        },
        {
            title: 'Created At',
            dataIndex: 'createdAt',
            key: 'createdAt',
            render: (key) => <>{shortDateWithTime(key)}</>
        },
        {
            title: 'Status',
            dataIndex: 'status',
            key: 'status',
        },
        {
            title: <div className="text-center">Info</div>,
            key: '_id',
            render: (key) => <div className="text-center">
                <AntButton
                    size="small"
                    type="ghost"
                    className="color-primary border-primary"
                    onClick={() => showInfoReqModal(key)}
                    icon={<FontAwesome name={"info"} />}
                />
            </div>
        },
    ];

    const getExtra = () => {
        return extra(userDropDownAction)
    }

    const headerButtons = [
        <div key="0" className="page-header-action">
            {Scope.checkScopes(['workspace_payments_index']) && (
                <Button
                    size="medium"
                    className="minimum-mr"
                    type="primary"
                    danger={true}
                    onClick={() => downloadPayments()}
                >
                    <FeatherIcon icon="download" size={14} />
                    Download
                </Button>
            )}
        </div>,
        <div key="1" className="page-header-action">
            {Scope.checkScopes(['workspace_payments_index']) && (
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
                title="Payments"
                subTitle={`List of all ${payments?.total ?? payments?.length} Payments.`}
                onBack={() => window.history.back()}
                extra={extra ? [getExtra()] : headerButtons}
            >
                <Table
                    rowKey="_id"
                    bordered={false}
                    className="table-responsive"
                    loading={isLoading}
                    dataSource={payments.data || payments}
                    columns={columns}
                    // scroll={{ y: window.innerHeight / 2  }}
                    pagination={{
                        total: payments.total,
                        current: payments.page,
                        onChange: async (pageNo, perPageNo) => await setFilters({ ...filters, page: pageNo, perPage: perPageNo })
                    }} />
            </PageHeader>
        </div>
    )
}

export default PaymentList;
