import { Col, Form, Input, Modal, Select } from "antd";
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { Button } from "../../../components/buttons/buttons";
import { refundPayment } from "../../../redux/workspace/payments/actionCreator";

const RefundForm = ({
    state,
    isLoading,
    handleOk,
    payment
}) => {
    const dispatch = useDispatch()
    const layout = { labelCol: { span: 8 }, wrapperCol: { span: 16 } }

    const [error, setError] = useState("");

    const [form] = Form.useForm()

    const validateMessages = {
        required: '${label} is required!',
    };

    const handleSubmit = async (data) => {
        if (data.amount > payment.paidAmount) {
            setError("Refunded amount is greater than paid amount")
            return
        } else {
            const payload = {
                _id: payment._id,
                transactionId: payment.transactionId,
                invoiceNo: payment.invoiceNo,
                amount: data.amount
            }
            await dispatch(refundPayment(payload))
        }
    };

    const footerButtons = [
        <Button
            form="refundForm"
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
                title="Refund Form"
                visible={state.refundModalVisible}
                onCancel={() => handleOk()}
                footer={footerButtons}
            >
                <Form
                    {...layout}
                    name={'refundForm'}
                    form={form}
                    id={'refundForm'}
                    validateMessages={validateMessages}
                    onFinish={handleSubmit}>
                    <Form.Item
                        name="amount"
                        rules={[{ required: true }]}
                        // initialValue={payment?.paidAmount ? payment?.paidAmount : null}
                        initialValue=""
                        label="Refund Amount">
                        <Input placeholder="Amount" />
                    </Form.Item>
                    {error && <span className="color-danger">* {error}</span>}
                </Form>
            </Modal>
        </Col>
    )
}

export default RefundForm;
