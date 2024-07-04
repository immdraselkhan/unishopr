import React from "react";
import {useDispatch} from "react-redux";
import {Button} from "../../../components/buttons/buttons";
import {Col, Form, Input, Modal, Radio, Row, Select} from "antd";

const UserForm = ({form, state, user, addUser, updateUser, isLoading, handleOk, roles}) => {
    const dispatch = useDispatch();
    const layout = {labelCol: {span: 8}, wrapperCol: {span: 16}};
    const validateMessages = { required: '${label} is required!' };

    const handleSubmit = async (data) => {
        if (user?._id) {
            Object.assign(data, {_id: user._id});
            await dispatch(updateUser(data, handleOk))
        } else
            await dispatch(addUser(data, handleOk));
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
        <Row md={12}>
            <Modal
                type={state.modalType}
                title="Users Form"
                visible={state.visible}
                onCancel={() => handleOk()}
                footer={footerButtons}
                width={1000}
            >
                <Form
                    {...layout}
                    name={'userForm'}
                    form={form}
                    id={'myForm'}
                    validateMessages={validateMessages}
                    onFinish={handleSubmit}
                >
                    <Row>
                        <Col md={12}>
                            <Form.Item
                                name="firstName"
                                rules={[{required: true}]}
                                initialValue={user?.personal?.firstName ? user?.personal?.firstName : null}
                                label="First Name"
                            >
                                <Input placeholder="First Name"/>
                            </Form.Item>
                            <Form.Item
                                name="lastName"
                                rules={[{required: true}]}
                                initialValue={user?.personal?.lastName ? user?.personal?.lastName : null}
                                label="Last Name"
                            >
                                <Input placeholder="Last Name"/>
                            </Form.Item>
                            <Form.Item
                                name="phone"
                                initialValue={user?.personal?.phone ? user?.personal?.phone : ""}
                                rules={[{required: true}]}
                                label="Phone"
                            >
                                <Input placeholder="Phone"/>
                            </Form.Item>
                            <Form.Item
                                name="username"
                                initialValue={user?.username ? user?.username : null}
                                rules={[{required: true}]}
                                label="Username"
                            >
                                <Input placeholder="Username"/>
                            </Form.Item>
                            <Form.Item
                                name="email"
                                initialValue={user?.email ? user?.email : null}
                                rules={[{required: true}]}
                                label="Email"
                            >
                                <Input placeholder="Email"/>
                            </Form.Item>
                            <Form.Item
                                name="fathersName"
                                initialValue={user?.personal?.fathersName ? user?.personal?.fathersName : ""}
                                label="Father's Name"
                            >
                                <Input placeholder="Father's Name"/>
                            </Form.Item>
                            <Form.Item
                                name="fathersPhone"
                                initialValue={user?.personal?.fathersPhone ? user?.personal?.fathersPhone : ""}
                                label="Father's Phone"
                            >
                                <Input placeholder="Father's Phone"/>
                            </Form.Item>
                        </Col>
                        <Col md={12}>
                            <Form.Item
                                name="mothersName"
                                initialValue={user?.personal?.mothersName ? user?.personal?.mothersName : ""}
                                label="Mother's Name"
                            >
                                <Input placeholder="Mother's Name"/>
                            </Form.Item>
                            <Form.Item
                                name="mothersPhone"
                                initialValue={user?.personal?.mothersPhone ? user?.personal?.mothersPhone : ""}
                                label="Mother's Phone"
                            >
                                <Input placeholder="Mother's Phone"/>
                            </Form.Item>
                            <Form.Item
                                name="presentAddress"
                                initialValue={user?.personal?.presentAddress ? user?.personal?.presentAddress : ""}
                                label="Present Address"
                            >
                                <Input placeholder="Present Address"/>
                            </Form.Item>
                            <Form.Item
                                name="permanentAddress"
                                initialValue={user?.personal?.permanentAddress ? user?.personal?.permanentAddress : ""}
                                label="Permanent Address"
                            >
                                <Input placeholder="Permanent Address"/>
                            </Form.Item>
                            <Form.Item
                                name="roleId"
                                initialValue={user?.role?._id ? user?.role?._id : ""}
                                rules={[{required: true}]}
                                label="Role"
                            >
                                <Select>
                                    <Select.Option value="">Roles</Select.Option>
                                    {roles.map((role) =>
                                        <Select.Option key={role._id} value={role._id}>{role.name}</Select.Option>
                                    )}
                                </Select>
                            </Form.Item>
                            <Form.Item
                                name="status"
                                initialValue={user?.status ? user?.status : ''}
                                rules={[{required: true}]}
                                label="Status"
                            >
                                <Select>
                                    <Select.Option value="">Select One</Select.Option>
                                    <Select.Option value="active">Active</Select.Option>
                                    <Select.Option value="inactive">Inactive</Select.Option>
                                </Select>
                            </Form.Item>
                            <Form.Item
                                name="gender"
                                initialValue={user?.personal?.gender ? user?.personal?.gender : null}
                                rules={[{required: true}]}
                                label="Gender"
                            >
                                <Radio.Group>
                                    <Radio value="male">Male</Radio>
                                    <Radio value="female">Female</Radio>
                                </Radio.Group>
                            </Form.Item>
                            <Form.Item
                                name="superAdmin"
                                initialValue={!!user?.superAdmin}
                                rules={[{required: true}]}
                                label="Super Admin"
                            >
                                <Radio.Group>
                                    <Radio value={true}>Yes</Radio>
                                    <Radio value={false}>No</Radio>
                                </Radio.Group>
                            </Form.Item>
                        </Col>
                    </Row>
                </Form>
            </Modal>
        </Row>
    )
};

export default UserForm;
