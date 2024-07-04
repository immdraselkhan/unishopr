import { Col, Form, Modal, Descriptions, Button as AntButton } from "antd";
import React, { useState } from "react";
import LeadUpdateForm from "./updateForm";
import { addLeadUpdate, updateLeadUpdate, deleteLeadUpdate } from "../../../redux/workspace/leads/actionCreator";
import { Scope } from "../../../services/scopeService";
import { Button } from "../../../components/buttons/buttons";
import FeatherIcon from "feather-icons-react";
import FontAwesome from "react-fontawesome";
import { Alert } from "../../../services/alertService";
import { useDispatch } from "react-redux";
import { shortDate } from "../../../utility/dataTime";
import { getDraftHtml } from "../../../utility/draft";
import {deleteAttribute} from "../../../redux/workspace/products/actionCreator";

const LeadUpdates = ({ state, lead, handleOk, isLoading }) => {
    const dispatch = useDispatch()
    const [updateForm] = Form.useForm()

    const [updateFormState, setUpdateFormState] = useState({
        visible: false,
        modalType: 'primary',
        colorModal: false,
        lead: null,
        update: null,
    });

    const showUpdateFormModal = async ({ lead, update }) => {
        await setUpdateFormState({
            ...state,
            visible: true,
            modalType: 'primary',
            lead,
            update,
        });
        await updateForm.resetFields();
    };

    const handleUpdateFormOk = async () => {
        await setUpdateFormState({
            ...state,
            visible: false,
            colorModal: false,
            lead: null,
            update: null,
        });
        await updateForm.resetFields();
    };

    const headerButtons = [
        <div key="1" className="page-header-action">
            {Scope.checkScopes(['workspace_leads_create']) && (
                <Button size="medium" type="primary" onClick={() => showUpdateFormModal({ lead, update: null })}>
                    <FeatherIcon icon="plus" size={14} />
                    Add New
                </Button>
            )}
        </div>
    ];

    return (
        <Col md={12}>
            <Modal
                type={state.modalType}
                title="Updates"
                visible={state.leadUpdateVisible}
                onCancel={handleOk}
                footer={headerButtons}
            >
                {lead?.updates?.length && lead.updates.map((update, ai) => (
                    <Descriptions
                        key={ai}
                        title={
                            <div>
                                <span className="ant-page-header-heading-sub-title ant-typography font-w400"><u>{` ${shortDate(update.createdAt)}`}</u></span>
                                <div>
                                    {` ${update.title}`}
                                    <p style={{fontSize: "14px", fontWeight: 400}}>{update.description}</p>
                                    <AntButton
                                        size="small"
                                        type="ghost"
                                        className="color-info border-info minimum-ml"
                                        icon={<FontAwesome name={"pencil"} />}
                                        onClick={() => showUpdateFormModal({ lead, update })}
                                    />
                                    <AntButton
                                        size="small"
                                        type="ghost"
                                        className="color-danger border-danger minimum-ml"
                                        icon={<FontAwesome name={"trash"} />}
                                        onClick={() => Alert.confirm({ action: () => dispatch(deleteLeadUpdate({ leadId: lead?._id, updateId: update._id })) })}
                                    />
                                </div>

                                <div className="font-w400 font-s14">{getDraftHtml(update.description)}</div>
                            </div>
                        }
                        bordered={true}
                        className="mb-30"
                    >
                    </Descriptions>
                ))}
            </Modal>

            <LeadUpdateForm
                form={updateForm}
                state={updateFormState}
                setState={setUpdateFormState}
                handleOk={handleUpdateFormOk}
                addUpdate={addLeadUpdate}
                updateUpdate={updateLeadUpdate}
                isLoading={isLoading}
            />
        </Col>
    )
}

export default LeadUpdates;
