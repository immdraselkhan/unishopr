import React from "react";
import {Scope} from "../../../services/scopeService";
import FontAwesome from "react-fontawesome";
import {PageHeader, Table, Button as AntButton, Avatar, Modal} from "antd";
import {Constants} from "../../../config/constants";
import {Alert} from "../../../services/alertService";

const TravelLeadsForm = (
    {
        state,
        setState,
        isLoading,
        travelLeads,
        addTravelLead,
        handleOk
    }
) => {
    const columns = [
        {
            title: 'Lead',
            dataIndex: 'leadId',
            key: 'leadId',
        },
        {
            title: 'User',
            render: (lead) => lead?.user ? <span className="d-flex">
                <Avatar src={`${Constants.S3_BASE_URL(lead.user.photo)}`} />
                <span className="pl-5">
                    {`${lead.user.firstName} ${lead.user.lastName}`}<br />
                    {`${lead?.user?._id?.phone?.country?.code}${lead?.user?._id?.phone?.phone}`}
                </span>
            </span> : 'N/A'
        },
        {
            title: 'Product',
            render: (lead) => lead?.name ? <span className="d-flex">
                <Avatar src={`${Constants.S3_BASE_URL(lead.photo)}`} />
                <a href={lead.url} target={"_blank"} className="pl-5">
                    {lead.name}
                </a>
            </span> : 'N/A'
        },
        {
            title: 'Price',
            render: (lead) => <span>{lead?.route?.to?.country?.currencySymbol}&nbsp;{lead?.price}</span>
        },
        {
            title: 'Quantity',
            dataIndex: 'quantity',
            key: 'quantity',
            render: (quantity) => `x${quantity}`
        },
        {
            title: 'Weight',
            dataIndex: 'weight',
            key: 'weight',
            render: (weight) => <span>{weight} <small>(KG)</small></span>
        },
        {
            title: 'Total',
            render: (lead) => <span>{lead?.route?.to?.country?.currencySymbol}&nbsp;{lead?.checkout.totalAmount}</span>
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
            title: 'Status',
            dataIndex: 'status',
            key: 'status',
        },
        {
            title: <div className="text-right">Action</div>,
            dataIndex: '_id',
            key: '_id',
            render: (key) => <div className="text-right">
                {Scope.checkScopes(['workspace_travels_create']) && (
                    <AntButton
                        size="small"
                        type="ghost"
                        className="minimum-mr color-primary border-primary"
                        icon={<FontAwesome name={"check-square"} />}
                        onClick={() => Alert.confirm({action: addTravelLead({leadId: key, travelId: state.travelId})})}
                    />
                )}
            </div>
        },
    ];

    return (
        <Modal
            type={"primary"}
            title={`List of all ${travelLeads?.length} Leads.`}
            visible={state.leadFormVisible}
            onCancel={() => handleOk()}
            width={1200}
            footer={false}
        >
            <Table
                rowKey="_id"
                bordered={false}
                className="table-responsive"
                loading={isLoading}
                dataSource={travelLeads}
                columns={columns}
                // pagination={true}
            />
        </Modal>
    )
}

export default TravelLeadsForm;
