import React from "react";
import {useDispatch} from "react-redux";
import {Button} from "../../../components/buttons/buttons";
import {Col, Form, Input, Modal, Select} from "antd";
import {Constants} from "../../../config/constants";

const LeadAttributeForm = (
    {
        form,
        state,
        leadAttribute,
        addLeadAttribute,
        updateLeadAttribute,
        isLoading,
        countries,
        handleOk
    }
) => {
    const dispatch = useDispatch()
    const layout = { labelCol: { span: 8 }, wrapperCol: { span: 16 }}
    const validateMessages = { required: '${label} is required!' };

    const handleSubmit = async (data) => {
        if (leadAttribute._id){
            Object.assign(data, {_id: leadAttribute._id});
            await dispatch(updateLeadAttribute(data, handleOk))
        } else
            await dispatch(addLeadAttribute(data, handleOk));
    };

    const footerButtons = [
        <Button
            form="myForm"
            key="submit"
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
                title="Lead Attributes Form"
                visible={state.visible}
                onCancel={() => handleOk()}
                footer={footerButtons}
            >
                <Form
                    {...layout}
                    name={'leadAttributeForm'}
                    form={form}
                    id={'myForm'}
                    validateMessages={validateMessages}
                    onFinish={handleSubmit}
                >
                    <Form.Item
                        name="name"
                        rules={[{required: true}]}
                        initialValue={leadAttribute.name ? leadAttribute.name : null}
                        label="Name"
                    >
                        <Input placeholder="name"/>
                    </Form.Item>
                    <Form.Item
                        name="description"
                        initialValue={leadAttribute.description ? leadAttribute.description : null}
                        rules={[{ required: false }]}
                        label="Description"
                    >
                        <Input.TextArea placeholder="Description"/>
                    </Form.Item>
                    <Form.Item
                        name="country"
                        initialValue={leadAttribute?.country?._id ? leadAttribute.country._id : ''}
                        rules={[{ required: false }]}
                        label="Country">
                        <Select>
                            <Select.Option value="">Country</Select.Option>
                            {countries.length && countries.map((country) => (
                                <Select.Option key={country._id} value={country._id}>{country.name}</Select.Option>
                            ))}
                        </Select>
                    </Form.Item>
                    <Form.Item
                        name="value"
                        rules={[{required: false}]}
                        initialValue={leadAttribute.value ? leadAttribute.value : null}
                        label="Value">
                        <Input type={'number'} placeholder="Value"/>
                    </Form.Item>
                    <Form.Item
                        name="type"
                        rules={[{required: false}]}
                        initialValue={leadAttribute.type ? leadAttribute.type : null}
                        label="Type">
                        <Select>
                            <Select.Option value="">Type</Select.Option>
                            <Select.Option value="percentage">Percentage</Select.Option>
                            <Select.Option value="flat">Flat</Select.Option>
                        </Select>
                    </Form.Item>
                    <Form.Item
                        name="status"
                        initialValue={leadAttribute.status ? leadAttribute.status : ''}
                        rules={[{ required: true }]}
                        label="Status"
                    >
                        <Select>
                            {Constants.STATUS.map((status, si) => (
                                <Select.Option key={si} value={status.value}>{status.label}</Select.Option>
                            ))}
                        </Select>
                    </Form.Item>
                </Form>
            </Modal>
        </Col>
    )
}

export default LeadAttributeForm;
