import { Col, Form, Input, Modal, Select } from "antd";
import React, {useEffect} from "react";
import { useDispatch, useSelector } from "react-redux";
import { Button } from "../../../components/buttons/buttons";

import { fetchLeadTimelines as utilitiesLeadTimelines } from "../../../redux/utilities/actionCreator";

const LeadUpdateForm = (
    {
        form,
        state,
        setState,
        isLoading,
        addUpdate,
        updateUpdate,
        handleOk,
    }
) => {
    const dispatch = useDispatch()
    const layout = { labelCol: { span: 8 }, wrapperCol: { span: 16 } }
    const validateMessages = { required: '${label} is required!' };
    const leadTimelines = useSelector(state => state.utilities.leadTimelines);

    useEffect(() => {
        const fetchData = async () => {
            await dispatch(utilitiesLeadTimelines())
        };
        fetchData().then(r => { });
    }, []);

    const handleSubmit = async (data) => {
        if (state?.update?._id) await dispatch(updateUpdate({
            data: { ...data, _id: state.update._id },
            leadId: state?.lead?._id,
            action: () => handleOk()
        }))
        else await dispatch(addUpdate({
            data,
            leadId: state?.lead?._id,
            action: () => handleOk()
        }))
    };

    const handleChange = (id) => {
        const leadTimeline = leadTimelines.find(timeline => timeline._id === id);
        form.setFieldsValue({
            title: leadTimeline.title,
            description: leadTimeline.description,
        })
    }

    const footerButtons = [
        <Button
            form="updateForm"
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
                title="Updates"
                visible={state.visible}
                onCancel={() => handleOk()}
                footer={footerButtons}
            >
                <Form
                    {...layout}
                    name={'updateForm'}
                    form={form}
                    id={'updateForm'}
                    className="my-form"
                    validateMessages={validateMessages}
                    onFinish={handleSubmit}
                    autoComplete="off"
                >
                    <Form.Item
                        name="_id"
                        initialValue="Select Timeline"
                        rules={[{ required: false }]}
                        label="Timeline"
                    >
                        <Select
                            onChange={(id) => handleChange(id)}
                        >
                            <Select.Option value="">Select Timeline</Select.Option>
                            {leadTimelines.length && leadTimelines.map((leadTimeline) => (
                                <Select.Option key={leadTimeline._id} value={leadTimeline._id}>{leadTimeline.title}</Select.Option>
                            ))}
                        </Select>
                    </Form.Item>
                    <Form.Item
                        name="title"
                        rules={[{ required: true }]}
                        initialValue={state?.update?.title ? state.update.title : ''}
                        label="Title"
                    >
                        <Input placeholder="Title" />
                    </Form.Item>
                    <Form.Item
                        name="description"
                        rules={[{ required: true }]}
                        initialValue={state?.update?.description ? state.update.description : ''}
                        label="Description"
                    >
                        <Input.TextArea placeholder="Description" />
                    </Form.Item>
                </Form>
            </Modal>
        </Col>
    )
}

export default LeadUpdateForm;
