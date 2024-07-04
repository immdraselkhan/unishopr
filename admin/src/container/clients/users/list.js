import React from "react";
import { Avatar, PageHeader, Table, Button as AntButton } from "antd";
import { Constants } from "../../../config/constants";
import { Scope } from "../../../services/scopeService";
import FontAwesome from "react-fontawesome";
import { useHistory } from "react-router";
import { Button } from "../../../components/buttons/buttons";
import FeatherIcon from "feather-icons-react";
import { Link } from "react-router-dom";
import { shortDateWithTime } from "../../../utility/dataTime";

const UserList = (
    {
        isLoading,
        state,
        setState,
        filters,
        setFilters,
        users,
        showModal,
        showServiceReqModal,
        downloadUsers
    }) => {
    const history = useHistory();

    const columns = [
        {
            title: 'User',
            render: (user) => <span className="d-flex">
                {/* <Avatar src={`${Constants.S3_BASE_URL(user.photo)}`} /> */}
                {
                    user?.photo ? <Avatar src={user?.photo} /> : <Avatar src={"https://cdn0.iconfinder.com/data/icons/user-pictures/100/matureman1-512.png"} />
                }
                <span className="pl-5">
                    <Link target="_blank" to={`/admin/client/users-profile/${user._id}`}>
                        {`${user.firstName} ${user.lastName}`}<br />
                        {user.phone.country.code}{user.phone.phone}
                    </Link>
                </span>
            </span>
        },
        {
            title: 'Email',
            dataIndex: 'email',
            key: 'email',
        },
        {
            title: 'Gender',
            dataIndex: 'gender',
            key: 'gender',
        },
        {
            title: 'Created At',
            dataIndex: 'createdAt',
            key: 'createdAt',
            render: (key) => <>{shortDateWithTime(key)}</>
        },
        {
            title: <div className="text-center">Traveler </div>,
            render: (user) => <div className="text-center">{user?.services?.traveler?.isTraveler ? <FeatherIcon icon="check" size={14} /> : (
                <AntButton
                    size="small"
                    type="ghost"
                    className="color-primary border-primary"
                    onClick={() => showServiceReqModal("Traveler", user,)}
                    icon={<FontAwesome name={"user-plus"} />}
                />)
            }</div>
        },
        {
            title: <div className="text-center">Partner </div>,
            render: (user) => <div className="text-center">{user?.services?.partner?.isPartner ? <FeatherIcon icon="check" size={14} /> : (
                <AntButton
                    size="small"
                    type="ghost"
                    className="color-primary border-primary"
                    onClick={() => showServiceReqModal("Partner", user,)}
                    icon={<FontAwesome name={"user-plus"} />}
                />)
            }</div>
        },
        {
            title: <div className="text-center">Profile</div>,
            render: (key) => <div className="text-center">
                {Scope.checkScopes(['clients_users_index']) && (
                    <AntButton
                        size="small"
                        type="ghost"
                        className="color-primary border-primary"
                        icon={<FontAwesome name={"info"} />}
                        onClick={() => history.push('/admin/client/users-profile/' + key._id)}
                    />
                )}
            </div>
        },
    ];

    const headerButtons = [
        <div key="0" className="page-header-action">
            {Scope.checkScopes(['clients_users_view']) && (
                <Button
                    size="medium"
                    className="minimum-mr"
                    type="primary"
                    danger={true}
                    onClick={() => downloadUsers()}
                >
                    <FeatherIcon icon="download" size={14} />
                    Download
                </Button>
            )}
        </div>,
        <div key="1" className="page-header-action">
            {Scope.checkScopes(['clients_users_view']) && (
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
        </div>,
        <div key="2" className="page-header-action">
            {Scope.checkScopes(['clients_users_create']) && (
                <Button size="medium" type="primary" onClick={() => showModal('primary')}>
                    <FeatherIcon icon="plus" size={14} />
                    Add New
                </Button>
            )}
        </div>
    ]

    return (
        <div>
            <PageHeader
                ghost={false}
                title="Users"
                subTitle={`List of all ${users?.total} Users.`}
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
                        onChange: async (pageNo, perPageNo) => await setFilters({ ...filters, page: pageNo, perPage: perPageNo })
                    }}
                />
            </PageHeader>
        </div>
    )
}

export default UserList;
