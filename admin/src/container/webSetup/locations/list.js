import React from "react";
import {Scope} from "../../../services/scopeService";
import FontAwesome from "react-fontawesome";
import {Alert} from "../../../services/alertService";
import {Button} from "../../../components/buttons/buttons";
import FeatherIcon from "feather-icons-react";
import {Button as AntButton, PageHeader, Table} from "antd";

const LocationList = ({showModal, isLoading, locations, getLocations, getLocationInfo, deleteLocation, getCities}) => {
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
            title: 'City',
            dataIndex: 'city',
            key: 'city',
            render: (city) => <>{city?.name}</>
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
            title: 'Code',
            dataIndex: 'code',
            key: 'code',
            render: (key) => key ? key : 'N/A'
        },
        {
            title: 'Status',
            dataIndex: 'status',
            key: 'status',
        },
        {
            title: <div className="text-right">Action</div>,
            render: (key) => <div className="text-right">
                {Scope.checkScopes(['ws_locations_update']) && (
                    <AntButton
                        size="small"
                        type="ghost"
                        className="minimum-mr color-info border-info"
                        icon={<FontAwesome name={"edit"} />}
                        onClick={() => {getLocationInfo(key?._id);  getCities({countryId: key?.country?._id})}}
                    />
                )}
                {Scope.checkScopes(['ws_locations_delete']) && (
                    <AntButton
                        size="small"
                        type="ghost"
                        className="color-danger border-danger"
                        icon={<FontAwesome name={"trash"} />}
                        onClick={() => Alert.confirm({action: deleteLocation(key)})}
                    />
                )}
            </div>
        },
    ];

    const headerButtons = [
        <div key="1" className="page-header-action">
            {Scope.checkScopes(['ws_locations_create']) && (
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
                title="Locations"
                subTitle={`List of all ${locations?.total} Locations.`}
                onBack={() => window.history.back()}
                extra={headerButtons}
            >
                <Table
                    rowKey="_id"
                    bordered={false}
                    className="table-responsive"
                    loading={isLoading}
                    dataSource={locations.data}
                    columns={columns}
                    // scroll={{ y: window.innerHeight / 2  }}
                    pagination={{
                        total: locations.total,
                        current: locations.page,
                        onChange: async (pageNo, perPageNo) => await getLocations(pageNo, perPageNo)
                    }} />
            </PageHeader>
        </div>
    )
}

export default LocationList;
