import React, {Fragment} from "react";
import {useDispatch} from "react-redux";
import {Button} from "../../../components/buttons/buttons";
import {Col, Form, Input, Modal, Select} from "antd";
import {deleteFile, uploadFile} from "../../../utility/fileUpload";
import {Constants} from "../../../config/constants";
import {Alert} from "../../../services/alertService";
import FeatherIcon from "feather-icons-react";

const CountryForm = (
    {
        form,
        state,
        setState,
        country,
        addCountry,
        updateCountry,
        isLoading,
        handleOk
    }
) => {
    const dispatch = useDispatch()
    const layout = { labelCol: { span: 8 }, wrapperCol: { span: 16 }}

    const validateMessages = {
        required: '${label} is required!',
    };

    const handleSubmit = async (data) => {
        Object.assign(data, {flag: state.photo});
        if (country._id){
            Object.assign(data, {_id: country._id});
            await dispatch(updateCountry(data, handleOk))
        } else
            await dispatch(addCountry(data, handleOk));
    };

    const upload = (file) => {
        if (form.getFieldsValue().name) {
            setState({...state, uploading: true})
            uploadFile(file, Constants.S3_WEB_SETUP_DIR(form.getFieldsValue().name))
                .then((res) => {
                    form.setFieldsValue({flag: res.key ? res.key : res.Key})
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
                title="Country Form"
                visible={state.visible}
                onCancel={() => handleOk()}
                footer={footerButtons}
            >
                <Form
                    {...layout}
                    name={'countryForm'}
                    form={form}
                    id={'myForm'}
                    validateMessages={validateMessages}
                    onFinish={handleSubmit}>
                    <Form.Item
                        name="flag"
                        label="Flag"
                        initialValue={country.flag ? country.flag : null}
                        rules={[{required: true}]}
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
                        initialValue={country.name ? country.name : null}
                        label="Name">
                        <Input placeholder="Name"/>
                    </Form.Item>
                    <Form.Item
                        name="code"
                        initialValue={country.code ? country.code : null}
                        rules={[{ required: true }]}
                        label="Code">
                        <Input placeholder="Code"/>
                    </Form.Item>
                    <Form.Item
                        name="latitude"
                        initialValue={country.latitude ? country.latitude : null}
                        label="Latitude">
                        <Input placeholder="Latitude"/>
                    </Form.Item>
                    <Form.Item
                        name="longitude"
                        initialValue={country.longitude ? country.longitude : null}
                        label="Longitude">
                        <Input placeholder="Longitude"/>
                    </Form.Item>
                    <Form.Item
                        name="currencySymbol"
                        initialValue={country.currencySymbol ? country.currencySymbol : null}
                        rules={[{ required: true }]}
                        label="Currency Symbol">
                        <Input placeholder="Currency Symbol"/>
                    </Form.Item>
                    <Form.Item
                        name="currencyFromDollar"
                        initialValue={country.currencyFromDollar ? country.currencyFromDollar : null}
                        rules={[{ required: true }]}
                        label="Currency From Dollar">
                        <Input placeholder="Currency From Dollar"/>
                    </Form.Item>
                    <Form.Item
                        name="currencyFromBDT"
                        initialValue={country.currencyFromBDT ? country.currencyFromBDT : null}
                        rules={[{ required: true }]}
                        label="Currency From BDT">
                        <Input placeholder="Currency From BDT"/>
                    </Form.Item>
                    <Form.Item
                        name="status"
                        initialValue={country.status ? country.status : ''}
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

export default CountryForm;
