import React from "react";
import {Scope} from "../../../services/scopeService";
import FontAwesome from "react-fontawesome";
import {Alert} from "../../../services/alertService";
import {Button} from "../../../components/buttons/buttons";
import FeatherIcon from "feather-icons-react";
import {Button as AntButton, PageHeader, Table} from "antd";

const CountryList = ({showModal, isLoading, countries, getCountries, getCountryInfo, deleteCountry}) => {
    const columns = [
        {
            title: 'Name',
            dataIndex: 'name',
            key: 'name',
        },
        {
            title: 'Code',
            dataIndex: 'code',
            key: 'code',
        },
        {
            title: 'Latitude',
            dataIndex: 'latitude',
            key: 'latitude',
            render: (key) => key ? key : 'N/A'
        },
        {
            title: 'Longitude',
            dataIndex: 'longitude',
            key: 'longitude',
            render: (key) => key ? key : 'N/A'
        },
        {
            title: 'Currency From Dollar',
            render: (key) => key.currencyFromDollar ? `${key.currencySymbol} ${key.currencyFromDollar}` : 'N/A'
        },
        {
            title: 'Currency From BDT',
            render: (key) => key.currencyFromBDT ? `${key.currencySymbol} ${key.currencyFromBDT}` : 'N/A'
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
                {Scope.checkScopes(['ws_countries_update']) && (
                    <AntButton
                        size="small"
                        type="ghost"
                        className="minimum-mr color-info border-info"
                        icon={<FontAwesome name={"edit"} />}
                        onClick={() => getCountryInfo(key)}
                    />
                )}
                {Scope.checkScopes(['ws_countries_delete']) && (
                    <AntButton
                        size="small"
                        type="ghost"
                        className="color-danger border-danger"
                        icon={<FontAwesome name={"trash"} />}
                        onClick={() => Alert.confirm({action: deleteCountry(key)})}
                    />
                )}
            </div>
        },
    ];

    const headerButtons = [
        <div key="1" className="page-header-action">
            {Scope.checkScopes(['ws_countries_create']) && (
                <Button size="medium" type="primary" onClick={() => showModal('primary')}>
                    <FeatherIcon icon="plus" size={14}/>
                    Add New
                </Button>
            )}
        </div>
    ]
    return (
        <div>
            <PageHeader
                ghost={false}
                title="Countries"
                subTitle={`List of all ${countries?.total} Countries.`}
                onBack={() => window.history.back()}
                extra={headerButtons}
            >
                <Table
                    rowKey="_id"
                    bordered={false}
                    className="table-responsive"
                    loading={isLoading}
                    dataSource={countries.data}
                    columns={columns}
                    // scroll={{ y: window.innerHeight / 2  }}
                    pagination={{
                        total: countries.total,
                        current: countries.page,
                        onChange: async (pageNo, perPageNo) => await getCountries(pageNo, perPageNo)
                    }} />
            </PageHeader>
        </div>
    )
}

export default CountryList;
