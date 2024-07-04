import {Col, Form, Input, InputNumber, Modal, Row, Radio} from "antd";
import React, {useEffect, useState} from "react";
import {useDispatch} from "react-redux";
import { Button } from "../../../components/buttons/buttons";

const ProductAttributeForm = (
    {
        form,
        state,
        isLoading,
        addAttribute,
        updateAttribute,
        handleOk
    }
) => {
    const dispatch = useDispatch()
    const layout = { labelCol: { span: 8 }, wrapperCol: { span: 16 }}
    const validateMessages = { required: '${label} is required!' };

    const handleSubmit = async (data) => {
        if (state?.attribute?._id) await dispatch(updateAttribute({
            data: {...data, _id: state.attribute._id},
            productId: state?.product?._id,
            action: () => handleOk()
        }))
        else await dispatch(addAttribute({
            data,
            productId: state?.product?._id,
            action: () => handleOk()
        }))
    };

    const footerButtons = [
        <Button
            form="attributeForm"
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
                title="Attributes"
                visible={state.visible}
                onCancel={handleOk}
                footer={footerButtons}
                width={1000}
            >
                <Form
                    {...layout}
                    name={'attributeForm'}
                    form={form}
                    id={'attributeForm'}
                    className="my-form"
                    validateMessages={validateMessages}
                    onFinish={handleSubmit}
                    autoComplete="off"
                >
                    <Row>
                        <Col md={8}>
                            <Form.Item
                                name="isRequired"
                                rules={[{ required: true }]}
                                initialValue={!!state?.attribute?.isRequired}
                                label="Is Required?"
                            >
                                <Radio.Group>
                                    <Radio.Button value={true}>Yes</Radio.Button>
                                    <Radio.Button value={false}>No</Radio.Button>
                                </Radio.Group>
                            </Form.Item>
                        </Col>
                        <Col md={8}>
                            <Form.Item
                                name="title"
                                rules={[{required: true}]}
                                initialValue={state?.attribute?.title ? state.attribute.title : ''}
                                label="Title"
                            >
                                <Input placeholder="Title"/>
                            </Form.Item>
                        </Col>
                        <Col md={8}>
                            <Form.Item
                                name="position"
                                rules={[{required: true}]}
                                initialValue={state?.attribute?.position ? state.attribute.position : ''}
                                label="Position"
                            >
                                <InputNumber placeholder="Position" style={{ width: '100%' }} />
                            </Form.Item>
                        </Col>
                        <Col md={8}>
                            <Form.Item
                                name="isMultiple"
                                rules={[{ required: true }]}
                                initialValue={!!state?.attribute?.isMultiple}
                                label="Is Multiple?"
                            >
                                <Radio.Group>
                                    <Radio.Button value={true}>Yes</Radio.Button>
                                    <Radio.Button value={false}>No</Radio.Button>
                                </Radio.Group>
                            </Form.Item>
                        </Col>
                        <Col md={8}>
                            <Form.Item
                                name="maxSelection"
                                rules={[{required: false}]}
                                initialValue={state?.attribute?.maxSelection ? state.attribute.maxSelection : ''}
                                label="Max Selection"
                            >
                                <InputNumber placeholder="Max Selection" style={{ width: '100%' }} />
                            </Form.Item>
                        </Col>
                    </Row>
                    <Form.List name="options" initialValue={state?.attribute?.options ? state.attribute.options : []}>
                        {(fields, { add, remove }) => (
                            <>
                                {fields.map(({ key, name, ...restField }) => (
                                    <Row key={key}>
                                        <Col md={7}>
                                            <Form.Item
                                                {...restField}
                                                wrapperCol={{span: 24}}
                                                name={[name, 'position']}
                                                className="minimum-mr"
                                                rules={[{ required: true, message: 'Position is required' }]}
                                            >
                                                <InputNumber placeholder="Position" style={{ width: '100%' }} />
                                            </Form.Item>
                                        </Col>
                                        <Col md={7}>
                                            <Form.Item
                                                {...restField}
                                                name={[name, 'title']}
                                                wrapperCol={{span: 24}}
                                                className="minimum-mr"
                                                rules={[{ required: true, message: 'Option Title is required' }]}
                                            >
                                                <Input placeholder="Option Title" />
                                            </Form.Item>
                                        </Col>
                                        <Col md={7}>
                                            <Form.Item
                                                {...restField}
                                                name={[name, 'price']}
                                                wrapperCol={{span: 24}}
                                                className="minimum-mr"
                                                rules={[{ required: true, message: 'Price is required' }]}
                                            >
                                                <InputNumber placeholder="Price Addition" style={{ width: '100%' }} />
                                            </Form.Item>
                                        </Col>
                                        <Col md={3} className="text-right">
                                            <Button
                                                type="danger"
                                                onClick={() => remove(name)}
                                                htmlType="button"
                                                style={{marginTop: '8px', width: '100%'}}
                                            >
                                                Remove
                                            </Button>
                                        </Col>
                                    </Row>
                                ))}
                                <div className="text-right pt-5">
                                    <Button type="primary" onClick={() => add()}>
                                        Add Attribute
                                    </Button>
                                </div>
                            </>
                        )}
                    </Form.List>
                </Form>
            </Modal>
        </Col>
    )
}

export default ProductAttributeForm;
