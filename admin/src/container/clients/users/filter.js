import React from "react";
import { Button } from "../../../components/buttons/buttons";
import { Col, Form, Input, Modal, Row, Select } from "antd";
import { useDispatch } from "react-redux";

const UsersFilter = (
    {
        filter,
        state,
        setState,
        initialFilters,
        filters,
        setFilters,
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
            name: data.name.toString(),
            phone: data.number.toString(),
            email: data.email.toString(),
            gender: data.gender.toString(),
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
            form="usersFilterForm"
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
                title="Users Filter"
                visible={state.filterVisible}
                onCancel={() => setState({ ...state, filterVisible: false })}
                footer={footerButtons}
                width={800}
            >
                <Form
                    {...layout}
                    name={'usersFilter'}
                    form={filter}
                    id={'usersFilterForm'}
                    className="my-form"
                    validateMessages={validateMessages}
                    onFinish={handleSubmit}
                >
                    <Row>
                        <Col md={12}>
                            <Form.Item
                                name="name"
                                initialValue={filters?.name ? filters.name : ""}
                                rules={[{ required: false }]}
                                label="Name"
                            >
                                <Input placeholder="Name" />
                            </Form.Item>
                        </Col>
                        <Col md={12}>
                            <Form.Item
                                name="email"
                                initialValue={filters?.email ? filters.email : ""}
                                rules={[{ required: false }]}
                                label="Email"
                            >
                                <Input placeholder="Email" />
                            </Form.Item>
                        </Col>
                        <Col md={12}>
                            <Form.Item
                                name="number"
                                initialValue={filters?.phone ? filters.phone : ''}
                                rules={[{ required: false }]}
                                label="Mobile Number"
                            >
                                <Input placeholder="Mobile Number" />
                            </Form.Item>
                        </Col>
                        <Col md={12}>
                            <Form.Item
                                name="gender"
                                initialValue={filters?.gender ? filters.gender : ""}
                                rules={[{ required: false }]}
                                label="Gender"
                            >
                                <Select
                                    allowClear
                                    loading={isLoading}
                                    initialValue={filters?.gender ? filters.gender : ""}
                                >
                                    <Select.Option value="">Gender</Select.Option>
                                    <Select.Option value="male">Male</Select.Option>
                                    <Select.Option value="female">Female</Select.Option>
                                    <Select.Option value="other">Other</Select.Option>
                                </Select>
                            </Form.Item>
                        </Col>
                        <Col md={12}>
                            <Form.Item
                                name="createdDateFrom"
                                rules={[{ required: false }]}
                                initialValue={filters?.createdDateFrom ? filters.createdDateFrom : null}
                                label="User Created Date From"
                            >
                                <Input type={"date"} placeholder="User Created Date From" />
                            </Form.Item>
                        </Col>
                        <Col md={12}>
                            <Form.Item
                                name="createdDateTo"
                                rules={[{ required: false }]}
                                initialValue={filters?.createdDateTo ? filters.createdDateTo : null}
                                label="Created To"
                            >
                                <Input type={"date"} placeholder="Created To" />
                            </Form.Item>
                        </Col>
                    </Row>
                </Form>
            </Modal>
        </Col>
    )
}

export default UsersFilter;
