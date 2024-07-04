import React from "react";
import {Scope} from "../../../services/scopeService";
import FontAwesome from "react-fontawesome";
import {Alert} from "../../../services/alertService";
import {Button} from "../../../components/buttons/buttons";
import FeatherIcon from "feather-icons-react";
import {Button as AntButton, PageHeader, Table} from "antd";

const SubCategoryList = ({showModal, isLoading, subCategories, getSubCategories, getSubCategoryInfo, deleteSubCategory}) => {
    const columns = [
        {
            title: 'Name',
            dataIndex: 'name',
            key: 'name',
        },
        {
            title: 'Category',
            dataIndex: 'category',
            key: 'category',
            render: (category) => <>{category?.name}</>
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
                {Scope.checkScopes(['ws_sub_categories_update']) && (
                    <AntButton
                        size="small"
                        type="ghost"
                        className="minimum-mr color-info border-info"
                        icon={<FontAwesome name={"edit"} />}
                        onClick={() => getSubCategoryInfo(key)}
                    />
                )}
                {Scope.checkScopes(['ws_sub_categories_delete']) && (
                    <AntButton
                        size="small"
                        type="ghost"
                        className="color-danger border-danger"
                        icon={<FontAwesome name={"trash"} />}
                        onClick={() => Alert.confirm({action: deleteSubCategory(key)})}
                    />
                )}
            </div>
        },
    ];

    const headerButtons = [
        <div key="1" className="page-header-action">
            {Scope.checkScopes(['ws_sub_categories_create']) && (
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
                title="Sub Categories"
                subTitle={`List of all ${subCategories?.total} Sub Categories.`}
                onBack={() => window.history.back()}
                extra={headerButtons}
            >
                <Table
                    rowKey="_id"
                    bordered={false}
                    className="table-responsive"
                    loading={isLoading}
                    dataSource={subCategories.data}
                    columns={columns}
                    // scroll={{ y: window.innerHeight / 2  }}
                    pagination={{
                        total: subCategories.total,
                        current: subCategories.page,
                        onChange: async (pageNo, perPageNo) => await getSubCategories(pageNo, perPageNo)
                    }} />
            </PageHeader>
        </div>
    )
}

export default SubCategoryList;
