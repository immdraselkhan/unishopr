import React from "react";
import {useDispatch} from "react-redux";
import {Button} from "../../../components/buttons/buttons";
import {Col, Form, Input, Modal, Select} from "antd";

const UserForm = ({isLoading, state, handleOk, form, addUser, userInfo, countries, updateUser}) => {
    const dispatch = useDispatch();
    const layout = { labelCol: { span: 8 }, wrapperCol: { span: 16 }}
    const validateMessages = { required: '${label} is required!', };
    const user = userInfo;

    const handleSubmit = async (data) => {
        const country = countries.find(c => c._id === data.country);
        const  formData = {
            firstName: data.firstName,
            lastName: data.lastName,
            email: data.email,
            phone: {
                phone: data.phone,
                country: {
                    _id: country._id,
                    code: country.code,
                    name: country.name
                },
            },
            gender: data.gender,
        }
        if(user?._id ){
            Object.assign(formData, {_id: user._id})
            await dispatch(updateUser(formData, handleOk));
        }
        else {
            await dispatch(addUser(formData, handleOk));
        }
    }

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

    return(
        <Col md={12}>
            <Modal
                type={"primary"}
                title="User Form"
                visible={state.visible}
                onCancel={() => handleOk()}
                footer={footerButtons}
            >
                <Form
                    {...layout}
                    name={'userForm'}
                    form={form}
                    id={'myForm'}
                    validateMessages={validateMessages}
                    onFinish={handleSubmit}
                >
                    <Form.Item
                        name="firstName"
                        rules={[{required: true}]}
                        initialValue={user?.firstName ? user?.firstName : null}
                        label="First Name"
                    >
                        <Input  placeholder="First Name"/>
                    </Form.Item>
                    <Form.Item
                        name="lastName"
                        rules={[{required: true}]}
                        initialValue={user?.lastName ? user?.lastName : null}
                        label="Last Name"
                    >
                        <Input placeholder="Last Name"/>
                    </Form.Item>
                    <Form.Item
                        name="email"
                        initialValue={user?.email ? user?.email : null}
                        rules={[{required: true}]}
                        label="Email"
                    >
                        <Input  placeholder="Email"/>
                    </Form.Item>
                    <Form.Item
                        name="country"
                        rules={[{required: true}]}
                        label="Country Code"
                        initialValue={user?.phone.country._id? user?.phone.country._id : ""}
                        width={100}
                    >
                        <Select>
                            <Select.Option value="">Country Code</Select.Option>
                            {countries.length && countries.map((country, ci) => (
                                <Select.Option value={country._id} key={ci}>{country.code}</Select.Option>
                            ))}
                        </Select>
                    </Form.Item>
                    <Form.Item
                        name="phone"
                        initialValue={user?.phone.phone ? user?.phone.phone : null}
                        rules={[{required: true}]}
                        label="Phone"
                        width={100}
                    >
                        <Input  placeholder="Phone"/>
                    </Form.Item>
                    {
                        state.modalType !== 'update' && (
                            <>
                                <Form.Item
                                    name="gender"
                                    rules={[{required: true}]}
                                    label="Gender">
                                    <Select>
                                        <Select.Option value="">gender</Select.Option>
                                        <Select.Option value="male">male</Select.Option>
                                        <Select.Option value="female">female</Select.Option>
                                        <Select.Option value="other">other</Select.Option>
                                    </Select>
                                </Form.Item>
                            </>
                        )
                    }
                </Form>
            </Modal>
        </Col>

    )
}

export default UserForm;