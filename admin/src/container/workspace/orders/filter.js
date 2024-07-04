import React from "react";
import { Button } from "../../../components/buttons/buttons";
import { Col, Form, Input, Modal, Row, Select } from "antd";
import { useDispatch } from "react-redux";
import { phoneFormatted } from "../../../utility/utility";

const OrdersFilter = (
    {
        filter,
        state,
        setState,
        initialFilters,
        filters,
        setFilters,
        fetchUsers,
        users,
        isLoading
    }
) => {
    const dispatch = useDispatch()
    const layout = { labelCol: { span: 8 }, wrapperCol: { span: 16 } }
    const validateMessages = { required: '${label} is required!' };

    const handleSubmit = async (data) => {
        await setFilters({
            ...filters,
            ...data,
            userIds: data.userIds.toString(),
            status: data.status.toString(),
        })
        await setState({ ...state, filterVisible: false })
    };

    const resetFilters = async () => {
        await setFilters(initialFilters);
        await filter.resetFields();
    }

    const footerButtons = [
        <Button
            key="reset-button"
            htmlType="button"
            type="secondary"
            disabled={isLoading}
            size="medium"
            onClick={resetFilters}
        >
            {isLoading ? 'Loading...' : 'Reset'}
        </Button>,
        <Button
            form="ordersFilterForm"
            key="submit-button"
            htmlType="submit"
            type="primary"
            disabled={isLoading}
            size="medium"
        >
            {isLoading ? 'Loading...' : 'Submit'}
        </Button>
    ];

    return (
        <Col md={12}>
            <Modal
                type={"primary"}
                title="Order Filter"
                visible={state.filterVisible}
                onCancel={() => setState({ ...state, filterVisible: false })}
                footer={footerButtons}
                width={800}
            >
                <Form
                    {...layout}
                    name={'ordersFilter'}
                    form={filter}
                    id={'ordersFilterForm'}
                    className="my-form"
                    validateMessages={validateMessages}
                    onFinish={handleSubmit}
                >
                    <Row>
                        <Col md={12}>
                            <Form.Item
                                name="userIds"
                                initialValue={filters?.userIds ? filters.userIds.split(",") : []}
                                rules={[{ required: false }]}
                                label="Users"
                            >
                                <Select
                                    allowClear
                                    showSearch
                                    mode="multiple"
                                    loading={isLoading}
                                    filterOption={(input, option) => option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0}
                                    filterSort={(optionA, optionB) => optionA.children.toLowerCase().localeCompare(optionB.children.toLowerCase())}
                                    onSearch={(event) => event?.length && event.length > 3 ? dispatch(fetchUsers({ search: phoneFormatted(event) })) : null}
                                >
                                    {users.length && users.map((user, key) => (
                                        <Select.Option value={user._id} key={key}>{`${user.firstName} ${user.lastName} - 0${user.phone.phone} - ${user.email}`}</Select.Option>
                                    ))}
                                </Select>
                            </Form.Item>
                        </Col>
                        <Col md={12}>
                            <Form.Item
                                name="orderId"
                                initialValue={filters?.orderId ? filters.orderId : null}
                                rules={[{ required: false }]}
                                label="Order Id"
                            >
                                <Input placeholder="Order Id" />
                            </Form.Item>
                        </Col>
                        <Col md={12}>
                            <Form.Item
                                name="leadId"
                                initialValue={filters?.leadId ? filters.leadId : null}
                                rules={[{ required: false }]}
                                label="Lead Id"
                            >
                                <Input placeholder="Lead Id" />
                            </Form.Item>
                        </Col>
                        <Col md={12}>
                            <Form.Item
                                name="invoiceId"
                                initialValue={filters?.invoiceId ? filters.invoiceId : null}
                                rules={[{ required: false }]}
                                label="Invoices Id"
                            >
                                <Input placeholder="Invoices Id" />
                            </Form.Item>
                        </Col>
                        <Col md={12}>
                            <Form.Item
                                name="invoiceNo"
                                initialValue={filters?.invoiceNo ? filters.invoiceNo : null}
                                rules={[{ required: false }]}
                                label="Invoices No"
                            >
                                <Input placeholder="Invoices No" />
                            </Form.Item>
                        </Col>
                        <Col md={12}>
                            <Form.Item
                                name="orderDateFrom"
                                rules={[{ required: false }]}
                                initialValue={filters?.orderDateFrom ? filters.orderDateFrom : null}
                                label="Order From"
                            >
                                <Input type={"date"} placeholder="Order Date From" />
                            </Form.Item>
                        </Col>
                        <Col md={12}>
                            <Form.Item
                                name="orderDateTo"
                                rules={[{ required: false }]}
                                initialValue={filters?.orderDateTo ? filters.orderDateTo : null}
                                label="Order To"
                            >
                                <Input type={"date"} placeholder="Order Date To" />
                            </Form.Item>
                        </Col>
                        <Col md={12}>
                            <Form.Item
                                name="sort"
                                initialValue={filters?.sort ? filters.sort : ""}
                                rules={[{ required: false }]}
                                label="Sort"
                            >
                                <Select
                                    allowClear
                                >
                                    <Select.Option value="">Default</Select.Option>
                                    <Select.Option value="quantityDesc">Quantity - Low to High</Select.Option>
                                    <Select.Option value="quantityAsc">Quantity - High to Low</Select.Option>
                                    <Select.Option value="paidAmountDesc">Paid Amount - Low to High</Select.Option>
                                    <Select.Option value="paidAmountAsc">Paid Amount - High to Low</Select.Option>
                                    {/* <Select.Option value="foreignPriceDesc">Foreign Price - Low to High</Select.Option>
                                    <Select.Option value="foreignPriceAsc">Foreign Price - High to Low</Select.Option> */}
                                    <Select.Option value="createdAtDesc">CreatedAt - New To Old</Select.Option>
                                    <Select.Option value="createdAtAsc">CreatedAt - Old To New</Select.Option>
                                </Select>
                            </Form.Item>
                        </Col>
                        <Col md={12}>
                            <Form.Item
                                name="status"
                                initialValue={filters?.status ?? ""}
                                rules={[{ required: false }]}
                                label="Status"
                            >
                                <Select
                                    allowClear
                                    loading={isLoading}
                                    initialValue={filters?.status ? filters.status : ""}
                                >
                                    <Select.Option value="">Status</Select.Option>
                                    <Select.Option value="placed">Placed</Select.Option>
                                    <Select.Option value="confirmed">Confirmed</Select.Option>
                                    <Select.Option value="dispatched">Dispatched</Select.Option>
                                    <Select.Option value="delivered">Delivered</Select.Option>
                                    <Select.Option value="cancelled">Cancelled</Select.Option>
                                </Select>
                            </Form.Item>
                        </Col>
                    </Row>
                </Form>
            </Modal>
        </Col>
    )
}

export default OrdersFilter;
