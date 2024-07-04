import React from "react";
import {Scope} from "../../../services/scopeService";
import FontAwesome from "react-fontawesome";
import {Alert} from "../../../services/alertService";
import {Button} from "../../../components/buttons/buttons";
import FeatherIcon from "feather-icons-react";
import {Button as AntButton, PageHeader, Table} from "antd";

const CityList = ({showModal, isLoading, cities, getCities, getCityInfo, deleteCity}) => {
    const columns = [
        {
            title: 'Name',
            dataIndex: 'name',
            key: 'name',
        },
        {
            title: 'Country',
            dataIndex: 'country',
            key: 'country',
            render: (country) => <>{country?.name}</>
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
            title: 'Status',
            dataIndex: 'status',
            key: 'status',
        },
        {
            title: <div className="text-right">Action</div>,
            dataIndex: '_id',
            key: '_id',
            render: (key) => <div className="text-right">
                {Scope.checkScopes(['ws_cities_update']) && (
                    <AntButton
                        size="small"
                        type="ghost"
                        className="minimum-mr color-info border-info"
                        icon={<FontAwesome name={"edit"} />}
                        onClick={() => getCityInfo(key)}
                    />
                )}
                {Scope.checkScopes(['ws_cities_delete']) && (
                    <AntButton
                        size="small"
                        type="ghost"
                        className="color-danger border-danger"
                        icon={<FontAwesome name={"trash"} />}
                        onClick={() => Alert.confirm({action: deleteCity(key)})}
                    />
                )}
            </div>
        },
    ];

    const headerButtons = [
        <div key="1" className="page-header-action">
            {Scope.checkScopes(['ws_categories_create']) && (
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
                title="Cities"
                subTitle={`List of all ${cities?.total} Cities.`}
                onBack={() => window.history.back()}
                extra={headerButtons}
            >
                <Table
                    rowKey="_id"
                    bordered={false}
                    className="table-responsive"
                    loading={isLoading}
                    dataSource={cities.data}
                    columns={columns}
                    // scroll={{ y: window.innerHeight / 2  }}
                    pagination={{
                        total: cities.total,
                        current: cities.page,
                        onChange: async (pageNo, perPageNo) => await getCities(pageNo, perPageNo)
                    }} />
            </PageHeader>
        </div>
    )
}

export default CityList;
