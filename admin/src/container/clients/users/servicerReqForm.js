import React, {useState} from "react";
import {useDispatch} from "react-redux";
import {Button} from "../../../components/buttons/buttons";
import {Col, Form, Modal, Input, Row,} from "antd";

const ServicesReqForm = (props) => {
    const {
        isLoading,
        state,
        handleOk,
        form,
        travelerRequest,
        updateTraveler,
        partnerRequest,
        updatePartner,
    } = props;

    const dispatch = useDispatch();
    const layout = { labelCol: { span: 8 }, wrapperCol: { span: 16 }}
    const validateMessages = { required: '${label} is required!', };
    const  services = state.user?.services

    const handleSubmit = async (data) => {
        const formData = {
            _id: state.user._id,
            overview: data.overview,
        }
        if (state.update){
            if(state.modalType === 'Traveler'){
                await dispatch(updateTraveler(formData, handleOk));
            } else if (state.modalType === 'Partner'){
                await dispatch(updatePartner(formData, handleOk));
            }
        } else {
            if (state.modalType === 'Traveler') {
                await dispatch(travelerRequest(formData, handleOk));
            } else if (state.modalType === 'Partner') {
                await dispatch(partnerRequest(formData, handleOk));
            }
        }
    }

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

    return(
        <Col md={12}>
            <Modal
                type={state.modalType}
                title={ state.modalType + " Form"}
                visible={state.reqModalVisible }
                onCancel={() => handleOk()}
                footer={footerButtons}
                width={800}
            >
                <Form
                    {...layout}
                    name={'userForm'}
                    form={form}
                    id={'myForm'}
                    className="my-form"
                    validateMessages={validateMessages}
                    onFinish={handleSubmit}
                >
                    <div className="divider"/>
                     <Row>
                         <Col md={24}>
                             <Form.Item
                                 labelCol={4}
                                 wrapperCol={20}
                                 name="overview"
                                 initialValue={
                                    (state.modalType === 'Traveler' && services?.traveler?.overview ? services.traveler.overview : null) ||
                                    (state.modalType === 'Partner' && services?.partner?.overview ? services.partner.overview : null)
                                 }
                                 rules={[{ required: false }]}
                                 label="Overview">
                                    <Input.TextArea placeholder="Overview"/>
                             </Form.Item>
                         </Col>
                     </Row>
                </Form>
            </Modal>
        </Col>
    )
}

export default ServicesReqForm;