import {Col, Form, Modal, Descriptions, List, Button as AntButton} from "antd";
import React, {useState} from "react";
import ProductAttributeForm from "./attributeForm";
import {addAttribute, updateAttribute, deleteAttribute} from "../../../redux/workspace/products/actionCreator";
import {Scope} from "../../../services/scopeService";
import {Button} from "../../../components/buttons/buttons";
import FeatherIcon from "feather-icons-react";
import FontAwesome from "react-fontawesome";
import {Alert} from "../../../services/alertService";
import {useDispatch} from "react-redux";

const ProductAttributes = ({ state, product, handleOk, isLoading }) => {
    const dispatch = useDispatch()
    const [attributeForm] = Form.useForm()

    const [attributeFormState, setAttributeFormState] = useState({
        visible: false,
        modalType: 'primary',
        colorModal: false,
        product: null,
        attribute: null
    });

    const showAttributeFormModal = async ({product, attribute}) => {
        await setAttributeFormState({
            ...state,
            visible: true,
            modalType: 'primary',
            product,
            attribute
        });
        await attributeForm.resetFields();
    };

    const handleAttributeFormOk = () => {
        setAttributeFormState({
            ...state,
            visible: false,
            colorModal: false,
            product: null,
            attribute: null
        });
        attributeForm.resetFields();
    };

    const headerButtons = [
        <div key="1" className="page-header-action">
            {Scope.checkScopes(['workspace_products_create']) && (
                <Button size="medium" type="primary" onClick={() => showAttributeFormModal({product: state?.product, attribute: null})}>
                    <FeatherIcon icon="plus" size={14}/>
                    Add New
                </Button>
            )}
        </div>
    ];

    return (
        <Col md={12}>
            <Modal
                type={state.modalType}
                title="Attributes"
                visible={state.visible}
                onCancel={handleOk}
                footer={headerButtons}
                width={1000}
            >
                {product?.attributes?.length && product.attributes.map((attribute, ai) => (
                    <Descriptions
                        key={ai}
                        title={
                            <span>
                                {`${attribute.position} - ${attribute.title}`}
                                <AntButton
                                    size="small"
                                    type="ghost"
                                    className="color-info border-info minimum-ml"
                                    icon={<FontAwesome name={"pencil"} />}
                                    onClick={() => showAttributeFormModal({product: state?.product, attribute})}
                                />
                                <AntButton
                                    size="small"
                                    type="ghost"
                                    className="color-danger border-danger minimum-ml"
                                    icon={<FontAwesome name={"trash"} />}
                                    onClick={() => Alert.confirm({action: () => dispatch(deleteAttribute({productId: product?._id, attributeId: attribute._id}))})}
                                />
                            </span>
                        }
                        bordered={true}
                        className="mb-30"
                    >
                        <Descriptions.Item label="Is Multiple?">{attribute.isMultiple ? 'Yes' : 'No'}</Descriptions.Item>
                        <Descriptions.Item label="Is Required?">{attribute.isRequired ? 'Yes' : 'No'}</Descriptions.Item>
                        <Descriptions.Item label="Max Selection">{attribute.maxSelection}</Descriptions.Item>
                        <Descriptions.Item label="Options">
                            <List
                                size="small"
                                dataSource={attribute.options}
                                renderItem={item => <List.Item>{`${item.position} - ${item.title} (৳${item.price})`}</List.Item>}
                            />
                        </Descriptions.Item>
                    </Descriptions>
                ))}
            </Modal>

            <ProductAttributeForm
                form={attributeForm}
                state={attributeFormState}
                handleOk={handleAttributeFormOk}
                addAttribute={addAttribute}
                updateAttribute={updateAttribute}
                isLoading={isLoading}
            />
        </Col>
    )
}

export default ProductAttributes;
