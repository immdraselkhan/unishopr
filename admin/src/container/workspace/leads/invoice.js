import React, {useEffect, useState, useRef, Fragment} from "react";
import { Scope } from "../../../services/scopeService";
import { Button } from "../../../components/buttons/buttons";
import { Cards } from "../../../components/cards/frame/cards-frame";
import { Modal, Row, Col, Table, Button as AntButton, Avatar, Select, Form } from "antd";
import { InvoiceHeader, InvoiceLetterBox, ProductTable, OrderSummary } from "../../styled";
import Heading from "../../../components/heading/heading";
import { Constants } from "../../../config/constants";
import { useDispatch, useSelector } from "react-redux";
import FontAwesome from "react-fontawesome";
import { Alert } from "../../../services/alertService";
import { useReactToPrint } from 'react-to-print';
import { Link } from "react-router-dom";

import {
    fetchCountries as utilitiesCountries,
    fetchLeadAttributes as utilitiesLeadAttributes
} from "../../../redux/utilities/actionCreator";

const Invoice = (
    {
        state,
        lead,
        updateLead,
        isLoading,
        getLeadInfo,
        getLeadForUpdate,
        handleOk,
        getLeadForAdditional
    }
) => {
    const dispatch = useDispatch();
    const leadAttributes = useSelector(state => state.utilities.leadAttributes);
    const [attributes, setAttributes] = useState([]);
    const [attrFormData, setAttrFormData] = useState({ name: "", value: "", cost: "" });

    useEffect(() => {
        const fetchData = async () => {
            await dispatch(utilitiesLeadAttributes())
        };
        fetchData().then(r => { });
    }, []);

    useEffect(() => {
        if (lead?.checkout?.attributes?.length) setAttributes(lead.checkout.attributes);
    }, [lead])

    useEffect(() => {
        if (lead?.checkout?.totalAmount && attributes?.length) {
            const sumAttrCost = attributes.reduce((a, b) => +a + +b.cost, 0);
            const sumAttrAmount = attributes.reduce((a, b) => +a + +b.value, 0);
            const sumAttrProfit = sumAttrAmount - sumAttrCost;
        }
    }, [attributes, lead])

    const handleSubmit = (event) => {
        event.preventDefault();
        setAttributes([...attributes, attrFormData]);
        setAttrFormData({ name: "", value: "", cost: "" })
    }

    const removeAttribute = (index) => {
        const tempAttr = attributes;
        tempAttr.splice(index, 1);
        setAttributes(tempAttr);
        setAttrFormData({ name: "", value: "", cost: "" })
    }

    const componentRef = useRef();
    const handlePrint = useReactToPrint({
        content: () => componentRef.current,
    });

    const handleChange = (event) => {
        const { name, value } = event.target;
        const leadAttribute = leadAttributes.find(attr => attr._id === value);
        let cost = 0;
        leadAttribute?.type === "flat" ? cost = leadAttribute.value : cost = (leadAttribute.value / 100) * (lead.price * lead.quantity);
        setAttrFormData({ ...attrFormData, name: leadAttribute.name, value: Math.round(cost), cost: Math.round(cost), });
    }

    const columns = [
        {
            title: 'Buyer',
            render: (lead) => lead?.user ? <span className="d-flex">
                <Avatar src={`${Constants.S3_BASE_URL(lead.user.photo)}`} />
                <Link target="_blank" to={`/admin/client/users-profile/${lead.user._id._id}`}>
                    <span className="pl-5">
                        {`${lead.user.firstName} ${lead.user.lastName}`}<br />
                        {`${lead?.user?._id?.phone?.country?.code}${lead?.user?._id?.phone?.phone}`}<br />
                        {`${lead?.user?._id?.email}`}
                    </span>
                </Link>
            </span> : 'N/A'
        },
        {
            title: 'Product',
            render: (lead) => lead?.name ? <span className="d-flex">
                {/* <Avatar src={`${Constants.S3_BASE_URL(lead.photo)}`} /> */}
                <Avatar src={lead.photo} />
                <a href={lead.url} target={"_blank"} className="pl-5">
                    {lead.name}
                </a>
            </span> : 'N/A'
        },
        {
            title: 'Cost',
            render: (lead) => <span>{lead?.route?.to?.country?.currencySymbol}&nbsp;{lead?.cost}</span>
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
            title: 'Weight',
            dataIndex: 'weight',
            key: 'weight',
            render: (weight) => `${weight}`
        },
        {
            title: 'Total Weight',
            render: (lead) => <span>{(lead.quantity * lead.weight)}</span>
        },
        {
            title: 'Total',
            render: (lead) => <span>{lead?.route?.to?.country?.currencySymbol}&nbsp;{(lead.price * lead.quantity)}</span>
        },
    ];

    const handleCancel = async () => {
        await setAttributes([]);
        await setAttrFormData({ name: "", value: "", cost: "" });
        await handleOk();
    }

    const footerButtons = [
        Scope.checkScopes(['workspace_leads_super_update']) ? (
            <Button
                key="edit-button"
                htmlType="button"
                type="warning"
                disabled={isLoading || lead?.isOrdered || lead.status === "cancelled"}
                size="medium"
                onClick={() => getLeadInfo(lead?._id)}
            >
                {isLoading ? 'Loading...' : 'Change'}
            </Button>
        ) : (
            <Button
                key="edit-button"
                htmlType="button"
                type="warning"
                disabled={lead.status !== "pending" || isLoading || lead?.isOrdered}
                size="medium"
                onClick={() => getLeadInfo(lead?._id)}
            >
                {isLoading ? 'Loading...' : 'Change'}
            </Button>
        ),
        Scope.checkScopes(['workspace_leads_super_update']) ? (
            <Button
                key="update-button"
                htmlType="button"
                type="secondary"
                disabled={isLoading || lead?.isOrdered || lead.status === "cancelled"}
                size="medium"
                onClick={() => updateLead({ attributes, _id: lead._id })}
            >
                {isLoading ? 'Loading...' : 'Update'}
            </Button>
        ) : (
            <Button
                key="update-button"
                htmlType="button"
                type="secondary"
                disabled={lead.status !== "pending" || isLoading || lead?.isOrdered}
                size="medium"
                onClick={() => updateLead({ attributes, _id: lead._id })}
            >
                {isLoading ? 'Loading...' : 'Update'}
            </Button>
        ),
        // Scope.checkScopes(['workspace_leads_super_update']) ? (
        //     <Button
        //         key="resolve-button"
        //         htmlType="button"
        //         type="success"
        //         disabled={isLoading || lead?.isOrdered || lead.status === "cancelled"}
        //         size="medium"
        //         onClick={() => Alert.confirm({ action: () => updateLead({ status: "ongoing", _id: lead._id }), noDispatch: true })}
        //     >
        //         {isLoading ? 'Loading...' : 'Ongoing'}
        //     </Button>
        // ) : (
        //     <Button
        //         key="ongoing-button"
        //         htmlType="button"
        //         type="success"
        //         disabled={lead.status !== "pending" || isLoading || lead?.isOrdered}
        //         size="medium"
        //         onClick={() => Alert.confirm({ action: () => updateLead({ status: "ongoing", _id: lead._id }), noDispatch: true })}
        //     >
        //         {isLoading ? 'Loading...' : 'Ongoing'}
        //     </Button>
        // ),
        Scope.checkScopes(['workspace_leads_super_update']) ? (
            <Button
                key="resolve-button"
                htmlType="button"
                type="success"
                disabled={isLoading || lead?.isOrdered || lead.status === "cancelled"}
                size="medium"
                onClick={() => Alert.confirm({ action: () => updateLead({ status: "checkout", _id: lead._id }), noDispatch: true })}
            >
                {isLoading ? 'Loading...' : 'Checkout'}
            </Button>
        ) : (
            <Button
                key="ongoing-button"
                htmlType="button"
                type="success"
                disabled={lead.status !== "pending" || isLoading || lead?.isOrdered}
                size="medium"
                onClick={() => Alert.confirm({ action: () => updateLead({ status: "checkout", _id: lead._id }), noDispatch: true })}
            >
                {isLoading ? 'Loading...' : 'Checkout'}
            </Button>
        ),
        <Button
            key="cancel-button"
            htmlType="button"
            type="danger"
            disabled={isLoading || !((Scope.checkScopes(['workspace_orders_delete']) && lead?.status && lead.status === 'pending') || (Scope.checkScopes(['workspace_leads_super_update']) && lead?.status && (lead.status === 'pending' || lead.status === 'ongoing' || lead.status === 'checkout' || lead.status === 'resolved')))}
            size="medium"
            onClick={() => Alert.confirm({ action: () => updateLead({ status: "cancelled", _id: lead._id }) })}
        >
            {isLoading ? 'Loading...' : 'Cancel'}
        </Button>,
        <Button
            key="attribute-button"
            htmlType="button"
            type="dark"
            disabled={lead.status !== "ordered" || isLoading}
            size="medium"
            onClick={() => getLeadForAdditional(lead?._id)}
        >
            {isLoading ? 'Loading...' : 'Additional'}
        </Button>,
        <Button
            key="timeline-button"
            htmlType="button"
            type="info"
            disabled={isLoading}
            size="medium"
            onClick={() => getLeadForUpdate(lead?._id)}
        >
            {isLoading ? 'Loading...' : 'Timeline'}
        </Button>,
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
            type={"primary"}
            title="Invoice"
            visible={state.showInvoice}
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
                                        <p>Lead ID: <b>{lead.leadId}</b></p>
                                        {lead?.order?.orderId ? (<p>Order ID: <b>{lead?.order?.orderId}</b></p>) : null}
                                        {lead?.order?.payment?.transactionId ? (<p>Transaction ID: <b>{lead?.order?.payment?.transactionId}</b></p>) : null}
                                        {lead?.order?.payment?.invoiceNo ? (<p>Invoice No: <b>{lead?.order?.payment?.invoiceNo}</b></p>) : null}
                                    </article>
                                </Col>
                                <Col lg={12} xs={24}>
                                    <address className="invoice-customer">
                                        <Heading className="invoice-customer__title" as="h5">
                                            Invoice To:
                                        </Heading>
                                        <p>
                                            {`${lead?.user?._id?.address.length && lead?.user?._id?.address[0].firstName ? lead?.user?._id?.address[0].firstName + " " + lead?.user?._id?.address[0].lastName 
                                                : lead?.user?.firstName + " " + lead?.user?.lastName }` } <br />
                                            {`${lead?.user?._id?.address?.length && lead?.user?._id?.address[0].phone ? lead?.user?._id?.address[0].phone : lead?.user?._id?.phone?.phone } `} <br />
                                            {lead?.user?._id?.email} <br />
                                            {lead?.user?._id?.address?.length ? lead?.user?._id?.address[0].addressLine1 : ""}
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
                                dataSource={[lead]}
                                columns={columns}
                                pagination={false}
                            />
                        </div>
                    </ProductTable>
                    <Row justify="end">
                        <Col md={11}>
                            <OrderSummary>
                                <div className="invoice-summary-inner" style={{ padding: '8px 6px' }}>
                                    <ul className="summary-list">
                                        {lead.status === "pending"  ? (
                                            <li className="list-form">
                                                <form onSubmit={handleSubmit}>
                                                    <span className="summary-list-title">
                                                        <select name="Attr Name"
                                                                defaultValue={attrFormData.name}
                                                                required={true}
                                                                className="summary-list-input form-responsive"
                                                                onChange={handleChange}
                                                        >
                                                                <option value="">Select Attribute</option>
                                                            {leadAttributes.length && leadAttributes.map((leadAttribute) => (
                                                                <option key={leadAttribute._id} value={leadAttribute._id}>{leadAttribute.name}</option>
                                                            ))}
                                                        </select>
                                                    </span>
                                                    <span className="summary-list-text">
                                                        <input
                                                            className="summary-list-input form-responsive"
                                                            type="number"
                                                            placeholder="Attr Cost"
                                                            required={true}
                                                            value={attrFormData.cost}
                                                            onChange={({ target }) => setAttrFormData({ ...attrFormData, cost: target.value })}
                                                        />
                                                    </span>
                                                    <span className="summary-list-text">
                                                        <input
                                                            className="summary-list-input form-responsive"
                                                            type="number"
                                                            placeholder="Attr Value"
                                                            required={true}
                                                            value={attrFormData.value}
                                                            onChange={({ target }) => setAttrFormData({ ...attrFormData, value: target.value })}
                                                        />
                                                    </span>
                                                        <button className="" type="submit">Add</button>
                                                </form>
                                            </li>
                                        ) : Scope.checkScopes(['workspace_leads_super_update']) && (
                                            <li className="list-form">
                                                <form onSubmit={handleSubmit}>
                                                    <span className="summary-list-title">
                                                        <select name="Attr Name"
                                                            defaultValue={attrFormData.name}
                                                            required={true}
                                                            className="summary-list-input form-responsive"
                                                            onChange={handleChange}
                                                        >
                                                            <option value="">Select Attribute</option>
                                                            {leadAttributes.length && leadAttributes.map((leadAttribute) => (
                                                                <option key={leadAttribute._id} value={leadAttribute._id}>{leadAttribute.name}</option>
                                                            ))}
                                                        </select>
                                                    </span>
                                                    <span className="summary-list-text">
                                                        <input
                                                            className="summary-list-input form-responsive"
                                                            type="number"
                                                            placeholder="Attr Cost"
                                                            required={true}
                                                            value={attrFormData.cost}
                                                            onChange={({ target }) => setAttrFormData({ ...attrFormData, cost: target.value })}
                                                        />
                                                    </span>
                                                    <span className="summary-list-text">
                                                        <input
                                                            className="summary-list-input form-responsive"
                                                            type="number"
                                                            placeholder="Attr Value"
                                                            required={true}
                                                            value={attrFormData.value}
                                                            onChange={({ target }) => setAttrFormData({ ...attrFormData, value: target.value })}
                                                        />
                                                    </span>
                                                    <button className="" type="submit">Add</button>
                                                </form>
                                            </li>
                                        )}
                                        <li>
                                            <span className="summary-list-title"><b>Attribute:</b></span>
                                            <span className="summary-list-text"><b>Cost & Amount:</b></span>
                                        </li>
                                        {attributes.map((attr, ai) => (
                                            <li key={ai}>
                                                <span className="summary-list-title">{attr.name}:</span>
                                                <span className="summary-list-text">
                                                    {lead?.route?.to?.country?.currencySymbol}&nbsp;{attr.cost}&nbsp;&nbsp;
                                                    {lead?.route?.to?.country?.currencySymbol}&nbsp;{attr.value}
                                                    {lead.status === "pending" ? (
                                                        <>
                                                            &nbsp;&nbsp;<AntButton
                                                                size="small"
                                                                type="ghost"
                                                                className="color-danger border-danger"
                                                                icon={<FontAwesome name={"trash"} />}
                                                                onClick={() => removeAttribute(ai)}
                                                            />
                                                        </>
                                                    ) : null}
                                                </span>
                                            </li>
                                        ))}

                                        {lead?.checkout?.additional?.length ? lead.checkout.additional.map((addi, adi) => (
                                            <Fragment key={adi}>
                                                <li className="pt-10">
                                                    <span className="summary-list-title"><b>{addi.title}:</b></span>
                                                    <span className="summary-list-text"><b>Cost & Amount:</b></span>
                                                </li>
                                                {addi.attributes.map((attr, ai) => (
                                                    <li key={ai}>
                                                        <span className="summary-list-title">{attr.name}:</span>
                                                        <span className="summary-list-text">
                                                            {lead?.route?.to?.country?.currencySymbol}&nbsp;{attr.cost}&nbsp;&nbsp;
                                                            {lead?.route?.to?.country?.currencySymbol}&nbsp;{attr.value}
                                                        </span>
                                                    </li>
                                                ))}
                                            </Fragment>
                                        )) : null}
                                    </ul>
                                    <Heading className="summary-total" as="h5">
                                        <span className="summary-total-label">Cost: </span>
                                        <span className="summary-total-amount">{lead?.route?.to?.country?.currencySymbol}&nbsp;{lead?.checkout?.totalCost}</span>
                                    </Heading>
                                    <Heading className="summary-total" as="h5">
                                        <span className="summary-total-label">Amount: </span>
                                        <span className="summary-total-amount">{lead?.route?.to?.country?.currencySymbol}&nbsp;{lead?.checkout?.totalAmount}</span>
                                    </Heading>
                                    <Heading className="summary-total" as="h5">
                                        <span className="summary-total-label">Profit: </span>
                                        <span className="summary-total-amount">{lead?.route?.to?.country?.currencySymbol}&nbsp;{lead?.checkout?.totalProfit}</span>
                                    </Heading>
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