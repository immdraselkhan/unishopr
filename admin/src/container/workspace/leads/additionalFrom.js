import {Button as AntButton, Col, Form, Input, Modal, Row} from "antd";
import React, {useEffect, useState} from "react";
import { useDispatch } from "react-redux";
import { Button } from "../../../components/buttons/buttons";
import FontAwesome from "react-fontawesome";
import {updateLeadAdditionalInfo} from "../../../redux/workspace/leads/actionCreator";

import {OrderSummary} from "../../styled";

const AdditionalForm = (
    {
        form,
        state,
        setState,
        isLoading,
        updateLead,
        handleOk,
        lead
    }
) => {
    const dispatch = useDispatch()
    const layout = { labelCol: { span: 8 }, wrapperCol: { span: 16 } }
    const validateMessages = { required: '${label} is required!' };

    const [additional, setAdditional] = useState([])
    const [additionalData, setAdditionalData] = useState({attributes: [], title: ''})
    const [attributes, setAttributes] = useState([]);
    const [attrFormData, setAttrFormData] = useState({ name: "", value: "", cost: "" })

    useEffect(() => {
        if (state.additional) setAdditional(state.additional);
        if (state.addi) setAttributes(state.addi.attributes);
        if (state.addi) setAdditionalData(state.addi);
    }, [lead, state.additional, state.addi])

    const handleAttribute = (event) => {
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

    const handleSubmit = async (data) => {
        if (state.addi){
            await dispatch(updateLeadAdditionalInfo({
                data: {
                    _id: state.addi._id,
                    attributes: attributes,
                    title: additionalData.title,
                },
                leadId: lead._id,
                action: () => handleOk()
            }))
        }
        else {
            Object.assign(additionalData, {attributes: attributes});
            additional.push(additionalData);
            await updateLead({
                additional,
                _id: lead._id,
            }, handleOk);
        }
        await setAdditionalData({attributes: [], title: ''});
        await setAttributes([]);
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
                title="Additional Info"
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
                        initialValue={state.addi?.title ? state.addi.title : ''}
                        label="Title"
                    >
                        <Input placeholder="Title" onChange={(e) => setAdditionalData({...additionalData, title: e.target.value})} />
                    </Form.Item>
                </Form>
                <Row >
                    <Col >
                        <OrderSummary>
                            <div className="invoice-summary-inner" style={{ padding: '8px 6px' }}>
                                <ul className="summary-list">
                                    <li className="list-form">
                                        <form onSubmit={handleAttribute}>
                                            <span className="summary-list-title">
                                                <input
                                                    className="summary-list-input form-responsive"
                                                    type="text"
                                                    placeholder="Attr Name"
                                                    required={true}
                                                    value={attrFormData.name}
                                                    onChange={({ target }) => setAttrFormData({ ...attrFormData, name: target.value })}
                                                />
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
                                                {lead.status === "ordered" ? (
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
                                </ul>
                            </div>
                        </OrderSummary>
                    </Col>
                </Row>
            </Modal>
        </Col>
    )
}

export default AdditionalForm;
