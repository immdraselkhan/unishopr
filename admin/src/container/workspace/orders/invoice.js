import React, { Fragment, useEffect, useState } from "react";
import { Button } from "../../../components/buttons/buttons";
import { Cards } from "../../../components/cards/frame/cards-frame";
import { Modal, Row, Col, Table, Avatar, Button as AntButton } from "antd";
import { InvoiceHeader, InvoiceLetterBox, InvoiceAction, ProductTable, OrderSummary } from "../../styled";
import Heading from "../../../components/heading/heading";
import { shortDateWithTime } from "../../../utility/dataTime"
import { Constants } from "../../../config/constants";
import { Scope } from "../../../services/scopeService";
import FontAwesome from "react-fontawesome";
import FeatherIcon from 'feather-icons-react';

const Invoice = (
    {
        state,
        order,
        isLoading,
        handleOk
    }
) => {
    const [total, seTotal] = useState({ subTotal: 0, grandTotal: 0 });

    useEffect(() => {
        if (order?.products?.length) {
            let total = 0;
            order.products.forEach((data) => total += data.price * data.quantity)
            seTotal({ subTotal: total, grandTotal: total })
        }
    }, [order])

    const columns = [
        {
            title: 'Name',
            render: (product) => <span className="d-flex">
                <Avatar src={`${Constants.S3_BASE_URL(product?.thumbnail)}`} />
                <span className="pl-5">
                    {product?.name}
                </span>
            </span>
        },
        {
            title: 'Attributes',
            render: (product) => <span className="d-flex">
                {product?.attributes && product?.attributes.map((attr, ai) => <span key={ai}>{`${ai % 2 !== 0 ? ', ' : ' '}${attr.attribute}: ${attr.option}`}</span>)}
            </span>
        },
        {
            title: 'Quantity',
            dataIndex: 'quantity',
            key: 'quantity',
            render: (key) => <span>x {key}</span>
        },
        {
            title: 'Price',
            dataIndex: 'price',
            key: 'price',
            render: (key) => <span>৳{key}</span>
        },
    ];

    const footerButtons = [
        <Button
            form="myForm"
            key="submit"
            htmlType="button"
            type="primary"
            disabled={isLoading}
            size="medium"
            onClick={() => window.print()}
        >
            {isLoading ? 'Loading...' : 'Print'}
        </Button>
    ];

    return (
        <Modal
            type={"primary"}
            title="Invoice"
            visible={state.showInvoice}
            onCancel={handleOk}
            footer={footerButtons}
            width={1000}
        >
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
                                    unishopr<br />
                                    address here <br />
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
                                    <p>order Id: {order?.orderId}</p>
                                    <p>{shortDateWithTime(order?.createdAt)}</p>
                                    <p>Invoice No: {order?.payment?.invoiceNo}</p>
                                </article>
                            </Col>
                            <Col lg={12} xs={24}>
                                <address className="invoice-customer">
                                    <Heading className="invoice-customer__title" as="h5">
                                        Invoice To :
                                    </Heading>
                                    <p>
                                        {`${order?.user?.firstName} ${order?.user?.lastName}`} <br />
                                        {/*{order?.user?._id?.email} <br />*/}
                                        {/*{order?.user?._id?.phone.country.code} {order?.user._id?.phone.phone}*/}
                                        {/*{order?.user?._id?.address[0]?.addressLine1} <br />*/}
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
                        <Table dataSource={order?.products} columns={columns} pagination={false} />
                    </div>
                </ProductTable>

                <Row justify="end">
                    <Col xxl={4} xl={5} sm={8} xs={14} offset={10}>
                        <OrderSummary>
                            <div className="invoice-summary-inner" style={{ padding: '8px 16px' }}>
                                <ul className="summary-list">
                                    <li>
                                        <span className="summary-list-title">Subtotal:</span>
                                        <span className="summary-list-text">৳{total?.subTotal}</span>
                                    </li>
                                    <li>
                                        <span className="summary-list-title">Shipping Fee:</span>
                                        <span className="summary-list-text">৳0</span>
                                    </li>
                                </ul>
                                <Heading className="summary-total" as="h4">
                                    <span className="summary-total-label">Total: </span>
                                    <span className="summary-total-amount">৳{total?.grandTotal}</span>
                                </Heading>
                            </div>
                        </OrderSummary>
                    </Col>
                </Row>
            </Cards>
        </Modal>
    )
}

export default Invoice;
