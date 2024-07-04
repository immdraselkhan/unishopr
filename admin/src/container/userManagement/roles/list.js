import {Button as AntButton, Table} from "antd";
import React from "react";
import FontAwesome from "react-fontawesome";
import {Alert} from "../../../services/alertService";
import { PageHeader } from 'antd';
import {Button} from "../../../components/buttons/buttons";
import FeatherIcon from "feather-icons-react";
import {Scope} from "../../../services/scopeService";

const RoleList = (
    {
        showModal,
        isLoading,
        roles,
        getRoles,
        roleInfo,
        deleteRole
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
            title: 'Status',
            dataIndex: 'status',
            key: 'status',
        },
        {
            title: <div className="text-right">Action</div>,
            dataIndex: '_id',
            key: '_id',
            render: (key) => <div className="text-right">
                {Scope.checkScopes(['um_roles_update']) && (
                    <AntButton
                        size="small"
                        type="ghost"
                        className="minimum-mr color-info border-info"
                        icon={<FontAwesome name={"edit"} />}
                        onClick={() => roleInfo(key)}
                    />
                )}
                {Scope.checkScopes(['um_roles_delete']) && (
                    <AntButton
                        size="small"
                        type="ghost"
                        className="color-danger border-danger"
                        icon={<FontAwesome name={"trash"} />}
                        onClick={() => Alert.confirm({action: deleteRole(key)})}
                    />
                )}
            </div>
        },
    ];

    const headerButtons = [
        <div key="1" className="page-header-actions">
            {Scope.checkScopes(['um_roles_create']) && (
                <Button size="medium" type="primary" onClick={() => showModal('primary')}>
                    <FeatherIcon icon="plus" size={14} />
                    Add New
                </Button>
            )}
        </div>,
    ];

    return (
        <div>
            <PageHeader
                ghost={false}
                title="Roles"
                subTitle={`List of all ${roles.total} roles.`}
                onBack={() => window.history.back()}
                extra={headerButtons}
            >
                <Table
                    rowKey="_id"
                    bordered={false}
                    className="table-responsive"
                    loading={isLoading}
                    dataSource={roles.data}
                    columns={columns}
                    // scroll={{ y: window.innerHeight / 2  }}
                    pagination={{
                        total: roles.total,
                        current: roles.page,
                        onChange: async (pageNo, perPageNo) => await getRoles(pageNo, perPageNo)
                    }}
                />
            </PageHeader>
        </div>
    )
}

export default RoleList;
