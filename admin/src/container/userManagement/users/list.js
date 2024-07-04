import {Button as AntButton, PageHeader, Table} from "antd";
import React from "react";
import FeatherIcon from "feather-icons-react";
import FontAwesome from "react-fontawesome";
import {Scope} from "../../../services/scopeService";
import {Button} from "../../../components/buttons/buttons";
import {Alert} from "../../../services/alertService";

const UserList = (
    {
        isLoading,
        users,
        showModal,
        getUsers,
        getUserInfo,
        deleteUser
    }
) => {
    const columns = [
        {
            title: 'Username',
            dataIndex: 'username',
            key: 'username',
        },
        {
            title: 'Email',
            dataIndex: 'email',
            key: 'email',
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
                {Scope.checkScopes(['um_users_update']) && (
                    <AntButton
                        size="small"
                        type="ghost"
                        className="minimum-mr color-info border-info"
                        icon={<FontAwesome name={"edit"} />}
                        onClick={() => getUserInfo(key)}
                    />
                )}
                {Scope.checkScopes(['um_users_delete']) && (
                    <AntButton
                        size="small"
                        type="ghost"
                        className="color-danger border-danger"
                        icon={<FontAwesome name={"trash"} />}
                        onClick={() => Alert.confirm({action: deleteUser(key)})}
                    />
                )}
            </div>
        },
    ];

    const headerButtons = [
        <div key="1" className="page-header-action">
            {Scope.checkScopes(['um_users_create']) && (
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
                title="Users"
                subTitle={`List of all ${users.total} users.`}
                onBack={() => window.history.back()}
                extra={headerButtons}
            >
                <Table
                    rowKey="_id"
                    bordered={false}
                    className="table-responsive"
                    loading={isLoading}
                    dataSource={users.data}
                    columns={columns}
                    // scroll={{ y: window.innerHeight / 2  }}
                    pagination={{
                        total: users.total,
                        current: users.page,
                        onChange: async (pageNo, perPageNo) => await getUsers(pageNo, perPageNo)
                    }}
                />
            </PageHeader>
        </div>
    )
};

export default UserList;
