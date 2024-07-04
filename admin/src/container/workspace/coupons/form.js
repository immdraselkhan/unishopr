import React, { useState, useEffect, Fragment } from "react";
import { useDispatch } from "react-redux";
import FeatherIcon from "feather-icons-react";
import { Button } from "../../../components/buttons/buttons";
import { Row, Col, Form, Input, Modal, Select } from "antd";
import { Constants } from "../../../config/constants";
import { deleteFile, uploadFile } from "../../../utility/fileUpload";
import { Alert } from "../../../services/alertService";
import { shortDateWithTime } from "../../../utility/dataTime";
import { phoneFormatted } from "../../../utility/utility";

const CouponForm = (
    {
        form,
        state,
        setState,
        coupon,
        addCoupon,
        updateCoupon,
        isLoading,
        handleOk,
        countries,
        // subscriptions
        users,
        fetchUsers
    }
) => {
    const dispatch = useDispatch()
    const layout = { labelCol: { span: 8 }, wrapperCol: { span: 16 } }
    const validateMessages = { required: '${label} is required!', };

    const handleSubmit = async (data) => {
        const formData = {
            userId: data.user,
            name: data.name,
            code: data.code,
            thumbnail: data.thumbnail,
            description: data.description,
            maxUsage: data.maxUsage,
            maxAmount: data.maxAmount,
            type: data.type,
            status: data.status,
            country: data.country,
            // subscription: data.subscription,
            discount: {
                type: data.discountType,
                value: data.discountValue,
                from: data.discountFrom,
                to: data.discountTo
            }
        }
        if (coupon._id) {
            Object.assign(formData, { _id: coupon._id });
            await dispatch(updateCoupon(formData, handleOk))
            setState({ ...state, thumbnail: null })
        } else {
            await dispatch(addCoupon(formData, handleOk))
            setState({ ...state, thumbnail: null })
        }
    };

    const upload = (file) => {
        if (form.getFieldsValue().name) {
            setState({ ...state, uploading: true })
            uploadFile(file, Constants.S3_COUPONS_THUMBNAIL_DIR(form.getFieldsValue().name))
                .then((res) => {
                    form.setFieldsValue({ thumbnail: res.key ? res.key : res.Key })
                    setState({ ...state, thumbnail: res.key ? res.key : res.Key, uploading: false })
                })
        } else Alert.info({ title: 'Please input a name first!' })
    }

    const fileDelete = (key) => {
        deleteFile(key, cb => {
            setState({ ...state, thumbnail: null })
        })
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

    return (
        <Col md={12}>
            <Modal
                type={state.modalType}
                title="Coupons Form"
                visible={state.visible}
                onCancel={() => handleOk()}
                footer={footerButtons}
                width={500}
            >
                <Form
                    {...layout}
                    name={'couponForm'}
                    form={form}
                    id={'myForm'}
                    validateMessages={validateMessages}
                    onFinish={handleSubmit}
                >
                    <Form.Item
                        name="thumbnail"
                        label="Thumbnail"
                        initialValue={coupon.thumbnail ? coupon.thumbnail : null}
                        rules={[{ required: false }]}
                    >
                        {state.thumbnail ? (
                            <Fragment>
                                <div>
                                    <img
                                        className="border-radius-3"
                                        height={80}
                                        src={Constants.S3_BASE_URL(state.thumbnail)}
                                        alt=""
                                    />
                                </div>
                                <div className="minimum-mt">
                                    <Button
                                        size="extra-small"
                                        type="danger"
                                        onClick={() => fileDelete(state.thumbnail)}
                                    >
                                        <FeatherIcon icon="trash-2" size={14} />
                                    </Button>
                                </div>
                            </Fragment>
                        ) : (
                            <Fragment>
                                <label
                                    className={state.thumbnail ? "hidden" : "ant-btn sc-fMiknA kzFbZB btn-outlined ant-btn-light ant-btn-lg"}
                                    htmlFor="thumbnailUpload"
                                >
                                    <FeatherIcon icon="upload" />
                                    <span
                                        aria-disabled={state.uploading}
                                        style={{ verticalAlign: 'super' }}
                                    >
                                        {state.uploading ? 'Uploading...' : 'Upload'}
                                    </span>
                                </label>
                                <input
                                    type="file"
                                    id="thumbnailUpload"
                                    className="hidden"
                                    onClick={event => event.target.value = null}
                                    onChange={(event) => upload(event.target.files[0])}
                                />
                            </Fragment>
                        )}
                    </Form.Item>
                    <Form.Item
                        name="user"
                        initialValue={coupon?.user?._id ? coupon.user._id : null}
                        rules={[{ required: false }]}
                        label="User"
                    >
                        <Select
                            allowClear
                            showSearch
                            // mode="multiple"
                            loading={isLoading}
                            filterOption={(input, option) => option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0}
                            filterSort={(optionA, optionB) => optionA.children.toLowerCase().localeCompare(optionB.children.toLowerCase())}
                            onSearch={(event) => event?.length && event.length > 3 ? dispatch(fetchUsers({ search: phoneFormatted(event) })) : null}
                        >
                            {users.length && users.map((user, key) => (
                                <Select.Option value={user._id} key={key}>{`${user.firstName} ${user.lastName} - 0${user.phone.phone} - ${user.email}`}</Select.Option>
                            ))}
                        </Select>
                    </Form.Item>
                    <Form.Item
                        name="name"
                        rules={[{ required: true }]}
                        initialValue={coupon.name ? coupon.name : null}
                        label="Name"
                    >
                        <Input placeholder="Name" />
                    </Form.Item>
                    <Form.Item
                        name="code"
                        rules={[{ required: true }]}
                        initialValue={coupon.code ? coupon.code : null}
                        label="Code"
                    >
                        <Input placeholder="Code" />
                    </Form.Item>
                    <Form.Item
                        name="country"
                        initialValue={coupon?.country?._id ? coupon.country._id : ''}
                        rules={[{ required: true }]}
                        label="Country">
                        <Select>
                            <Select.Option value="">Country</Select.Option>
                            {countries.length && countries.map((country) => (
                                <Select.Option value={country._id}>{country.name}</Select.Option>
                            ))}
                        </Select>
                    </Form.Item>
                    {/* <Form.Item
                        name="subscription"
                        initialValue={coupon?.subscription?._id ? coupon.subscription._id : ''}
                        rules={[{ required: true }]}
                        label="Subscription">
                        <Select>
                            <Select.Option value="">Subscription</Select.Option>
                            {subscriptions.length && subscriptions.map((subscription) => (
                                <Select.Option value={subscription._id}>{subscription.name}</Select.Option>
                            ))}
                        </Select>
                    </Form.Item> */}
                    <Form.Item
                        name="discountType"
                        initialValue={coupon?.discount?.type ? coupon.discount.type : ''}
                        rules={[{ required: true }]}
                        label="Discount Type">
                        <Select>
                            <Select.Option value="">Status</Select.Option>
                            <Select.Option value="flat">Flat</Select.Option>
                            <Select.Option value="percentage">Percentage</Select.Option>
                        </Select>
                    </Form.Item>
                    <Form.Item
                        name="discountValue"
                        rules={[{ required: true }]}
                        initialValue={coupon?.discount?.value ? coupon.discount.value : null}
                        label="Discount Value"
                    >
                        <Input type={"number"} placeholder="Discount Value" />
                    </Form.Item>
                    <Form.Item
                        name="maxUsage"
                        rules={[{ required: true }]}
                        initialValue={coupon.maxUsage ? coupon.maxUsage : null}
                        label="Max Usage"
                    >
                        <Input type={"number"} placeholder="Max Usage" />
                    </Form.Item>
                    <Form.Item
                        name="maxAmount"
                        rules={[{ required: true }]}
                        initialValue={coupon.maxAmount ? coupon.maxAmount : null}
                        label="Max Amount"
                    >
                        <Input type={"number"} placeholder="Max Amount" />
                    </Form.Item>
                    <Form.Item
                        name="discountFrom"
                        rules={[{ required: true }]}
                        initialValue={coupon?.discount?.from ? coupon?.discount?.from.slice(0, 19) : null}
                        label="From Date"
                    >
                        <Input type={"datetime-local"}
                            placeholder="From Date" />
                    </Form.Item>
                    <Form.Item
                        name="discountTo"
                        rules={[{ required: true }]}
                        initialValue={coupon?.discount?.to ? coupon?.discount?.to.slice(0, 19) : null}
                        label="To Date"
                    >
                        <Input type={"datetime-local"} placeholder="To Date" />
                    </Form.Item>
                    <Form.Item
                        name="description"
                        rules={[{ required: true }]}
                        initialValue={coupon.description ? coupon.description : null}
                        label="Description"
                    >
                        <Input.TextArea placeholder="Description" />
                    </Form.Item>
                    <Form.Item
                        name="status"
                        initialValue={coupon.status ? coupon.status : ''}
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

export default CouponForm;
