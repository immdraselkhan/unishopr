import {Modal} from "../../../components/modals/antd-modals";
import {Button} from "../../../components/buttons/buttons";
import {Col, Form, Input, Select} from "antd";
import React from "react";
import {useDispatch} from "react-redux";
import {Constants} from "../../../config/constants";

const RoleForm = (
    {
        form,
        state,
        role,
        addRole,
        updateRole,
        isLoading,
        handleOk
    }
) => {
    const dispatch = useDispatch();
    const layout = { labelCol: { span: 8 }, wrapperCol: { span: 16 } };
    const validateMessages = { required: '${label} is required!' };

    const handleSubmit = async (data) => {
        if (role._id){
            Object.assign(data, {_id: role._id});
            await dispatch(updateRole(data, handleOk))
        } else
            await dispatch(addRole(data, handleOk));
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
                type={state.modalType}
                title="Role Form"
                visible={state.visible}
                onCancel={() => handleOk()}
                footer={footerButtons}
            >
                <Form
                    {...layout}
                    name="roleForm"
                    form={form}
                    id="myForm"
                    validateMessages={validateMessages}
                    onFinish={handleSubmit}
                >
                    <Form.Item
                        name="name"
                        rules={[{ required: true }]}
                        initialValue={role.name ? role.name : null}
                        label="Name"
                    >
                        <Input placeholder="Name"/>
                    </Form.Item>
                    <Form.Item
                        name="description"
                        initialValue={role.description ? role.description : null}
                        rules={[{ required: true }]}
                        label="Description"
                    >
                        <Input.TextArea placeholder="Description"/>
                    </Form.Item>
                    <Form.Item
                        name="status"
                        initialValue={role.status ? role.status : ''}
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

export default RoleForm;
