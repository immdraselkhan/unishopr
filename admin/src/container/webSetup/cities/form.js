import React from "react";
import { useDispatch } from "react-redux";
import { Button } from "../../../components/buttons/buttons";
import { Col, Form, Input, Modal, Select } from "antd";

const CityForm = (
    {
        form,
        state,
        city,
        addCity,
        updateCity,
        countries,
        isLoading,
        handleOk
    }) => {
    const dispatch = useDispatch()
    const layout = { labelCol: { span: 8 }, wrapperCol: { span: 16 } }

    const validateMessages = {
        required: '${label} is required!',
    };

    const handleSubmit = async (data) => {
        if (city._id) {
            Object.assign(data, { _id: city._id });
            await dispatch(updateCity(data, handleOk))
        } else
            await dispatch(addCity(data, handleOk));
    };

    const footerButtons = [
        <Button
            form="myForm"
            key="submit"
            htmlType="submit"
            type="primary"
            disabled={isLoading}
            size="medium">
            {isLoading ? 'Loading...' : 'Submit'}
        </Button>
    ];
    return (
        <Col md={12}>
            <Modal
                type={state.modalType}
                title="City Form"
                visible={state.visible}
                onCancel={() => handleOk()}
                footer={footerButtons}
            >
                <Form
                    {...layout}
                    name={'cityForm'}
                    form={form}
                    id={'myForm'}
                    validateMessages={validateMessages}
                    onFinish={handleSubmit}>
                    <Form.Item
                        name="name"
                        rules={[{ required: true }]}
                        initialValue={city.name ? city.name : null}
                        label="Name">
                        <Input placeholder="Name" />
                    </Form.Item>
                    <Form.Item
                        name="country"
                        initialValue={city?.country?._id ? city.country._id : ''}
                        rules={[{ required: true }]}
                        label="Country">
                        <Select>
                            <Select.Option value="">Country</Select.Option>
                            {countries.length && countries.map((country) => (
                                <Select.Option key={country._id} value={country._id}>{country.name}</Select.Option>
                            ))}
                        </Select>
                    </Form.Item>
                    <Form.Item
                        name="latitude"
                        initialValue={city.latitude ? city.latitude : null}
                        label="Latitude">
                        <Input placeholder="Latitude" />
                    </Form.Item>
                    <Form.Item
                        name="longitude"
                        initialValue={city.longitude ? city.longitude : null}
                        label="Longitude">
                        <Input placeholder="Longitude" />
                    </Form.Item>
                    <Form.Item
                        name="status"
                        initialValue={city.status ? city.status : ''}
                        rules={[{ required: true }]}
                        label="Status">
                        <Select>
                            <Select.Option value="">Status</Select.Option>
                            <Select.Option value="active">Active</Select.Option>
                            <Select.Option value="inactive">Inactive</Select.Option>
                        </Select>
                    </Form.Item>
                </Form>
            </Modal>

        </Col>
    )
}

export default CityForm;
