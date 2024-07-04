import { Col, Form, Input, Modal, Select } from "antd";
import React from "react";
import { useDispatch } from "react-redux";
import { Button } from "../../../components/buttons/buttons";

const TagForm = ({
    form, state, tag, addTag,
    updateTag, isLoading, handleOk
}) => {
    const dispatch = useDispatch()
    const layout = { labelCol: { span: 8 }, wrapperCol: { span: 16 }}

    const validateMessages = {
        required: '${label} is required!',
    };

    const handleSubmit = async (data) => {
        if (tag._id){
            Object.assign(data, {_id: tag._id});
            await dispatch(updateTag(data, handleOk))
        } else
            await dispatch(addTag(data, handleOk));
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
                title="Tag Form"
                visible={state.visible}
                onCancel={() => handleOk()}
                footer={footerButtons}
            >
                <Form
                    {...layout}
                    name={'tagForm'}
                    form={form}
                    id={'myForm'}
                    validateMessages={validateMessages}
                    onFinish={handleSubmit}>
                    <Form.Item
                        name="name"
                        rules={[{required: true}]}
                        initialValue={tag.name ? tag.name : null}
                        label="Name">
                        <Input placeholder="name"/>
                    </Form.Item>
                    <Form.Item
                        name="description"
                        initialValue={tag.description ? tag.description : null}
                        // rules={[{ required: true }]}
                        label="Description">
                        <Input.TextArea placeholder="Description"/>
                    </Form.Item>
                    <Form.Item
                        name="status"
                        initialValue={tag.status ? tag.status : ''}
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

export default TagForm;
