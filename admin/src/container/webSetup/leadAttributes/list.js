import React from "react";
import {Scope} from "../../../services/scopeService";
import FontAwesome from "react-fontawesome";
import {Alert} from "../../../services/alertService";
import {Button} from "../../../components/buttons/buttons";
import FeatherIcon from "feather-icons-react";
import {PageHeader, Table, Button as AntButton} from "antd";

const LeadAttributeList = (
    {
        showModal,
        isLoading,
        leadAttributes,
        getLeadAttributes,
        getLeadAttributeInfo,
        deleteLeadAttribute
    }
) => {
    const columns = [
        {
            title: 'Name',
            dataIndex: 'name',
            key: 'name',
        },
        {
            title: 'Description',
            dataIndex: 'description',
            key: 'description',
        },
        {
            title: 'Value',
            dataIndex: 'value',
            key: 'value',
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
            dataIndex: '_id',
            key: '_id',
            render: (key) => <div className="text-right">
                {Scope.checkScopes(['ws_lead_attributes_update']) && (
                    <AntButton
                        size="small"
                        type="ghost"
                        className="minimum-mr color-info border-info"
                        icon={<FontAwesome name={"edit"} />}
                        onClick={() => getLeadAttributeInfo(key)}
                    />
                )}
                {Scope.checkScopes(['ws_lead_attributes_delete']) && (
                    <AntButton
                        size="small"
                        type="ghost"
                        className="color-danger border-danger"
                        icon={<FontAwesome name={"trash"} />}
                        onClick={() => Alert.confirm({action: deleteLeadAttribute(key)})}
                    />
                )}
            </div>
        },
    ];

    const headerButtons = [
        <div key="1" className="page-header-action">
            {Scope.checkScopes(['ws_lead_attributes_create']) && (
                <Button size="medium" type="primary" onClick={() => showModal('primary')}>
                    <FeatherIcon icon="plus" size={14}/>
                    Add New
                </Button>
            )}
        </div>
    ];

    return (
        <div>
            <PageHeader
                ghost={false}
                title="Lead Attributes"
                subTitle={`List of all ${leadAttributes?.total} Lead Attributes.`}
                onBack={() => window.history.back()}
                extra={headerButtons}
            >
                <Table
                    rowKey="_id"
                    bordered={false}
                    className="table-responsive"
                    loading={isLoading}
                    dataSource={leadAttributes.data}
                    columns={columns}
                    // scroll={{ y: window.innerHeight / 2  }}
                    pagination={{
                        total: leadAttributes.total,
                        current: leadAttributes.page,
                        onChange: async (pageNo, perPageNo) => await getLeadAttributes(pageNo, perPageNo)
                    }}
                />
            </PageHeader>
        </div>
    )
}

export default LeadAttributeList;
