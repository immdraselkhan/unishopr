import { Col, Form, Modal, Descriptions, Button as AntButton } from "antd";
import React, { useState } from "react";
import {
    addLeadUpdate,
    updateLeadUpdate,
    deleteLeadUpdate,
    fetchLead
} from "../../../redux/workspace/leads/actionCreator";
import { Scope } from "../../../services/scopeService";
import { Button } from "../../../components/buttons/buttons";
import FeatherIcon from "feather-icons-react";
import FontAwesome from "react-fontawesome";
import { Alert } from "../../../services/alertService";
import { useDispatch } from "react-redux";
import AdditionalForm from "./additionalFrom";

const Additional = ({ state, lead, handleOk, isLoading, updateLead }) => {

    const dispatch = useDispatch()
    const [additionalForm] = Form.useForm();

    const [additionalFormState, setAdditionalFormState] = useState({
        visible: false,
        modalType: 'primary',
        colorModal: false,
        additional:null,
        lead
    });


    const showAdditionalFormModal = async ({additional, addi} ) => {
        await setAdditionalFormState({
            ...state,
            visible: true,
            modalType: 'primary',
            additional,
            addi
        });
        await additionalForm.resetFields();
    };

    const handleAdditionalFormOk = async () => {
        await setAdditionalFormState({
            ...state,
            visible: false,
            colorModal: false,
            additional: null,
        });
        await additionalForm.resetFields();
    };

    const headerButtons = [
        <div key="1" className="page-header-action">
            {Scope.checkScopes(['workspace_leads_create']) && (
                <Button size="medium" type="primary" onClick={() => showAdditionalFormModal({
                    additional: lead.checkout.additional,
                    addi: null
                }  )}>
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
                title="Additional"
                visible={state.additionalVisible}
                onCancel={handleOk}
                footer={headerButtons}
            >
                {lead?.checkout?.additional?.length && lead?.checkout?.additional?.map((addi, ai) => (
                    <Descriptions
                        key={ai}
                        title={
                            <div>
                                <div>
                                    {` ${addi.title}`}
                                    {!addi.isPaid ? (
                                        <AntButton
                                            size="small"
                                            type="ghost"
                                            className="color-info border-info minimum-ml"
                                            icon={<FontAwesome name={"pencil"} />}
                                            onClick={() => showAdditionalFormModal({additional: lead.checkout.additional, addi: addi})}
                                        />
                                    ) : null}
                                    {/*<AntButton*/}
                                    {/*    size="small"*/}
                                    {/*    type="ghost"*/}
                                    {/*    className="color-danger border-danger minimum-ml"*/}
                                    {/*    icon={<FontAwesome name={"trash"} />}*/}
                                    {/*    onClick={() => Alert.confirm({ action: () => dispatch(deleteAdditional({ leadId: lead?._id, additionalId: addi._id })) })}*/}
                                    {/*/>*/}
                                </div>
                            </div>
                        }
                        bordered={true}
                        className="mb-30"
                    >
                    </Descriptions>
                ))}
            </Modal>
            <AdditionalForm
                form={additionalForm}
                state={additionalFormState}
                setState={setAdditionalFormState}
                handleOk={handleAdditionalFormOk}
                updateLead={updateLead}
                lead={lead}
                isLoading={isLoading}
            />
        </Col>
    )
}

export default Additional;
