import React, {useState, useEffect, Fragment} from "react";
import {useDispatch} from "react-redux";
import FeatherIcon from "feather-icons-react";
import {Button} from "../../../components/buttons/buttons";
import {Row, Col, Form, Input, Modal, Select} from "antd";
import {Constants} from "../../../config/constants";
import {deleteFile, uploadFile} from "../../../utility/fileUpload";
import {Alert} from "../../../services/alertService";

const BrandForm = (
    {
        form,
        state,
        setState,
        brand,
        addBrand,
        updateBrand,
        isLoading,
        handleOk
    }
) => {
    const dispatch = useDispatch()
    const layout = { labelCol: { span: 8 }, wrapperCol: { span: 16 }}
    const validateMessages = { required: '${label} is required!', };

    const handleSubmit = async (data) => {
        Object.assign(data, {photo: state.photo});
        if (brand._id){
            Object.assign(data, {_id: brand._id});
            await dispatch(updateBrand(data, handleOk))
            setState({...state, photo: null})
        } else {
            await dispatch(addBrand(data, handleOk))
            setState({...state, photo: null})
        }
    };

    const upload = (file) => {
        if (form.getFieldsValue().name) {
            setState({...state, uploading: true})
            uploadFile(file, Constants.S3_WEB_SETUP_DIR(form.getFieldsValue().name))
                .then((res) => {
                    form.setFieldsValue({photo: res.key ? res.key : res.Key})
                    setState({...state, photo: res.key ? res.key : res.Key, uploading: false})
                })
        } else Alert.info({title: 'Please input a name first!'})
    }

    const fileDelete = (key) => {
        deleteFile(key, cb => {
            setState({...state, photo: null})
        })
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
                title="Brands Form"
                visible={state.visible}
                onCancel={() => handleOk()}
                footer={footerButtons}
            >
                <Form
                    {...layout}
                    name={'brandForm'}
                    form={form}
                    id={'myForm'}
                    validateMessages={validateMessages}
                    onFinish={handleSubmit}
                >
                    <Form.Item
                        name="photo"
                        label="Photo (400X400)"
                        initialValue={brand.photo ? brand.photo : null}
                        rules={[{required: false}]}
                    >
                        {state.photo ? (
                            <Fragment>
                                <div>
                                    <img
                                        className="border-radius-3"
                                        height={80}
                                        src={Constants.S3_BASE_URL(state.photo)}
                                        alt=""
                                    />
                                </div>
                                <div className="minimum-mt">
                                    <Button
                                        size="extra-small"
                                        type="danger"
                                        onClick={() => fileDelete(state.photo)}
                                    >
                                        <FeatherIcon icon="trash-2" size={14} />
                                    </Button>
                                </div>
                            </Fragment>
                        ) : (
                            <Fragment>
                                <label
                                    className={state.photo ? "hidden" : "ant-btn sc-fMiknA kzFbZB btn-outlined ant-btn-light ant-btn-lg"}
                                    htmlFor="photoUpload"
                                >
                                    <FeatherIcon icon="upload" />
                                    <span
                                        aria-disabled={state.uploading}
                                        style={{verticalAlign: 'super'}}
                                    >
                                        {state.uploading ? 'Uploading...' : 'Upload'}
                                    </span>
                                </label>
                                <input
                                    type="file"
                                    id="photoUpload"
                                    className="hidden"
                                    onClick={event => event.target.value = null}
                                    onChange={(event) => upload(event.target.files[0])}
                                />
                            </Fragment>
                        )}
                    </Form.Item>
                    <Form.Item
                        name="name"
                        rules={[{required: true}]}
                        initialValue={brand.name ? brand.name : null}
                        label="Name">
                        <Input placeholder="name"/>
                    </Form.Item>
                    <Form.Item
                        name="url"
                        rules={[{required: true}]}
                        initialValue={brand.url ? brand.url : null}
                        label="URL">
                        <Input placeholder="URL"/>
                    </Form.Item>
                    <Form.Item
                        name="description"
                        initialValue={brand.description ? brand.description : null}
                        rules={[{ required: true }]}
                        label="Description">
                        <Input.TextArea placeholder="Description"/>
                    </Form.Item>
                    <Form.Item
                        name="status"
                        initialValue={brand.status ? brand.status : ''}
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

export default BrandForm;
