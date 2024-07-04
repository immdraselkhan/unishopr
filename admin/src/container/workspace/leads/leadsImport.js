import React from "react";
import { Button } from "../../../components/buttons/buttons";
import { Col, Form, Input, Modal, Row, Select } from "antd";
import { useDispatch } from "react-redux";
import FeatherIcon from "feather-icons-react";

const LeadsImport = (
    {
        leadsImportForm,
        state,
        setState,
        leadsBulkImport,
    }
) => {
    const dispatch = useDispatch()
    const layout = { labelCol: { span: 8 }, wrapperCol: { span: 16 } }
    const validateMessages = { required: '${label} is required!' };

    const handleUpload = async (event) => {
        const file = event.target.files[0];

        const reader = new FileReader();
        reader.onload = handleFileLoad;
        reader.readAsText(file);
    };

    function handleFileLoad(event) {
        const csvData = event.target.result;
        const lines = csvData.split('\n');
        const headers = lines[0].split(',');
        const values = lines.slice(1).map(line => line.split(','));
        values.pop();
        const transformedData = values.map(([email, url, quantity, description]) => ({ email, url, quantity, description }));
        dispatch(leadsBulkImport(transformedData))
        setState({ ...state, leadsImportVisible: false })
        window.location.reload()
    }

    const footerButtons = [];

    return (
        <Col md={12}>
            <Modal
                type={"primary"}
                title="Leads Import Form"
                visible={state.leadsImportVisible}
                onCancel={() => setState({ ...state, leadsImportVisible: false })}
                footer={footerButtons}
                width={600}
            >
                <Form
                    {...layout}
                    name={'leadsFilter'}
                    form={leadsImportForm}
                    id={'leadsFilterForm'}
                    className="my-form"
                    validateMessages={validateMessages}
                // onFinish={handleSubmit}
                >
                    <Row>
                        <div style={{margin: "0px 0px 20px 0px"}}>
                            <Button type="primary">
                                <label htmlFor="leadsImport" style={{cursor: "pointer"}}>
                                    Import
                                </label>
                            </Button>    
                            <input
                                id="leadsImport"
                                type="file"
                                onChange={handleUpload}
                                className="hidden"
                            />
                        </div>
                        <div>Note: CSV file must have these fields (email, url, quantity, description) and in this order. Email and url (product link) data field is required, these two can't be empty. Other two are optional. Don't import same csv file with same data twice.</div>
                    </Row>
                </Form>
            </Modal>
        </Col>
    )
}

export default LeadsImport;
