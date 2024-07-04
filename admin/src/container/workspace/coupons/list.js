import React from "react";
import { Scope } from "../../../services/scopeService";
import FontAwesome from "react-fontawesome";
import { Alert } from "../../../services/alertService";
import { Button } from "../../../components/buttons/buttons";
import FeatherIcon from "feather-icons-react";
import { Button as AntButton, PageHeader, Table } from "antd";
import { useHistory } from "react-router-dom";
import { toTimeString } from "../../../utility/dataTime";

const CouponList = ({ showModal, isLoading, coupons, getCoupons, getCouponInfo, deleteCoupon }) => {
    const history = useHistory();
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
            title: 'Discount',
            dataIndex: 'discount',
            key: 'discount',
            render: (discount) => `${discount.value}${discount.type === 'percentage' ? '%' : ' BDT'}`
        },
        {
            title: 'Stats',
            dataIndex: 'stats',
            key: 'stats',
            render: (stats) => stats ? `Orders: ${stats.orders}, Amount: ${stats.amount}` : 'N/A'
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
                {Scope.checkScopes(['workspace_coupons_update']) && (
                    <AntButton
                        size="small"
                        type="ghost"
                        className="minimum-mr color-info border-info"
                        icon={<FontAwesome name={"edit"} />}
                        onClick={() => getCouponInfo(key)}
                    />
                )}
                {Scope.checkScopes(['workspace_coupons_delete']) && (
                    <AntButton
                        size="small"
                        type="ghost"
                        className="color-danger border-danger"
                        icon={<FontAwesome name={"trash"} />}
                        onClick={() => Alert.confirm({ action: deleteCoupon(key) })}
                    />
                )}
            </div>
        },
    ];

    const headerButtons = [
        <div key="1" className="page-header-action">
            {Scope.checkScopes(['workspace_coupons_create']) && (
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
                title="Coupons"
                subTitle={`List of all ${coupons?.total} Coupons.`}
                onBack={() => window.history.back()}
                extra={headerButtons}
            >
                <Table
                    rowKey="_id"
                    bordered={false}
                    className="table-responsive"
                    loading={isLoading}
                    dataSource={coupons.data}
                    columns={columns}
                    // scroll={{ y: window.innerHeight / 2  }}
                    pagination={{
                        total: coupons.total,
                        current: coupons.page,
                        onChange: async (pageNo, perPageNo) => await getCoupons(pageNo, perPageNo)
                    }} />
            </PageHeader>
        </div>
    )
}

export default CouponList;
