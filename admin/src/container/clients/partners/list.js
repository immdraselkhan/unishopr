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

const PartnerList = (
    {
        state,
        setState,
        filters,
        setFilters,
        isLoading,
        partners,
        approveRequest
    }
) => {
    const history = useHistory();

    const columns = [
        {
            title: 'Partner',
            className: "pointer text-default",
            render: (partner) => <span className="d-flex">
                {/* <Avatar src={`${Constants.S3_BASE_URL(partner.photo)}`} /> */}
                {
                    partner?.photo ? <Avatar src={partner?.photo} /> : <Avatar src={"https://cdn0.iconfinder.com/data/icons/user-pictures/100/matureman1-512.png"} />
                }
                <span className="pl-5">
                    <Link target="_blank" to={`/admin/client/users-profile/${partner._id}`}>
                        {`${partner.firstName} ${partner.lastName}`}<br />
                        {partner.phone.country.code}{partner.phone.phone}
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
            render: (key) => key.services?.partner?.status ? key.services?.partner?.status : 'N/A'
        },
        {
            title: <div className="text-right">Action</div>,
            render: (key) => <div className="text-right">
                {key.services?.partner?.status && key.services?.partner?.status === "requested" && Scope.checkScopes(['clients_partners_update']) && (
                    <AntButton
                        size="small"
                        type="ghost"
                        className="minimum-mr color-success border-success"
                        icon={<FontAwesome name={"check"} />}
                        onClick={() => Alert.confirm({ action: approveRequest({ partnerId: key._id }) })}
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
            {Scope.checkScopes(['clients_partners_view']) && (
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
                title="Partners"
                subTitle={`List of all ${partners?.total} Partners.`}
                onBack={() => window.history.back()}
                extra={headerButtons}
            >
                <Table
                    rowKey="_id"
                    bordered={false}
                    className="table-responsive"
                    loading={isLoading}
                    dataSource={partners.data}
                    columns={columns}
                    // scroll={{ y: window.innerHeight / 2  }}
                    pagination={{
                        total: partners.total,
                        current: partners.page,
                        onChange: async (pageNo, perPageNo) => await setFilters({ ...filters, page: pageNo, perPage: perPageNo }),
                    }}
                />
            </PageHeader>
        </div>
    )
}

export default PartnerList;
