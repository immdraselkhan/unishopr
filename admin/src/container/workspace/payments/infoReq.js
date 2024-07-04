import React from "react";
import { Button } from "../../../components/buttons/buttons";
import { Col, Modal, Descriptions } from "antd";
import { shortDateWithTime } from "../../../utility/dataTime";
import { Constants } from "../../../config/constants";
import RefundForm from "./refund";

const InfoReq = (props) => {
    const {
        isLoading,
        state,
        setState,
        handleOk,
        payment,
    } = props;


    const showRefundModal = async () => {
        await setState({
            ...state,
            refundModalVisible: true,
            // payment: key,
        });
    }

    // console.log(payment);
    const footerButtons = [
        <Button
            form="myForm"
            key="refund"
            htmlType="refund"
            type="info"
            disabled={isLoading || payment?.status !== "completed" || payment?.gateway !== "sslcommerz"}
            size="medium"
            onClick={() => showRefundModal()}
        >
            {isLoading ? 'Loading...' : 'Refund'}
        </Button>,
        <Button
            form="myForm"
            key="submit"
            htmlType="submit"
            type="primary"
            disabled={isLoading}
            size="medium"
        >
            {isLoading ? 'Loading...' : 'Print'}
        </Button>
    ];

    return (
        <Col md={12}>
            <Modal
                type={state.modalType}
                title={"Payment Info"}
                visible={state.reqModalVisible}
                onCancel={() => handleOk()}
                footer={footerButtons}
                width={1200}
            >
                <div>
                    <Descriptions
                        bordered
                        column={{
                            xxl: 4,
                            xl: 3,
                            lg: 3,
                            md: 3,
                            sm: 2,
                            xs: 1,
                        }}
                    >
                        <Descriptions.Item label="User">
                            {`${payment?.user?.firstName} ${payment?.user?.lastName}`}<br />
                            {`${payment?.user?._id?.phone?.country?.code}${payment?.user?._id?.phone?.phone}`}<br />
                            {`${payment?.user?._id?.email}`}
                        </Descriptions.Item>
                        <Descriptions.Item label="Invoice No">{payment?.invoiceNo ? payment?.invoiceNo : "N/A"}</Descriptions.Item>
                        <Descriptions.Item label="Transaction Id"> {payment?.transactionId ? payment?.transactionId : "N/A"}</Descriptions.Item>
                        <Descriptions.Item label="Amount">{payment?.amount || payment?.amount == 0 ? payment?.amount : "N/A"}</Descriptions.Item>
                        <Descriptions.Item label="Paid Amount">{payment?.paidAmount || payment?.paidAmount == 0 ? payment?.paidAmount : "N/A"}</Descriptions.Item>
                        <Descriptions.Item label="Deducted Amount">{payment?.deductedAmount || payment?.deductedAmount == 0 ? payment?.deductedAmount : "N/A"}</Descriptions.Item>
                        <Descriptions.Item label="Screenshot">
                            {payment?.screenshot ? <a href={Constants.S3_BASE_URL(payment?.screenshot)} target="_blank">{Constants.S3_BASE_URL(payment?.screenshot)}</a> : "N/A"}
                        </Descriptions.Item>
                        <Descriptions.Item label="Platform">{payment?.platform ? payment?.platform : "N/A"}</Descriptions.Item>
                        <Descriptions.Item label="Coupon">{payment?.couponId ? payment?.couponId : "N/A"}</Descriptions.Item>
                        <Descriptions.Item label="Gateway">{payment?.gateway ? payment?.gateway : "N/A"}</Descriptions.Item>
                        <Descriptions.Item label="Created At">{shortDateWithTime(payment?.createdAt)}</Descriptions.Item>
                        <Descriptions.Item label="Status">{payment?.status ? payment?.status : "N/A"}</Descriptions.Item>
                        <Descriptions.Item label="Products">{payment?.products?.map((product, pi) => (
                            <div key={pi}>{pi % 2 === 0 ? `${product?.name}` : `, ${product?.name}`}</div>
                        ))}</Descriptions.Item>
                    </Descriptions>
                </div>
            </Modal>
            <RefundForm
                state={state}
                // setState={setState}
                isLoading={isLoading}
                // form={form}
                handleOk={handleOk}
                payment={state.payment}
            />
        </Col>
    )
}

export default InfoReq;