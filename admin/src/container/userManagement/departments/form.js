import React from "react";
import {useDispatch} from "react-redux";
import {Button} from "../../../components/buttons/buttons";
import {Col, Form, Input, Modal, Select} from "antd";
import {Constants} from "../../../config/constants";

const DepartmentForm = (
    {
        form,
        state,
        department,
        addDepartment,
        updateDepartment,
        isLoading,
        handleOk
    }
) => {
    const dispatch = useDispatch()
    const layout = { labelCol: { span: 8 }, wrapperCol: { span: 16 }}
    const validateMessages = { required: '${label} is required!' };

    const handleSubmit = async (data) => {
        if (department._id){
            Object.assign(data, {_id: department._id});
            await dispatch(updateDepartment(data, handleOk))
        } else
            await dispatch(addDepartment(data, handleOk));
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
                title="Departments Form"
                visible={state.visible}
                onCancel={() => handleOk()}
                footer={footerButtons}
            >
                <Form
                    {...layout}
                    name={'departmentForm'}
                    form={form}
                    id={'myForm'}
                    validateMessages={validateMessages}
                    onFinish={handleSubmit}
                >
                    <Form.Item
                        name="name"
                        rules={[{required: true}]}
                        initialValue={department.name ? department.name : null}
                        label="Name"
                    >
                        <Input placeholder="name"/>
                    </Form.Item>
                    <Form.Item
                        name="description"
                        initialValue={department.description ? department.description : null}
                        rules={[{ required: true }]}
                        label="Description"
                    >
                        <Input.TextArea placeholder="Description"/>
                    </Form.Item>
                    <Form.Item
                        name="status"
                        initialValue={department.status ? department.status : ''}
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

export default DepartmentForm;
