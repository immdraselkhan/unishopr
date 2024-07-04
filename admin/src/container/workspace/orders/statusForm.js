import React from "react";
import {useDispatch} from "react-redux";
import {Button} from "../../../components/buttons/buttons";
import {Form, Select, Modal} from "antd";
import {Constants} from "../../../config/constants";

const RoomForm = (
    {
        form,
        state,
        order,
        updateOrder,
        isLoading,
        handleOk
    }
) => {
    const dispatch = useDispatch()
    const layout = { labelCol: { span: 8 }, wrapperCol: { span: 16 }}
    const validateMessages = { required: '${label} is required!' };

    const handleSubmit = async (data) => {
        if (order?._id){
            Object.assign(data, { _id: order._id });
            await dispatch(updateOrder(data, handleOk))
        }
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
        <Modal
            type={state.modalType}
            title="Status Form"
            visible={state.visible}
            onCancel={handleOk}
            footer={footerButtons}
            width={500}
        >
            <Form
                {...layout}
                name={'theProductStatusForm'}
                form={form}
                id={'myForm'}
                validateMessages={validateMessages}
                onFinish={handleSubmit}
                autoComplete="off"
            >
                <Form.Item
                    name="status"
                    rules={[{required: true}]}
                    initialValue={order?.status ? order.status : null}
                    label="Status"
                >
                    <Select>
                        {Constants.ORDER_STATUS && Constants.ORDER_STATUS.map((status, si) => (
                            <Select.Option key={si} value={status.value}>{status.label}</Select.Option>
                        ))}
                    </Select>
                </Form.Item>
            </Form>
        </Modal>
    )
}

export default RoomForm;
