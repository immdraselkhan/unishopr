import React from "react";
import {useDispatch} from "react-redux";
import {Button} from "../../../components/buttons/buttons";
import {Col, Form, Input, Modal, Select} from "antd";
import {Constants} from "../../../config/constants";

const CategoryForm = (
    {
        form,
        state,
        category,
        addCategory,
        updateCategory,
        isLoading,
        handleOk
    }
) => {
    const dispatch = useDispatch()
    const layout = { labelCol: { span: 8 }, wrapperCol: { span: 16 }}
    const validateMessages = { required: '${label} is required!' };

    const handleSubmit = async (data) => {
        if (category._id){
            Object.assign(data, {_id: category._id});
            await dispatch(updateCategory(data, handleOk))
        } else
            await dispatch(addCategory(data, handleOk));
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
                title="Categories Form"
                visible={state.visible}
                onCancel={() => handleOk()}
                footer={footerButtons}
            >
                <Form
                    {...layout}
                    name={'categoryForm'}
                    form={form}
                    id={'myForm'}
                    validateMessages={validateMessages}
                    onFinish={handleSubmit}
                >
                    <Form.Item
                        name="name"
                        rules={[{required: true}]}
                        initialValue={category.name ? category.name : null}
                        label="Name"
                    >
                        <Input placeholder="name"/>
                    </Form.Item>
                    <Form.Item
                        name="description"
                        initialValue={category.description ? category.description : null}
                        rules={[{ required: true }]}
                        label="Description"
                    >
                        <Input.TextArea placeholder="Description"/>
                    </Form.Item>
                    <Form.Item
                        name="status"
                        initialValue={category.status ? category.status : ''}
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

export default CategoryForm;
