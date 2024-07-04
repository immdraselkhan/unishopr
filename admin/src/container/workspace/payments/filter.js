import React from "react";
import { Button } from "../../../components/buttons/buttons";
import { Col, Form, Input, Modal, Row, Select } from "antd";
import { useDispatch } from "react-redux";
import { phoneFormatted } from "../../../utility/utility";

const PaymentsFilter = (
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
            invoiceIds: data.invoiceIds.toString(),
            invoiceNos: data.invoiceNos.toString(),
            transactionIds: data.transactionIds.toString()
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
            form="paymentsFilterForm"
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
                title="Payments Filter"
                visible={state.filterVisible}
                onCancel={() => setState({ ...state, filterVisible: false })}
                footer={footerButtons}
                width={800}
            >
                <Form
                    {...layout}
                    name={'paymentsFilter'}
                    form={filter}
                    id={'paymentsFilterForm'}
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
                                name="invoiceIds"
                                initialValue={filters?.invoiceIds ? filters.invoiceIds.split(",") : []}
                                rules={[{ required: false }]}
                                label="Invoices Id"
                            >
                                <Input placeholder="Invoices Id" />
                            </Form.Item>
                        </Col>
                        <Col md={12}>
                            <Form.Item
                                name="invoiceNos"
                                initialValue={filters?.invoiceNos ? filters.invoiceNos.split(",") : []}
                                rules={[{ required: false }]}
                                label="Invoices No"
                            >
                                <Input placeholder="Invoices No" />
                            </Form.Item>
                        </Col>
                        <Col md={12}>
                            <Form.Item
                                name="transactionIds"
                                initialValue={filters?.transactionIds ? filters.transactionIds.split(",") : []}
                                rules={[{ required: false }]}
                                label="Transactions Id"
                            >
                                <Input placeholder="Transactions Id" />
                            </Form.Item>
                        </Col>
                        <Col md={12}>
                            <Form.Item
                                name="paymentDateFrom"
                                rules={[{ required: false }]}
                                initialValue={filters?.paymentDateFrom ? filters.paymentDateFrom : null}
                                label="Payment From"
                            >
                                <Input type={"date"} placeholder="Payment Date From" />
                            </Form.Item>
                        </Col>
                        <Col md={12}>
                            <Form.Item
                                name="paymentDateTo"
                                rules={[{ required: false }]}
                                initialValue={filters?.paymentDateTo ? filters.paymentDateTo : null}
                                label="Payment To"
                            >
                                <Input type={"date"} placeholder="Payment Date To" />
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
                                    <Select.Option value="amountDesc">Amount - Low to High</Select.Option>
                                    <Select.Option value="amountAsc">Amount - High to Low</Select.Option>
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
                                    <Select.Option value="initiated">Initiated</Select.Option>
                                    <Select.Option value="completed">Completed</Select.Option>
                                    <Select.Option value="failed">Failed</Select.Option>
                                </Select>
                            </Form.Item>
                        </Col>

                    </Row>
                </Form>
            </Modal>
        </Col>
    )
}

export default PaymentsFilter;
