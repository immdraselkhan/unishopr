import React from "react";
import {Scope} from "../../../services/scopeService";
import FontAwesome from "react-fontawesome";
import {Alert} from "../../../services/alertService";
import {Button} from "../../../components/buttons/buttons";
import FeatherIcon from "feather-icons-react";
import {Button as AntButton, PageHeader, Table} from "antd";

const BrandList = ({showModal, isLoading, brands, getBrands, getBrandInfo, deleteBrand}) => {
    const columns = [
        {
            title: 'Name',
            dataIndex: 'name',
            key: 'name',
        },
        {
            title: 'URL',
            dataIndex: 'url',
            key: 'url',
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
                {Scope.checkScopes(['shop_ws_brands_update']) && (
                    <AntButton
                        size="small"
                        type="ghost"
                        className="minimum-mr color-info border-info"
                        icon={<FontAwesome name={"edit"} />}
                        onClick={() => getBrandInfo(key)}
                    />
                )}
                {Scope.checkScopes(['shop_ws_brands_delete']) && (
                    <AntButton
                        size="small"
                        type="ghost"
                        className="color-danger border-danger"
                        icon={<FontAwesome name={"trash"} />}
                        onClick={() => Alert.confirm({action: deleteBrand(key)})}
                    />
                )}
            </div>
        },
    ];

    const headerButtons = [
        <div key="1" className="page-header-action">
            {Scope.checkScopes(['ws_brands_create']) && (
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
                title="Brands"
                subTitle={`List of all ${brands?.total} Brands.`}
                onBack={() => window.history.back()}
                extra={headerButtons}
            >
                <Table
                    rowKey="_id"
                    bordered={false}
                    className="table-responsive"
                    loading={isLoading}
                    dataSource={brands.data}
                    columns={columns}
                    // scroll={{ y: window.innerHeight / 2  }}
                    pagination={{
                        total: brands.total,
                        current: brands.page,
                        onChange: async (pageNo, perPageNo) => await getBrands(pageNo, perPageNo)
                    }} />
            </PageHeader>
        </div>
    )
}

export default BrandList;
