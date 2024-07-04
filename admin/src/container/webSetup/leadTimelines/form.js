import React from "react";
import {useDispatch} from "react-redux";
import {Button} from "../../../components/buttons/buttons";
import {Col, Form, Input, Modal, Select} from "antd";
import {Constants} from "../../../config/constants";

const LeadTimelineForm = (
    {
        form,
        state,
        leadTimeline,
        addLeadTimeline,
        updateLeadTimeline,
        isLoading,
        handleOk
    }
) => {
    const dispatch = useDispatch()
    const layout = { labelCol: { span: 8 }, wrapperCol: { span: 16 }}
    const validateMessages = { required: '${label} is required!' };

    const handleSubmit = async (data) => {
        if (leadTimeline._id){
            Object.assign(data, {_id: leadTimeline._id});
            await dispatch(updateLeadTimeline(data, handleOk))
        } else
            await dispatch(addLeadTimeline(data, handleOk));
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
                title="Lead Timelines Form"
                visible={state.visible}
                onCancel={() => handleOk()}
                footer={footerButtons}
            >
                <Form
                    {...layout}
                    name={'leadTimelineForm'}
                    form={form}
                    id={'myForm'}
                    validateMessages={validateMessages}
                    onFinish={handleSubmit}
                >
                    <Form.Item
                        name="title"
                        rules={[{required: true}]}
                        initialValue={leadTimeline.title ? leadTimeline.title : null}
                        label="Title"
                    >
                        <Input placeholder="Title"/>
                    </Form.Item>
                    <Form.Item
                        name="description"
                        initialValue={leadTimeline.description ? leadTimeline.description : null}
                        rules={[{ required: false }]}
                        label="Description"
                    >
                        <Input.TextArea placeholder="Description"/>
                    </Form.Item>
                    <Form.Item
                        name="type"
                        rules={[{required: false}]}
                        initialValue={leadTimeline.type ? leadTimeline.type : null}
                        label="Type">
                        <Select>
                            <Select.Option value="">Type</Select.Option>
                            <Select.Option value="updated">Updated</Select.Option>
                            <Select.Option value="ongoing">Ongoing</Select.Option>
                            <Select.Option value="travelerAssigned">Traveler Assigned</Select.Option>
                            <Select.Option value="paymentReceived">Payment Received</Select.Option>
                            <Select.Option value="additionalCharge">Additional Charge</Select.Option>
                            <Select.Option value="resolved">Resolved</Select.Option>
                            <Select.Option value="cancelled">Cancelled</Select.Option>
                        </Select>
                    </Form.Item>
                    <Form.Item
                        name="status"
                        initialValue={leadTimeline.status ? leadTimeline.status : ''}
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

export default LeadTimelineForm;
