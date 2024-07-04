import { Col, Form, Input, Modal } from "antd";
import React from "react";
import { useDispatch } from "react-redux";
import { Button } from "../../../components/buttons/buttons";

const CancelForm = (
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

export default CancelForm;
