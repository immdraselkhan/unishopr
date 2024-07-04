import React, {useState} from "react";
import {PageHeader, Table, Avatar, Switch, Input, Space, Button as AntButton} from "antd";
import {Constants} from "../../../config/constants";
import {Scope} from "../../../services/scopeService";
import {Button} from "../../../components/buttons/buttons";
import FeatherIcon from "feather-icons-react";
import FontAwesome from "react-fontawesome";
import {Alert} from "../../../services/alertService";
import { EditFilled } from '@ant-design/icons';


const ProductList = (
    {
        isLoading,
        products,
        getProducts,
        showModal,
        getProductForAttribute,
        deleteProduct,
        getProductInfo,
        statusUpdate
    }
) => {

    const initiateParams = {
        pageNo: 0,
        perPageNo: 10,
        nameSearch: '',
        priceSort: ''
    };

    const [params, setParams] = useState(initiateParams);

    const headerButtons = [
        <div key="1" className="page-header-action">
            {Scope.checkScopes(['workspace_products_create']) && (
                <Button size="medium" type="primary" onClick={() => showModal('primary')}>
                    <FeatherIcon icon="plus" size={14}/>
                    Add New
                </Button>
            )}
        </div>
    ];

    const handleTableChange = async ({pagination, filters, sorter, search}) => {
        const values = params;

        if (pagination) values.pageNo = pagination.current ? pagination.current : 0;
        if (pagination) values.perPageNo = pagination.pageSize ? pagination.pageSize : 10;
        if (sorter) values.priceSort = sorter?.field && sorter.field === 'price' ? sorter.order : '';
        if (search) values.nameSearch = search?.key && search.key === 'name' ? search.value : '';

        // fetchApi
        await setParams(values)
        await getProducts(values)
    };

    const getColumnSearchProps = dataIndex => ({
        filterDropdown: ({ setSelectedKeys, selectedKeys, confirm, clearFilters }) => (
            <div style={{ padding: 8 }}>
                <Input
                    placeholder={`Search ${dataIndex}`}
                    value={selectedKeys[0]}
                    onChange={e => setSelectedKeys(e.target.value ? [e.target.value] : [])}
                    onPressEnter={({target}) => handleTableChange({search: {key: dataIndex, value: target.value}})}
                    style={{ marginBottom: 8, display: 'block' }}
                />
            </div>
        ),
        filterIcon: () => <EditFilled className={params.nameSearch ? 'color-primary' : ''} />,
        onFilter: (value, record) => record[dataIndex] ? record[dataIndex].toString().toLowerCase().includes(value.toLowerCase()) : '',
    });

    const columns = [
        {
            title: 'Product Id',
            dataIndex: 'productId',
            key: 'productId',
        },
        {
            title: 'Name',
            ...getColumnSearchProps('name'),
            filterSearch: true,
            render: (product) => <span>
                <Avatar src={Constants.S3_BASE_URL(product.file.featured)} />
                <span className="pl-5">{`${product.name}`}</span>
            </span>
        },
        {
            title: 'Category',
            dataIndex: 'category',
            key: 'category',
            render: (country) => <>{country?.name}</>
        },
        {
            title: 'Price',
            dataIndex: 'price',
            key: 'price',
            sorter: true,
            render: (price) => <>Regular ({price.regular}) - New ({price.new})</>
        },
        {
            title: 'Stock',
            dataIndex: 'stock',
            key: 'stock',
            render: (stock) => <>{stock.quantity}</>
        },
        {
            title: 'Status',
            render: (key) => <><Switch size="small" defaultChecked={key.status === 'active'} onChange={statusUpdate(key._id)} /></>
        },
        {
            title: <div className="text-right">Action</div>,
            render: (key) => <div className="text-right">
                {Scope.checkScopes(['workspace_products_update']) && (
                    <AntButton
                        size="small"
                        type="ghost"
                        className="minimum-mr color-primary border-primary"
                        onClick={() => getProductForAttribute(key?._id)}
                        icon={<FontAwesome name={"list-ul"} />}
                    />
                )}
                {Scope.checkScopes(['workspace_products_update']) && (
                    <AntButton
                        size="small"
                        type="ghost"
                        className="minimum-mr color-info border-info"
                        icon={<FontAwesome name={"edit"} />}
                        onClick={() => getProductInfo(key?._id)}
                    />
                )}
                {Scope.checkScopes(['workspace_products_delete']) && (
                    <AntButton
                        size="small"
                        type="ghost"
                        className="color-danger border-danger"
                        icon={<FontAwesome name={"trash"} />}
                        onClick={() => Alert.confirm({action: deleteProduct(key?._id)})}
                    />
                )}
            </div>
        },
    ];

    return (
        <div>
            <PageHeader
                ghost={false}
                title="Products"
                subTitle={`List of all ${products?.total} Products.`}
                onBack={() => window.history.back()}
                extra={headerButtons}
            >
                <Table
                    rowKey="_id"
                    bordered={false}
                    className="table-responsive"
                    loading={isLoading}
                    dataSource={products.data}
                    columns={columns}
                    // scroll={{ y: window.innerHeight / 2  }}
                    onChange={(pagination, filters, sorter) => handleTableChange({pagination, filters, sorter})}
                    pagination={{
                        total: products.total,
                        current: products.page ? products.page : 1,
                        // onChange: async (pageNo, perPageNo) => await getProducts(pageNo, perPageNo)
                    }}
                />
            </PageHeader>
        </div>
    )
}

export default ProductList;
