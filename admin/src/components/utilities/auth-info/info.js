import React, {useState} from 'react';
import {Avatar, Col, Form, Input} from 'antd';
import { Link } from 'react-router-dom';
import {useDispatch, useSelector} from 'react-redux';
import FeatherIcon from 'feather-icons-react';
import { InfoWraper, UserDropDwon } from './auth-info-style';
import { Popover } from '../../popup/popup';
import { logOut, changePassword } from '../../../redux/authentication/actionCreator';
import Heading from '../../heading/heading';
import {Auth} from "../../../services/authService";
import {Modal} from "../../modals/antd-modals";
import {Button} from "../../buttons/buttons";

const AuthInfo = ({ rtl }) => {
    const dispatch = useDispatch();
    const isLoading = useSelector(state => state.utilities.loading);
    const [state, setState] = useState({ visible: false, modalType: 'primary', colorModal: false });
    const [form] = Form.useForm();

    const userInfo = Auth.getUserInfo();

    const layout = {
        labelCol: { span: 8 },
        wrapperCol: { span: 16 },
    };

    const SignOut = e => {
        e.preventDefault();
        dispatch(logOut());
    };

    const handleSubmit = async (data) => {
        if (userInfo._id) {
            const postData = {currentPassword: data.currentPassword, password: data.password, _id: userInfo._id}
            await dispatch(changePassword(postData, handleCancel()))
        }
    };

    const showModal = async type => {
        form.resetFields();
        setState({
            visible: true,
            modalType: type,
        });
    };

    const handleCancel = () => {
        form.resetFields();
        setState({
            visible: false,
            colorModal: false,
        });
    };

    const validateMessages = {
        required: '${label} is required!',
        lenCheck: '${label} ${min} num is required!',
        types: {
            email: '${label} is not validate email!',
            number: '${label} is not a validate number!',
        },
        number: {
            length: '${label} must be ${min} number',
        },
    };

    const userContent = (
        <UserDropDwon>
            <div className="user-dropdwon">
                <figure className="user-dropdwon__info">
                    <img src={require('../../../static/img/avatar/chat-auth.png')} alt="" />
                    <figcaption>
                        <Heading as="h5">{userInfo.full_name}</Heading>
                        <p>{userInfo.email}</p>
                    </figcaption>
                </figure>
                <ul className="user-dropdwon__links">
                    <li>
                        <Link to="#" onClick={() => showModal('primary')}>
                            <FeatherIcon icon="user" /> Change Password
                        </Link>
                    </li>
                </ul>
                <Link className="user-dropdwon__bottomAction" onClick={SignOut} to="#">
                    <FeatherIcon icon="log-out" /> Sign Out
                </Link>
            </div>
        </UserDropDwon>
    );

    return (
        <InfoWraper>
            <Col md={12}>
                <Modal
                    type={state.modalType}
                    title="Password Form"
                    visible={state.visible}
                    onCancel={() => handleCancel()}
                    footer={[
                        <Button
                            form="passForm"
                            key="submit"
                            htmlType="submit"
                            type="primary"
                            disabled={isLoading}
                            size="medium">
                            {isLoading ? 'Loading...' : 'Submit'}
                        </Button>
                    ]}
                >
                    <Form
                        {...layout}
                        name="Change Password"
                        form={form}
                        id="passForm"
                        validateMessages={validateMessages}
                        onFinish={handleSubmit}>
                        <Form.Item
                            name="currentPassword"
                            rules={[{ required: true }]}
                            label="Current Password">
                            <Input.Password placeholder="Current Password"/>
                        </Form.Item>
                        <Form.Item
                            name="password"
                            rules={[{ required: true }]}
                            label="New Password">
                            <Input.Password placeholder="New Password"/>
                        </Form.Item>
                        {/*<Form.Item*/}
                        {/*    name="confirmPassword"*/}
                        {/*    rules={[{ required: true, lenCheck: 6, min: 6 }]}*/}
                        {/*    label="Confirm Password">*/}
                        {/*    <Input.Password placeholder="Confirm Password"/>*/}
                        {/*</Form.Item>*/}

                    </Form>
                </Modal>
            </Col>
            <div className="nav-author">
                <Popover placement="bottomRight" content={userContent} action="click">
                    <Link to="#" className="head-example">
                        <Avatar src="https://cdn0.iconfinder.com/data/icons/user-pictures/100/matureman1-512.png" />
                    </Link>
                </Popover>
            </div>
        </InfoWraper>
    );
};

export default AuthInfo;
