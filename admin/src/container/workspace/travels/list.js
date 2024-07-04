import React from "react";
import { Scope } from "../../../services/scopeService";
import FontAwesome from "react-fontawesome";
import { Alert } from "../../../services/alertService";
import { Button } from "../../../components/buttons/buttons";
import FeatherIcon from "feather-icons-react";
import { PageHeader, Table, Button as AntButton, Avatar } from "antd";
import { Link } from "react-router-dom";
import { Constants } from "../../../config/constants";

const TravelList = (
    {
        state,
        setState,
        showModal,
        isLoading,
        travels,
        setFilters,
        getTravelInfo,
        filters,
        deleteTravel,
        extra,
        userDropDownAction
    }
) => {
    const columns = [
        {
            title: 'Travel Id',
            dataIndex: 'travelId',
            key: 'travelId',
        },
        {
            title: 'User',
            dataIndex: 'user',
            key: 'user',
            render: (key) => key ? <span className="d-flex">
                {/* <Avatar src={`${Constants.BASE_MEDIA_URL}${key?.photo}`} /> */}
                {
                    key.photo ? <Avatar src={key.photo} /> : <Avatar src={"https://cdn0.iconfinder.com/data/icons/user-pictures/100/matureman1-512.png"} />
                }
                <span className="pl-5">
                    <Link target="_blank" to={`/admin/client/users-profile/${key?._id?._id}`}>
                        {`${key.firstName} ${key.lastName}`}<br />
                        {`${key?._id?.phone?.country?.code}${key?._id?.phone?.phone}`}<br />
                        {`${key?._id?.email}`}
                    </Link>
                </span>
            </span> : 'N/A'
        },
        {
            title: 'From',
            dataIndex: 'route',
            key: 'route',
            render: (key) => <>{key.from.name}</>
        },
        {
            title: 'To',
            dataIndex: 'route',
            key: 'route',
            render: (key) => <>{key.to.name}</>
        },
        {
            title: 'Weight Capacity',
            dataIndex: 'weight',
            key: 'weight',
            render: (key) => <>{key.capacity}</>
        },
        {
            title: 'Weight Loaded',
            dataIndex: 'weight',
            key: 'weight',
            render: (key) => <>{key.loaded}</>
        },
        {
            title: 'Weight Remaining',
            dataIndex: 'weight',
            key: 'weight',
            render: (key) => <>{key.remaining}</>
        },
        {
            title: 'Travel Date',
            dataIndex: 'travelDate',
            key: 'travelDate',
            render: (key) => <>{key.slice(0, 10)}</>
        },
        {
            title: 'Status',
            dataIndex: 'status',
            key: 'status',
        },
        {
            title: extra ? '' : <div className="text-right">Action</div>,
            render: (key) => extra ? '' : <div className="text-right">
                {Scope.checkScopes(['workspace_travels_index']) && (
                    <AntButton
                        size="small"
                        type="ghost"
                        className="minimum-mr color-primary border-primary"
                        icon={<FontAwesome name={"list"} />}
                        onClick={() => getTravelInfo(key._id, () => setState({ ...state, leadVisible: true }))}
                    />
                )}
                {Scope.checkScopes(['workspace_travels_update']) && (
                    <AntButton
                        size="small"
                        type="ghost"
                        className="minimum-mr color-info border-info"
                        icon={<FontAwesome name={"edit"} />}
                        onClick={() => getTravelInfo(key._id)}
                    />
                )}
                {Scope.checkScopes(['workspace_travels_delete']) && key?.status && key.status === 'upcoming' && (
                    <AntButton
                        size="small"
                        type="ghost"
                        className="color-danger border-danger"
                        icon={<FontAwesome name={"trash"} />}
                        onClick={() => Alert.confirm({ action: deleteTravel(key._id) })}
                    />
                )}
            </div>
        },
    ];

    const getExtra = () => {
        return extra(userDropDownAction)
    }

    const headerButtons = [
        <div key="1" className="page-header-action">
            {Scope.checkScopes(['workspace_travels_index']) && (
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
            {Scope.checkScopes(['um_travels_create']) && (
                <Button size="medium" type="primary" onClick={() => showModal('primary')}>
                    <FeatherIcon icon="plus" size={14} />
                    Add New
                </Button>
            )}
        </div>
    ];

    return (
        <div>
            <PageHeader
                ghost={false}
                title="Travels"
                subTitle={`List of all ${travels?.total ?? travels?.length} Travels.`}
                onBack={() => window.history.back()}
                extra={extra ? [getExtra()] : headerButtons}
            >
                <Table
                    rowKey="_id"
                    bordered={false}
                    className="table-responsive"
                    loading={isLoading}
                    dataSource={travels.data || travels}
                    columns={columns}
                    // scroll={{ y: window.innerHeight / 2  }}
                    pagination={{
                        total: travels.total,
                        current: travels.page,
                        onChange: async (pageNo, perPageNo) => await setFilters({ ...filters, page: pageNo, perPage: perPageNo }),
                    }}
                />
            </PageHeader>
        </div>
    )
}

export default TravelList;
