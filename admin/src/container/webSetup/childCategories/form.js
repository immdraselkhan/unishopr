import React from "react";
import {useDispatch} from "react-redux";
import {Button} from "../../../components/buttons/buttons";
import {Col, Form, Input, Modal, Select} from "antd";

const ChildCategoryForm = (
    {
        form,
        state,
        childCategory,
        addChildCategory,
        updateChildCategory,
        categories,
        fetchSubCategories,
        subCategories,
        isLoading,
        handleOk
    }
) => {
    const dispatch = useDispatch()
    const layout = { labelCol: { span: 8 }, wrapperCol: { span: 16 }}

    const validateMessages = {
        required: '${label} is required!',
    };

    const handleSubmit = async (data) => {
        if (childCategory._id){
            Object.assign(data, {_id: childCategory._id});
            await dispatch(updateChildCategory(data, handleOk))
        } else
            await dispatch(addChildCategory(data, handleOk));
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
                title="Child Category Form"
                visible={state.visible}
                onCancel={() => handleOk()}
                footer={footerButtons}
            >
                <Form
                    {...layout}
                    name={'childCategoryForm'}
                    form={form}
                    id={'myForm'}
                    validateMessages={validateMessages}
                    onFinish={handleSubmit}>
                    <Form.Item
                        name="name"
                        rules={[{required: true}]}
                        initialValue={childCategory.name ? childCategory.name : null}
                        label="Name">
                        <Input placeholder="Name"/>
                    </Form.Item>
                    <Form.Item
                        name="category"
                        initialValue={childCategory?.category?._id ? childCategory.category._id : ''}
                        rules={[{ required: true }]}
                        label="Category">
                        <Select
                            showSearch
                            filterOption={(input, option) => option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0}
                            filterSort={(optionA, optionB) => optionA.children.toLowerCase().localeCompare(optionB.children.toLowerCase())}
                            onChange={(value) => dispatch(fetchSubCategories(value))}
                        >
                            <Select.Option value="">Category</Select.Option>
                            {categories.length && categories.map((category, ci) => (
                                <Select.Option value={category._id} key={ci}>{category.name}</Select.Option>
                            ))}
                        </Select>
                    </Form.Item>
                    <Form.Item
                        name="subCategory"
                        initialValue={childCategory?.subCategory?._id ? childCategory.subCategory._id : ''}
                        rules={[{ required: true }]}
                        label="Sub Category">
                        <Select
                            showSearch
                            filterOption={(input, option) => option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0}
                            filterSort={(optionA, optionB) => optionA.children.toLowerCase().localeCompare(optionB.children.toLowerCase())}
                        >
                            <Select.Option value="">Sub Category</Select.Option>
                            {subCategories.length && subCategories.map((subCategory, sci) => (
                                <Select.Option value={subCategory._id} key={sci}>{subCategory.name}</Select.Option>
                            ))}
                        </Select>
                    </Form.Item>
                    <Form.Item
                      name="description"
                      initialValue={childCategory.description ? childCategory.description : null}
                      rules={[{ required: true }]}
                      label="Description">
                        <Input.TextArea placeholder="Description"/>
                    </Form.Item>
                    <Form.Item
                        name="status"
                        initialValue={childCategory.status ? childCategory.status : ''}
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

export default ChildCategoryForm;
