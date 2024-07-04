import React from "react";
import {useDispatch} from "react-redux";
import {Button} from "../../../components/buttons/buttons";
import {Col, Form, Input, Modal, Select} from "antd";

const SubCategoryForm = ({form, state, subCategory, addSubCategory, updateSubCategory, categories, isLoading, handleOk}) => {
    const dispatch = useDispatch()
    const layout = { labelCol: { span: 8 }, wrapperCol: { span: 16 }}

    const validateMessages = {
        required: '${label} is required!',
    };

    const handleSubmit = async (data) => {
        if (subCategory._id){
            Object.assign(data, {_id: subCategory._id});
            await dispatch(updateSubCategory(data, handleOk))
        } else
            await dispatch(addSubCategory(data, handleOk));
    };

    const footerButtons = [
        <Button
            form="myForm"
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
                title="Sub Category Form"
                visible={state.visible}
                onCancel={() => handleOk()}
                footer={footerButtons}
            >
                <Form
                    {...layout}
                    name={'subCategoryForm'}
                    form={form}
                    id={'myForm'}
                    validateMessages={validateMessages}
                    onFinish={handleSubmit}>
                    <Form.Item
                        name="name"
                        rules={[{required: true}]}
                        initialValue={subCategory.name ? subCategory.name : null}
                        label="Name">
                        <Input placeholder="Name"/>
                    </Form.Item>
                    <Form.Item
                        name="category"
                        initialValue={subCategory?.category?._id ? subCategory.category._id : ''}
                        rules={[{ required: true }]}
                        label="Category">
                        <Select
                            showSearch
                            filterOption={(input, option) => option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0}
                            filterSort={(optionA, optionB) => optionA.children.toLowerCase().localeCompare(optionB.children.toLowerCase())}
                        >
                            <Select.Option value="">Category</Select.Option>
                            {categories.length && categories.map((category) => (
                                <Select.Option key={category._id} value={category._id}>{category.name}</Select.Option>
                            ))}
                        </Select>
                    </Form.Item>
                    <Form.Item
                      name="description"
                      initialValue={subCategory.description ? subCategory.description : null}
                      rules={[{ required: true }]}
                      label="Description">
                        <Input.TextArea placeholder="Description"/>
                    </Form.Item>
                    <Form.Item
                        name="status"
                        initialValue={subCategory.status ? subCategory.status : ''}
                        rules={[{ required: true }]}
                        label="Status">
                        <Select>
                            <Select.Option value="">Status</Select.Option>
                            <Select.Option value="active">Active</Select.Option>
                            <Select.Option value="inactive">Inactive</Select.Option>
                        </Select>
                    </Form.Item>
                </Form>
            </Modal>

        </Col>
    )
}

export default SubCategoryForm;
