import React from "react";
import {useDispatch, useSelector} from "react-redux";
import {Button} from "../../../components/buttons/buttons";
import {Col, Form, Input, Modal, Select} from "antd";

const LocationForm = ({form, state, location, addLocation, updateLocation, countries, getCities, isLoading, handleOk}) => {
    const dispatch = useDispatch()
    const cities = useSelector(state => state.utilities.cities);
    const layout = { labelCol: { span: 8 }, wrapperCol: { span: 16 }}

    const validateMessages = {
        required: '${label} is required!',
    };

    const handleSubmit = async (data) => {
        if (location._id){
            Object.assign(data, {_id: location._id});
            await dispatch(updateLocation(data, handleOk))
        } else
            await dispatch(addLocation(data, handleOk));
    };

    const onChangeCountry = async (event) => {
        dispatch(getCities({countryId: event}))
    }

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
                title="Location Form"
                visible={state.visible}
                onCancel={() => handleOk()}
                footer={footerButtons}
            >
                <Form
                    {...layout}
                    name={'locationForm'}
                    form={form}
                    id={'myForm'}
                    validateMessages={validateMessages}
                    onFinish={handleSubmit}>
                    <Form.Item
                        name="name"
                        rules={[{required: true}]}
                        initialValue={location.name ? location.name : null}
                        label="Name">
                        <Input placeholder="Name"/>
                    </Form.Item>
                    <Form.Item
                        name="country"
                        initialValue={location?.country?._id ? location.country._id : ''}
                        rules={[{ required: true }]}
                        label="Country">
                        <Select onChange={(event) => {getCities({countryId: event}); form.setFieldsValue({city: ""})}}>
                            <Select.Option value="">Country</Select.Option>
                            {countries.length && countries.map((country) => (
                                <Select.Option key={country._id} value={country._id}>{country.name}</Select.Option>
                            ))}
                        </Select>
                    </Form.Item>
                    <Form.Item
                        name="city"
                        initialValue={location?.city?._id ? location.city._id : ''}
                        rules={[{ required: true }]}
                        label="City">
                        <Select>
                            <Select.Option value="">City</Select.Option>
                            {cities.length && cities.map((city) => (
                                <Select.Option key={city._id} value={city._id}>{city.name}</Select.Option>
                            ))}
                        </Select>
                    </Form.Item>
                    <Form.Item
                        name="latitude"
                        initialValue={location.latitude ? location.latitude : null}
                        label="Latitude">
                        <Input placeholder="Latitude"/>
                    </Form.Item>
                    <Form.Item
                        name="longitude"
                        initialValue={location.longitude ? location.longitude : null}
                        label="Longitude">
                        <Input placeholder="Longitude"/>
                    </Form.Item>
                    <Form.Item
                        name="code"
                        initialValue={location.code ? location.code : null}
                        rules={[{ required: true }]}
                        label="Code">
                        <Input placeholder="Code"/>
                    </Form.Item>
                    <Form.Item
                        name="status"
                        initialValue={location.status ? location.status : ''}
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

export default LocationForm;
