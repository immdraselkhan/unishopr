import React from "react";
import { Avatar, Button as AntButton, PageHeader, Table } from "antd";
import { Scope } from "../../../services/scopeService";
import FontAwesome from "react-fontawesome";
import { Alert } from "../../../services/alertService";
import { Constants } from "../../../config/constants";
import { useHistory } from "react-router";
import { Link } from "react-router-dom";
import { Button } from "../../../components/buttons/buttons";
import FeatherIcon from "feather-icons-react";

const TravelerList = (
    {
        state,
        setState,
        filters,
        setFilters,
        isLoading,
        travelers,
        approveRequest
    }
) => {
    const history = useHistory();

    const columns = [
        {
            title: 'Traveler',
            className: "pointer text-default",
            render: (traveler) => <span className="d-flex">
                {/* <Avatar src={`${Constants.S3_BASE_URL(traveler.photo)}`} /> */}
                {
                    traveler?.photo ? <Avatar src={traveler?.photo} /> : <Avatar src={"https://cdn0.iconfinder.com/data/icons/user-pictures/100/matureman1-512.png"} />
                }
                <span className="pl-5">
                    <Link target="_blank" to={`/admin/client/users-profile/${traveler._id}`}>
                        {`${traveler.firstName} ${traveler.lastName}`}<br />
                        {traveler.phone.country.code}{traveler.phone.phone}
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
            title: 'Status',
            render: (key) => key.services?.traveler?.status ? key.services?.traveler?.status : 'N/A'
        },
        {
            title: <div className="text-right">Action</div>,
            render: (key) => <div className="text-right">
                {key.services?.traveler?.status && key.services?.traveler?.status === "requested" && Scope.checkScopes(['clients_travelers_update']) && (
                    <AntButton
                        size="small"
                        type="ghost"
                        className="minimum-mr color-success border-success"
                        icon={<FontAwesome name={"check"} />}
                        onClick={() => Alert.confirm({ action: approveRequest({ travelerId: key._id }) })}
                    />
                )}
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
        <div key="1" className="page-header-action">
            {Scope.checkScopes(['clients_travelers_view']) && (
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
    ]

    return (
        <div>
            <PageHeader
                ghost={false}
                title="Travelers"
                subTitle={`List of all ${travelers?.total} Travelers.`}
                onBack={() => window.history.back()}
                extra={headerButtons}
            >
                <Table
                    rowKey="_id"
                    bordered={false}
                    className="table-responsive"
                    loading={isLoading}
                    dataSource={travelers.data}
                    columns={columns}
                    // scroll={{ y: window.innerHeight / 2  }}
                    pagination={{
                        total: travelers.total,
                        current: travelers.page,
                        onChange: async (pageNo, perPageNo) => await setFilters({ ...filters, page: pageNo, perPage: perPageNo }),
                    }}
                />
            </PageHeader>
        </div>
    )
}

export default TravelerList;
