import React, { useEffect, useState, useRef, Fragment } from "react";
import { Button } from "../../../components/buttons/buttons";
import { Cards } from "../../../components/cards/frame/cards-frame";
import { Modal, Row, Col, Table, Button as AntButton, Avatar, Select, Form } from "antd";
import { InvoiceHeader, InvoiceLetterBox, ProductTable, OrderSummary } from "../../styled";
import { useDispatch, useSelector } from "react-redux";
import { useReactToPrint } from 'react-to-print';
import Heading from "../../../components/heading/heading";
import { fetchPaymentInvoice } from "../../../redux/workspace/payments/actionCreator";
import { shortDateWithTime } from "../../../utility/dataTime";

const Invoice = (
    {
        state,
        setState,
        isLoading,
        handleOk,
        invoiceId,
    }
) => {
    const dispatch = useDispatch();

    const invoiceData = useSelector(state => state.workspacePayments.paymentInvoice)[0];

    useEffect(() => {
        const fetchData = async () => {
            await dispatch(fetchPaymentInvoice({invoiceId}))
        };
        fetchData().then(r => { });
    }, [invoiceId]);

    const componentRef = useRef();
    const handlePrint = useReactToPrint({
        content: () => componentRef.current,
    });

    const columns = [
        {
            title: 'Order Id',
            dataIndex: 'orderId',
            key: 'orderId',
        },
        {
            title: 'Product',
            dataIndex: 'products',
            key: 'products',
            render: (key) => key.map((item, i) => <div key={i}>{i !== 0 ? `, ${item?.name}` : `${item?.name}`}</div>)
        },
        {
            title: 'Quantity',
            dataIndex: 'products',
            key: 'products',
            render: (key) => key.map((item, i) => <div key={i}>{i !== 0 ? `, ${item?.quantity}` : `${item?.quantity}`}</div>)
        },
        {
            title: 'Weight',
            dataIndex: 'products',
            key: 'products',
            render: (key) => key.map((item, i) => <div key={i}>{i !== 0 ? `, ${item?.leadId?.weight}` : `${item.leadId.weight}`}</div>)
        },
        {
            title: 'Foreign Price',
            dataIndex: 'products',
            key: 'products',
            render: (key) => key.map((item, i) => <div key={i}>{i !== 0 ? `, ${item.leadId.foreignCurrency} ${item.leadId.foreignPrice}` : `${item.leadId.foreignCurrency} ${item.leadId.foreignPrice}`}</div>)
        },
        {
            title: 'Price',
            dataIndex: 'products',
            key: 'products',
            render: (key) => key.map((item, i) => <div key={i}>{i !== 0 ? `, ${item.leadId.currency} ${item.leadId.checkout.totalAmount}` : `${item.leadId.currency} ${item.leadId.checkout.totalAmount}`}</div>)
        },
    ];

    const handleCancel = async () => {
        await handleOk();
    }

    const footerButtons = [
        <Button
            form="myForm"
            key="print-button"
            htmlType="button"
            type="primary"
            disabled={isLoading}
            size="medium"
            onClick={handlePrint}
        >
            {isLoading ? 'Loading...' : 'Print'}
        </Button>
    ];

    return (
        <Modal
            type={state.modalType}
            title="Invoice"
            visible={state.invoiceModalVisible}
            onCancel={handleCancel}
            footer={footerButtons}
            width={1000}
        >
            <div ref={componentRef}>
                <Cards headless>
                    <InvoiceHeader>
                        <Row>
                            <Col sm={12} xs={24}>
                                <figure>
                                    <img className="top-img" src={require('../../../static/img/unishopr-logo.png')} alt="logo" />
                                </figure>
                            </Col>
                            <Col sm={12} xs={24}>
                                <div>
                                    <address className="invoice-info">
                                        Unishopr <br />
                                        Road 1, Block A, House 42, Floor 7, Niketon, Dhaka 1212 <br />
                                        Bangladesh
                                    </address>
                                </div>
                            </Col>
                        </Row>
                    </InvoiceHeader>
                    <InvoiceLetterBox>
                        <div className="invoice-letter-inner">
                            <Row align="middle">
                                <Col lg={12} xs={24}>
                                    <article className="invoice-author">
                                        <Heading className="invoice-author__title" as="h3">
                                            Invoice
                                        </Heading>
                                        <p>Invoice Id: <b>{invoiceData?.invoiceId}</b></p>
                                        {invoiceData?.invoiceNo ? (<p>Invoice No: <b>{invoiceData?.invoiceNo}</b></p>) : null}
                                        {invoiceData?.transactionId ? (<p>Transaction Id: <b>{invoiceData?.transactionId}</b></p>) : null}
                                        {invoiceData?.gateway ? (<p>Gateway: <b>{invoiceData?.gateway}</b></p>) : null}
                                        {invoiceData?.couponId ? (<p>Coupon Code: <b>{invoiceData?.couponId?.code}</b></p>) : null}
                                        {invoiceData?.createdAt ? (<p>Payment Date: <b>{shortDateWithTime(invoiceData?.createdAt)}</b></p>) : null}
                                    </article>
                                </Col>
                                <Col lg={12} xs={24}>
                                    <address className="invoice-customer">
                                        <Heading className="invoice-customer__title" as="h5">
                                            Invoice To:
                                        </Heading>
                                        <p>
                                            {`${invoiceData?.user?._id?.address.length && invoiceData?.user?._id?.address[0].firstName ? invoiceData?.user?._id?.address[0].firstName + " " + invoiceData?.user?._id?.address[0].lastName
                                                : invoiceData?.user?.firstName + " " + invoiceData?.user?.lastName}`}
                                            <br />
                                            {`${invoiceData?.user?._id?.phone?.country?.code + invoiceData?.user?._id?.phone?.phone} `} <br />
                                            {invoiceData?.user?._id?.email} <br />
                                            {invoiceData?.user?._id?.address?.length ? invoiceData?.user?._id?.address[0].addressLine1 : ""}
                                        </p>
                                    </address>
                                </Col>
                            </Row>
                        </div>
                    </InvoiceLetterBox>

                    <br />
                    <br />
                    <ProductTable>
                        <div className="table-invoice table-responsive">
                            <Table
                                rowKey="_id"
                                bordered={false}
                                loading={isLoading}
                                dataSource={invoiceData?.order}
                                columns={columns}
                                pagination={false}
                            />
                        </div>
                    </ProductTable>

                    <br /><br />

                    <Row justify="end">
                        <Col md={7}>
                            <OrderSummary>
                                <div className="invoice-summary-inner" style={{ padding: '8px 6px' }}>
                                    {invoiceData?.gateway == "sslcommerz" && <>
                                        <Heading className="summary-total" as="h5">
                                            <span className="summary-total-label">Sub Total: </span>
                                            <span className="summary-total-amount">{invoiceData?.currency}&nbsp;{invoiceData?.price}</span>
                                        </Heading>
                                        <Heading className="summary-total" as="h5">
                                            <span className="summary-total-label">SSL Charge: </span>
                                            <span className="summary-total-amount">{invoiceData?.currency}&nbsp;{parseFloat(invoiceData?.amount - invoiceData?.price).toFixed(3)}</span>
                                        </Heading>
                                        <br />
                                        <Heading className="summary-total" as="h5">
                                            <span className="summary-total-label">Total: </span>
                                            <span className="summary-total-amount">{invoiceData?.currency}&nbsp;{invoiceData?.amount}</span>
                                        </Heading>
                                    </>}
                                    {invoiceData?.gateway == "banking" && <>
                                        <Heading className="summary-total" as="h5">
                                            <span className="summary-total-label">Total: </span>
                                            <span className="summary-total-amount">{invoiceData?.currency}&nbsp;{invoiceData?.amount}</span>
                                        </Heading>
                                    </>}
                                    {invoiceData?.gateway == "bKash" && <>
                                        <Heading className="summary-total" as="h5">
                                            <span className="summary-total-label">Sub Total: </span>
                                            <span className="summary-total-amount">{invoiceData?.currency}&nbsp;{invoiceData?.price}</span>
                                        </Heading>
                                        <Heading className="summary-total" as="h5">
                                            <span className="summary-total-label">Bkash Charge: </span>
                                            <span className="summary-total-amount">{invoiceData?.currency}&nbsp;{parseFloat(invoiceData?.amount - invoiceData?.price).toFixed(3)}</span>
                                        </Heading>
                                        <br />
                                        <Heading className="summary-total" as="h5">
                                            <span className="summary-total-label">Total: </span>
                                            <span className="summary-total-amount">{invoiceData?.currency}&nbsp;{invoiceData?.amount}</span>
                                        </Heading>
                                    </>}
                                </div>
                            </OrderSummary>
                        </Col>
                    </Row>
                </Cards>
            </div>
        </Modal >
    )
}

export default Invoice;