import React from "react";
import { Button } from "../../../components/buttons/buttons";
import { Col, Form, Input, Modal, Row, Select } from "antd";
import { useDispatch } from "react-redux";
import { phoneFormatted } from "../../../utility/utility";

const TravelsFilter = (
    {
        filter,
        state,
        setState,
        initialFilters,
        filters,
        setFilters,
        isLoading,
        fetchUsers,
        fetchCities,
        users,
        cities,
    }
) => {
    const dispatch = useDispatch()
    const layout = { labelCol: { span: 8 }, wrapperCol: { span: 16 } }
    const validateMessages = { required: '${label} is required!' };

    const handleSubmit = async (data) => {
        await setFilters({
            ...filters,
            ...data,
            users: data.users.toString(),
            from: data.from.toString(),
            to: data.to.toString(),
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
            form="travelsFiltersForm"
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
                title="Travels Filter"
                visible={state.filterVisible}
                onCancel={() => setState({ ...state, filterVisible: false })}
                footer={footerButtons}
                width={800}
            >
                <Form
                    {...layout}
                    name={'TravelsFilter'}
                    form={filter}
                    id={'travelsFiltersForm'}
                    className="my-form"
                    validateMessages={validateMessages}
                    onFinish={handleSubmit}
                >
                    <Row>
                        <Col md={12}>
                            <Form.Item
                                name="users"
                                initialValue={filters?.users ? filters.users.split(",") : []}
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
                                name="from"
                                initialValue={filters?.from ? filters.from.split(",") : []}
                                rules={[{ required: false }]}
                                label="From"
                            >
                                <Select
                                    allowClear
                                    showSearch
                                    loading={isLoading}
                                    filterOption={(input, option) => option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0}
                                    filterSort={(optionA, optionB) => optionA.children.toLowerCase().localeCompare(optionB.children.toLowerCase())}
                                    onSearch={(event) => event?.length && event.length > 3 ? dispatch(fetchCities({ name: event })) : null}
                                >
                                    {cities.length && cities.map((city, key) => (
                                        <Select.Option value={city._id} key={key}>{city.name}</Select.Option>
                                    ))}
                                </Select>
                            </Form.Item>
                        </Col>
                        <Col md={12}>
                            <Form.Item
                                name="to"
                                initialValue={filters?.to ? filters.to.split(",") : []}
                                rules={[{ required: false }]}
                                label="To"
                            >
                                <Select
                                    allowClear
                                    showSearch
                                    loading={isLoading}
                                    filterOption={(input, option) => option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0}
                                    filterSort={(optionA, optionB) => optionA.children.toLowerCase().localeCompare(optionB.children.toLowerCase())}
                                    onSearch={(event) => event?.length && event.length > 3 ? dispatch(fetchCities({ name: event })) : null}
                                >
                                    {cities.length && cities.map((city, key) => (
                                        <Select.Option value={city._id} key={key}>{city.name}</Select.Option>
                                    ))}
                                </Select>
                            </Form.Item>
                        </Col>
                        <Col md={12}>
                            <Form.Item
                                name="travelDate"
                                rules={[{ required: false }]}
                                initialValue={filters?.travelDate ? filters.travelDate : null}
                                label="Travel Date "
                            >
                                <Input type={"date"} placeholder="Travel Date" />
                            </Form.Item>
                        </Col>
                    </Row>
                </Form>
            </Modal>
        </Col>
    )
}

export default TravelsFilter;
