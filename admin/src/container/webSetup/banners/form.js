import {Col, Form, Input, Modal, Row, Select} from "antd";
import React, {useEffect, useState} from "react";
import { useDispatch } from "react-redux";
import { Button } from "../../../components/buttons/buttons";
import FeatherIcon from "feather-icons-react";
import {Constants} from "../../../config/constants";
import {deleteFile, uploadFile} from "../../../utility/fileUpload";
import {Alert} from "../../../services/alertService";

const BannerForm = (
    {
        form,
        state,
        banner,
        addBanner,
        updateBanner,
        isLoading,
        handleOk
    }
) => {
    const dispatch = useDispatch()
    const layout = { labelCol: { span: 8 }, wrapperCol: { span: 16 }}
    const [photo, setPhoto] = useState(null);
    const [uploading, setUploading] = useState(false);

    useEffect(() => {
        if (banner && banner._id) {
            setPhoto(banner.photo)
        }
    }, [banner])

    const validateMessages = {
        required: '${label} is required!',
    };

    const handleSubmit = async (data) => {
        Object.assign(data, {photo: photo});
        if (banner._id){
            Object.assign(data, {_id: banner._id});
            await dispatch(updateBanner(data, handleOk))
            setPhoto(null)
        } else {
            await dispatch(addBanner(data, handleOk));
            setPhoto(null)
        }
    };

    const upload = (file) => {
        if (form.getFieldsValue().name) {
            setUploading(true);
            uploadFile(file, Constants.S3_BANNERS_DIR(form.getFieldsValue().name))
                .then((res) => {
                    setPhoto(res.key ? res.key : res.Key)
                    setUploading(false);
                })
        } else Alert.info({title: 'Please input a banner name first!'})
    }

    const fileDelete = (key) => {
        deleteFile(key, cb => {
            setPhoto(null)
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
                title="Banner Form"
                visible={state.visible}
                onCancel={() => {
                    setPhoto(null)
                    handleOk()
                }}
                footer={footerButtons}
            >
                <Form
                    {...layout}
                    name={'bannerForm'}
                    form={form}
                    id={'myForm'}
                    validateMessages={validateMessages}
                    onFinish={handleSubmit}>
                    <Row>
                        <Col md={8}>
                            <Form.Item
                                name="photo"
                                label="Photo"
                            >
                                <div>
                                    <label
                                        className={photo ? "hidden" : "ant-btn sc-fMiknA kzFbZB btn-outlined ant-btn-light ant-btn-lg"}
                                        htmlFor="photoUpload"
                                    >
                                        <FeatherIcon icon="upload" />
                                        <span
                                            aria-disabled={uploading}
                                            style={{verticalAlign: 'super'}}
                                        >
                                            {uploading ? 'Uploading...' : 'Upload'}
                                        </span>
                                    </label>
                                    <input
                                        type="file"
                                        id="photoUpload"
                                        className="hidden"
                                        onClick={event => event.target.value = null}
                                        onChange={(event) => upload(event.target.files[0])}
                                    />
                                </div>
                            </Form.Item>
                        </Col>
                        {photo ? (
                            <Col md={4}>
                                <div>
                                    <img
                                        height={80}
                                        src={Constants.S3_BASE_URL(photo)}
                                        alt=""
                                    />
                                </div>
                                <div>
                                    <Button
                                        size="extra-small"
                                        type="danger"
                                        onClick={() => fileDelete(photo)}
                                    >
                                        <FeatherIcon icon="trash-2" size={14} />
                                    </Button>
                                </div>
                            </Col>
                        ) : null}
                    </Row>
                    <Form.Item
                        name="name"
                        rules={[{required: true}]}
                        initialValue={banner.name ? banner.name : null}
                        label="Name">
                        <Input placeholder="name"/>
                    </Form.Item>
                    <Form.Item
                        name="url"
                        rules={[{required: true}]}
                        initialValue={banner.url ? banner.url : null}
                        label="URL">
                        <Input placeholder="URL"/>
                    </Form.Item>
                    <Form.Item
                        name="position"
                        rules={[{required: true}]}
                        initialValue={banner.position ? banner.position : null}
                        label="Position">
                        <Select>
                            <Select.Option value="">Position</Select.Option>
                            <Select.Option value="landingStaticOne">Landing Static One</Select.Option>
                            <Select.Option value="landingStaticTwo">Landing Static Two</Select.Option>
                            <Select.Option value="landingApp">Landing App</Select.Option>
                            <Select.Option value="landingTraveler">Landing Traveler</Select.Option>
                            <Select.Option value="landingSlider">Landing Slider</Select.Option>
                        </Select>
                    </Form.Item>
                    <Form.Item
                        name="description"
                        initialValue={banner.description ? banner.description : null}
                        rules={[{ required: true }]}
                        label="Description">
                        <Input.TextArea placeholder="Description"/>
                    </Form.Item>
                    <Form.Item
                        name="status"
                        initialValue={banner.status ? banner.status : ''}
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

export default BannerForm;
