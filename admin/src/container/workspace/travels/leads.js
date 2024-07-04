import React, { useEffect, useState, useRef } from "react";
import { Button } from "../../../components/buttons/buttons";
import { Cards } from "../../../components/cards/frame/cards-frame";
import { Modal, Row, Col, Table, Button as AntButton, Avatar } from "antd";
import { InvoiceHeader, InvoiceLetterBox, ProductTable, OrderSummary } from "../../styled";
import Heading from "../../../components/heading/heading";
import { Constants } from "../../../config/constants";
import { useDispatch } from "react-redux";
import FontAwesome from "react-fontawesome";
import { Alert } from "../../../services/alertService";
import { useReactToPrint } from 'react-to-print';
import { shortDate } from "../../../utility/dataTime";
import { Link } from "react-router-dom";

const TravelLeads = (
    {
        state,
        setState,
        travel,
        getTravelLeads,
        isLoading,
        handleOk,
        travelResolve
    }
) => {
    const dispatch = useDispatch();
    const componentRef = useRef();
    const handlePrint = useReactToPrint({
        content: () => componentRef.current,
    });

    const columns = [
        {
            title: 'Lead',
            dataIndex: 'leadId',
            key: 'leadId',
        },
        {
            title: 'User',
            render: (lead) => lead?.user ? <span className="d-flex">
                <Avatar src={`${Constants.S3_BASE_URL(lead.user.photo)}`} />
                <span className="pl-5">
                    <Link target="_blank" to={`/admin/client/users-profile/${lead.user._id._id}`}>
                        {`${lead.user.firstName} ${lead.user.lastName}`}<br />
                        {`${lead?.user?._id?.phone?.country?.code}${lead?.user?._id?.phone?.phone}`}<br />
                        {`${lead?.user?._id?.email}`}
                    </Link>
                </span>
            </span> : 'N/A'
        },
        {
            title: 'Product',
            render: (lead) => lead?.name ? <span className="d-flex">
                <Avatar src={`${Constants.S3_BASE_URL(lead.photo)}`} />
                <a href={lead.url} target={"_blank"} className="pl-5">
                    {lead.name}
                </a>
            </span> : 'N/A'
        },
        {
            title: 'Price',
            render: (lead) => <span>{lead?.route?.to?.country?.currencySymbol}&nbsp;{lead?.price}</span>
        },
        {
            title: 'Quantity',
            dataIndex: 'quantity',
            key: 'quantity',
            render: (quantity) => `x${quantity}`
        },
        {
            title: 'Total',
            render: (lead) => <span>{lead?.route?.to?.country?.currencySymbol}&nbsp;{lead?.checkout.totalAmount}</span>
        },
    ];

    const footerButtons = [
        <Button
            form="myForm"
            key="add-lead"
            htmlType="button"
            type="secondary"
            disabled={travel.status !== "upcoming" || isLoading}
            size="medium"
            onClick={() => getTravelLeads(travel._id)}
        >
            {isLoading ? 'Loading...' : 'Add Lead'}
        </Button>,
        <Button
            key="resolve"
            htmlType="button"
            type="success"
            disabled={travel.status !== "upcoming" || isLoading}
            size="medium"
            onClick={() => Alert.confirm({ action: travelResolve({ status: "resolved", _id: travel._id }) })}
        >
            {isLoading ? 'Loading...' : 'Resolve'}
        </Button>,
        <Button
            form="myForm"
            key="print"
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
            type={"primary"}
            title="Leads"
            visible={state.leadVisible}
            onCancel={handleOk}
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
                                <Col md={6}>
                                    <article className="invoice-author">
                                        <Heading className="invoice-author__title" as="h3">
                                            Orders
                                        </Heading>
                                        <p>Travel ID: {travel.travelId}</p>
                                    </article>
                                </Col>
                                <Col md={6}>
                                    <address className="invoice-customer">
                                        <Heading className="invoice-customer__title" as="h5">
                                            Traveler:
                                        </Heading>
                                        <p>
                                            {`${travel?.user?.firstName} ${travel?.user?.lastName}`} <br />
                                            {`${travel?.user?._id?.phone?.country?.code}${travel?.user?._id?.phone?.phone}`}
                                        </p>
                                    </address>
                                </Col>
                                <Col md={6}>
                                    <address className="invoice-customer">
                                        <Heading className="invoice-customer__title" as="h5">
                                            Traveling:
                                        </Heading>
                                        <p>
                                            {travel?.route?.from?.name} {`->`} {travel?.route?.to?.name} <br />
                                            {shortDate(travel?.travelDate)}
                                        </p>
                                    </address>
                                </Col>
                                <Col md={6}>
                                    <address className="invoice-customer">
                                        <Heading className="invoice-customer__title" as="h5">
                                            Weight:
                                        </Heading>
                                        <p>
                                            Capacity: {travel?.weight?.capacity} <small>(KG)</small> <br />
                                            Loaded: {travel?.weight?.loaded} <small>(KG)</small>
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
                                dataSource={travel.leads}
                                columns={columns}
                                pagination={false}
                            />
                        </div>
                    </ProductTable>
                </Cards>
            </div>
        </Modal >
    )
}

export default TravelLeads;
