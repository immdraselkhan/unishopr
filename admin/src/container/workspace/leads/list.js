import React, { useState } from "react";
import { PageHeader, Table, Avatar, Button as AntButton, Typography } from "antd";
const { Paragraph } = Typography;
import { Scope } from "../../../services/scopeService";
import FontAwesome from "react-fontawesome";
import { Constants } from "../../../config/constants";
import { Button } from "../../../components/buttons/buttons";
import FeatherIcon from "feather-icons-react";
import { Alert } from "../../../services/alertService";
import { Link } from "react-router-dom";
import { shortDateWithTime } from "../../../utility/dataTime";

const LeadList = (
    {
        isLoading,
        leads,
        getLeads,
        getLeadInfo,
        showModal,
        showInvoice,
        state,
        setState,
        filters,
        setFilters,
        getLeadForUpdate,
        updateLead
    }
) => {
    const [ellipsis, setEllipsis] = useState(true);
    const columns = [
        {
            title: 'Lead ID',
            dataIndex: 'leadId',
            key: 'leadId',
        },
        {
            title: 'User',
            render: (lead) => lead?.user ? <span className="d-flex">
                {/* <Avatar src={`${Constants.S3_BASE_URL(lead.user.photo)}`} /> */}
                {/* <Avatar src={lead.user.photo} /> */}
                {
                    lead.user.photo ? <Avatar src={lead.user.photo} /> : <Avatar src={"https://cdn0.iconfinder.com/data/icons/user-pictures/100/matureman1-512.png"} />
                }
                <span className="pl-5">
                    <Link target="_blank" to={`/admin/client/users-profile/${lead?.user?._id?._id}`}>
                        {`${lead.user.firstName} ${lead.user.lastName}`}<br />
                        {`${lead?.user?._id?.phone?.country?.code}${lead?.user?._id?.phone?.phone}`}<br />
                        {`${lead?.user?._id?.email}`}
                    </Link>
                </span>
            </span> : 'N/A'
        },
        {
            title: 'Product',
            render: (lead) => <div className="d-flex">
                <Avatar src={`${lead?.photo}`} />
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
                                tooltip: lead.name,
                            }
                            : false
                    }
                >
                    <a href={lead?.url} target={"_blank"} className="pl-5">
                        {lead?.name ? lead.name.slice(0, 50) : "Product"}
                    </a>
                </Paragraph>
            </div >
        },
        {
            title: 'From',
            dataIndex: 'route',
            key: 'route',
            render: (route) => route?.from?.name
        },
        {
            title: 'To',
            dataIndex: 'route',
            key: 'route',
            render: (route) => route?.to?.name
        },
        {
            title: 'Weight',
            dataIndex: 'weight',
            key: 'weight',
            render: (weight) => `${weight} KG`
        },
        {
            title: 'Cost',
            render: (lead) => <span>{lead?.route?.to?.country?.currencySymbol}&nbsp;{lead?.cost}&nbsp;x{lead.quantity}</span>
        },
        {
            title: 'Price',
            render: (lead) => <span>{lead?.route?.to?.country?.currencySymbol}&nbsp;{lead?.price}&nbsp;x{lead.quantity}</span>
        },
        {
            title: 'Total',
            render: (lead) => <span>
                <b>Cost:</b> {lead?.route?.to?.country?.currencySymbol}&nbsp;{lead?.checkout.totalCost},
                <b> Amount:</b> {lead?.route?.to?.country?.currencySymbol}&nbsp;{lead?.checkout.totalAmount},
                <b> Profit:</b> {lead?.route?.to?.country?.currencySymbol}&nbsp;{lead?.checkout.totalProfit},
            </span>
        },
        {
            title: 'Created At',
            dataIndex: 'createdAt',
            key: 'createdAt',
            render: (key) => <>{shortDateWithTime(key)}</>
        },
        {
            title: 'Updated At',
            dataIndex: 'updatedAt',
            key: 'updatedAt',
            render: (key) => <>{shortDateWithTime(key)}</>
        },
        {
            title: 'Status',
            dataIndex: 'status',
            key: 'status',
        },
        {
            title: <div className="text-right">Action</div>,
            render: (key) => <div className="text-right">
                {Scope.checkScopes(['workspace_leads_update']) && (
                    <AntButton
                        size="small"
                        type="ghost"
                        className="minimum-mr color-gray border-gray"
                        onClick={() => getLeadForUpdate(key?._id)}
                        icon={<FontAwesome name={"calendar"} />}
                    />
                )}
                {Scope.checkScopes(['workspace_leads_index']) && (
                    <AntButton
                        size="small"
                        type="ghost"
                        className="color-primary border-primary minimum-mr "
                        icon={<FontAwesome name={"eye"} />}
                        onClick={() => showInvoice(key._id)}
                    />
                )}
                {((Scope.checkScopes(['workspace_leads_update']) && key?.status && key.status === 'pending') || (Scope.checkScopes(['workspace_leads_super_update']) && key?.status && key.status === 'resolved')) ? (
                    <AntButton
                        size="small"
                        type="ghost"
                        className="minimum-mr color-info border-info"
                        icon={<FontAwesome name={"edit"} />}
                        onClick={() => getLeadInfo(key?._id)}
                    />
                ) : null}
                {/*{(Scope.checkScopes(['workspace_orders_delete']) && key?.status && key.status === 'pending') || (Scope.checkScopes(['workspace_leads_super_update']) && key?.status && (key.status === 'pending' || key.status === 'ongoing' || key.status === 'resolved')) ? (*/}
                {/*    <AntButton*/}
                {/*        size="small"*/}
                {/*        type="ghost"*/}
                {/*        className="color-danger border-danger"*/}
                {/*        icon={<FontAwesome name={"times"} />}*/}
                {/*        onClick={() => Alert.confirm({ action: () => updateLead({ status: "cancelled", _id: key._id }) })}*/}
                {/*    />*/}
                {/*) : null}*/}
            </div>
        },
    ];

    const headerButtons = [
        <div key="0" className="page-header-action">
            {Scope.checkScopes(['workspace_leads_create']) && (
                <Button size="medium" type="warning" onClick={() => setState({ ...state, leadsImportVisible: true })}>
                    <FeatherIcon icon="plus" size={14} />
                    Import
                </Button>
            )}
        </div>,
        <div key="1" className="page-header-action">
            {Scope.checkScopes(['workspace_leads_create']) && (
                <Button size="medium" type="primary" onClick={() => showModal('primary')}>
                    <FeatherIcon icon="plus" size={14} />
                    Add New
                </Button>
            )}
        </div>,
        <div key="2" className="page-header-action">
            {Scope.checkScopes(['workspace_leads_index']) && (
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
                title="Leads"
                subTitle={`List of all ${leads?.total} Leads.`}
                onBack={() => window.history.back()}
                extra={headerButtons}
            >
                <Table
                    rowKey="_id"
                    bordered={false}
                    className="table-responsive"
                    loading={isLoading}
                    dataSource={leads.data}
                    columns={columns}
                    // scroll={{ y: window.innerHeight / 2 }}
                    pagination={{
                        total: leads.total,
                        current: leads.page,
                        onChange: async (pageNo, perPageNo) => await setFilters({ ...filters, page: pageNo, perPage: perPageNo }),
                    }}
                />
            </PageHeader>
        </div>
    )
}

export default LeadList;
