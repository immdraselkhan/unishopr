import React, {useEffect, useState} from "react";
import FeatherIcon from 'feather-icons-react';
import {useDispatch} from "react-redux";
import {Button} from "../../../components/buttons/buttons";
import {Row, Col, Form, Input, Modal, Select} from "antd";
import {Constants} from "../../../config/constants";
import TextArea from "antd/es/input/TextArea";
import {Alert} from "../../../services/alertService";
import {uploadFile, deleteFile, uploadVideo} from "../../../utility/fileUpload";
import { EditorState, ContentState, convertToRaw, convertFromRaw } from "draft-js";
import { Editor } from "react-draft-wysiwyg";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import {isJsonString} from "../../../utility/utility";

const ProductForm = (
    {
        form,
        state,
        product,
        addProduct,
        updateProduct,
        isLoading,
        handleOk,
        countries,
        categories,
        subCategories,
        childCategories,
        getSubCategory,
        getChildCategory,
        tags
    }) => {
    const dispatch = useDispatch()
    const layout = { labelCol: { span: 8 }, wrapperCol: { span: 16 }}

    const initiateUploading = {cover: false, gallery: false, featured: false, video: false, videoPercentage: 0};
    const initiateFile = {cover: null, featured: null, video: null, gallery: []};

    const [uploading, setUploading] = useState(initiateUploading);
    const [file, setFile] = useState(initiateFile);

    const [longDescription, setLongDescription] = useState(EditorState.createEmpty())

    useEffect(() => {
        if (product && product._id) {
            getSubCategory(product?.category?._id)
            product?.subCategory && getChildCategory(product?.subCategory?._id)
            setFile({
                cover: product.file.cover,
                featured: product.file.featured,
                video: product.file.video,
                gallery: product.file.gallery
            })

            if (product.description.long && isJsonString(product.description.long))
                setLongDescription(EditorState.createWithContent(ContentState.fromJS(JSON.parse(product.description.long))))
        }
    }, [product])

    const validateMessages = {
        required: '${label} is required!',
    };

    // const setVideoUploading = (videoPercentage) => setUploading({...uploading, videoPercentage, video: true})

    const handleSubmit = async (data) => {
        const filteredTags = [];
        data.tags.forEach(tag => filteredTags.push(tags.filter(item => tag === item._id)[0]))

        const postDate = {
            country: countries.filter(item => item._id === data.country)[0],
            category: categories.filter(item => item._id === data.category)[0],
            subCategory: subCategories.filter(item => item._id === data.subCategory)[0],
            childCategory: childCategories.filter(item => item._id === data.childCategory)[0],
            tags: filteredTags,
            name: data.name,
            weight: data.weight,
            url: data.url,
            price: {
                cost: data.priceCost,
                tax: data.priceTax,
                regular: data.priceRegular,
                new: data.priceNew
            },
            discount: {
                type: data.discountType ? data.discountType : null,
                value: data.discountValue,
                from: data.discountFrom,
                to: data.discountTo,
            },
            stock: {
                isAlert: data.stockIsAlert === "1",
                alertQty: data.stockAlertQty,
                quantity: data.stockQuantity,
            },
            preOrder: {
                isAllowed: data.preOrderIsAllowed  === "1",
                limit: data.preOrderLimit,
            },
            facts: {
                isFeatured: data.factsIsFeatured === "1",
            },
            description: {
                short: data.descriptionShort,
                long: JSON.stringify(longDescription.getCurrentContent()),
            },
            file: file
        }

        if (product._id){
            Object.assign(postDate, {_id: product._id});
            await dispatch(updateProduct(postDate, handleOk))
            await setFile(initiateFile);
        } else {
            await dispatch(addProduct(postDate, handleOk));
            await setFile(initiateFile);
        }
    };

    const upload = (file, uploadFor) => {
        if (form.getFieldsValue().name) {
            setUploading({...uploading, [uploadFor]: true});
            uploadFile(file, Constants.S3_PRODUCT_DIR(form.getFieldsValue().name))
                .then((res) => {
                    if (uploadFor === 'gallery') {
                        setFile(prevState => ({
                            ...prevState,
                            gallery: [...prevState.gallery, {file: res.key ? res.key : res.Key}]
                        }))
                    }
                    if (uploadFor === 'cover')
                        setFile(prevState => ({...prevState, cover: res.key ? res.key : res.Key}))
                    // if (uploadFor === 'video')
                    //     setFile(prevState => ({...prevState, video: res.key ? res.key : res.Key}))
                    if (uploadFor === 'featured')
                        setFile(prevState => ({...prevState, featured: res.key ? res.key : res.Key}))

                    setUploading({...uploading, [uploadFor]: false});
                })
        } else Alert.info({title: 'Please input a product name first!'})
    }

    // const videoUpload = (file) => {
    //     if (form.getFieldsValue().name) {
    //         setUploading({...uploading, video: true});
    //         uploadVideo(file, Constants.S3_PRODUCT_DIR(form.getFieldsValue().name), setVideoUploading, (cb) => {
    //             setFile(prevState => ({...prevState, video: cb.key ? cb.key : cb.Key}));
    //             setUploading({...uploading, video: false});
    //         })
    //     } else Alert.info({title: 'Please input a product name first!'})
    // }

    const fileDelete = (key, deleteFor) => {
        deleteFile(key, cb => {
            if (deleteFor === 'gallery') {
                setFile(prevState => ({
                    ...prevState,
                    gallery: prevState.gallery.filter(item => item.file !== key)
                }))
            } else
                setFile(prevState => ({...prevState, [deleteFor]: null}))
        })
    }

    const setProductNewPrice = (discountValue) => {
        const type = form.getFieldValue("discountType");
        const price = form.getFieldValue("priceRegular");
        if (type && price) {
            if (type === 'percentage') {
                form.setFieldsValue({priceNew: price * (1 - (discountValue/100))})
            } else if (type === 'flat') {
                form.setFieldsValue({priceNew: (price - discountValue)})
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
            size="medium">
            {isLoading ? 'Loading...' : 'Submit'}
        </Button>
    ];

    const getInitialTags = () => {
        const tags = [];
        // eslint-disable-next-line no-unused-expressions
        product?.tags ? product?.tags.forEach(data => tags.push(data._id)) : null
        return tags
    }

    return (
        <Modal
            type={state.modalType}
            title="Products Form"
            visible={state.visible}
            onCancel={() => {
                setFile(initiateFile);
                handleOk();
            }}
            footer={footerButtons}
            width={1200}
        >
            <Form
                {...layout}
                name={'productForm'}
                form={form}
                id={'myForm'}
                validateMessages={validateMessages}
                onFinish={handleSubmit}
            >
                <Row>
                    <Col md={8}>
                        <Form.Item
                            name="name"
                            rules={[{required: true}]}
                            initialValue={product?.name ? product.name : null}
                            label="Name">
                            <Input placeholder="Name"/>
                        </Form.Item>
                    </Col>
                </Row>
                <Row>
                    <Col md={8}>
                        <Form.Item
                            name="url"
                            rules={[{required: false}]}
                            initialValue={product?.url ? product.url : null}
                            label="Url">
                            <Input placeholder="Url"/>
                        </Form.Item>
                    </Col>
                </Row>
                <div className="divider" />
                <Row>
                    <Col md={8}>
                        <Form.Item
                            name="fileGallery"
                            initialValue={product?.file?.cover ? product.file.cover : null}
                            label={<span>Gallery <small>(600x800)</small></span>}
                        >
                            <div>
                                <label
                                    className="ant-btn sc-fMiknA kzFbZB btn-outlined ant-btn-light ant-btn-lg"
                                    htmlFor="upload"
                                >
                                    <FeatherIcon icon="upload" />
                                    <span
                                        aria-disabled={uploading.gallery}
                                        style={{verticalAlign: 'super'}}
                                    >
                                        {uploading.gallery ? 'Uploading...' : 'Upload'}
                                    </span>
                                </label>
                                <input
                                    type="file"
                                    id="upload"
                                    className="hidden"
                                    onClick={event => event.target.value = null}
                                    onChange={(event) => upload(event.target.files[0], 'gallery')}
                                />
                            </div>
                        </Form.Item>
                    </Col>
                    {file.gallery.length ? file.gallery.map((item, ind) => (
                        item.file ? (
                            <Col md={4} key={ind}>
                                <div>
                                    <img
                                        height={80}
                                        src={Constants.S3_BASE_URL(item.file)}
                                        alt=""
                                    />
                                </div>
                                <div>
                                    <Button
                                        size="extra-small"
                                        type="danger"
                                        onClick={() => fileDelete(item.file, 'gallery')}
                                    >
                                        <FeatherIcon icon="trash-2" size={14} />
                                    </Button>
                                </div>
                            </Col>
                        ) : null
                    )) : null}
                </Row>
                <div className="divider" />
                <Row>
                    <Col md={8}>
                        <Form.Item
                            name="fileCover"
                            // initialValue={product?.file?.cover ? product.file.cover : null}
                            label={<span>Cover <small>(600x800)</small></span>}
                        >
                            <div>
                                <label
                                    className={file.cover ? "hidden" : "ant-btn sc-fMiknA kzFbZB btn-outlined ant-btn-light ant-btn-lg"}
                                    htmlFor="coverUpload"
                                >
                                    <FeatherIcon icon="upload" />
                                    <span
                                        aria-disabled={uploading.cover}
                                        style={{verticalAlign: 'super'}}
                                    >
                                        {uploading.cover ? 'Uploading...' : 'Upload'}
                                    </span>
                                </label>
                                <input
                                    type="file"
                                    id="coverUpload"
                                    className="hidden"
                                    onClick={event => event.target.value = null}
                                    onChange={(event) => upload(event.target.files[0], 'cover')}
                                />
                            </div>
                        </Form.Item>
                    </Col>
                    {file.cover ? (
                        <Col md={4}>
                            <div>
                                <img
                                    height={80}
                                    src={Constants.S3_BASE_URL(file.cover)}
                                    alt=""
                                />
                            </div>
                            <div>
                                <Button
                                    size="extra-small"
                                    type="danger"
                                    onClick={() => fileDelete(file.cover, 'cover')}
                                >
                                    <FeatherIcon icon="trash-2" size={14} />
                                </Button>
                            </div>
                        </Col>
                    ) : null}
                </Row>
                <div className="divider" />
                <Row>
                    <Col md={8}>
                        <Form.Item
                            name="fileFeatured"
                            // initialValue={product?.file?.cover ? product.file.cover : null}
                            label={<span>Featured <small>(600x800)</small></span>}
                        >
                            <div>
                                <label
                                    className={file.featured ? "hidden" : "ant-btn sc-fMiknA kzFbZB btn-outlined ant-btn-light ant-btn-lg"}
                                    htmlFor="featuredUpload"
                                >
                                    <FeatherIcon icon="upload" />
                                    <span
                                        aria-disabled={uploading.featured}
                                        style={{verticalAlign: 'super'}}
                                    >
                                        {uploading.featured ? 'Uploading...' : 'Upload'}
                                    </span>
                                </label>
                                <input
                                    type="file"
                                    id="featuredUpload"
                                    className="hidden"
                                    onClick={event => event.target.value = null}
                                    onChange={(event) => upload(event.target.files[0], 'featured')}
                                />
                            </div>
                        </Form.Item>
                    </Col>
                    {file.featured ? (
                        <Col md={4}>
                            <div>
                                <img
                                    height={80}
                                    src={Constants.S3_BASE_URL(file.featured)}
                                    alt=""
                                />
                            </div>
                            <div>
                                <Button
                                    size="extra-small"
                                    type="danger"
                                    onClick={() => fileDelete(file.featured, 'featured')}
                                >
                                    <FeatherIcon icon="trash-2" size={14} />
                                </Button>
                            </div>
                        </Col>
                    ) : null}
                </Row>
                <div className="divider" />
                {/*<Row>*/}
                {/*    <Col md={8}>*/}
                {/*        <Form.Item*/}
                {/*            name="fileVideo"*/}
                {/*            // initialValue={product?.file?.cover ? product.file.cover : null}*/}
                {/*            label="Video"*/}
                {/*        >*/}
                {/*            <div>*/}
                {/*                <label*/}
                {/*                    className={file.video ? "hidden" : "ant-btn sc-fMiknA kzFbZB btn-outlined ant-btn-light ant-btn-lg"}*/}
                {/*                    htmlFor="fileVideoUpload"*/}
                {/*                >*/}
                {/*                    <FeatherIcon icon="upload" />*/}
                {/*                    <span*/}
                {/*                        aria-disabled={uploading.video}*/}
                {/*                        style={{verticalAlign: 'super'}}*/}
                {/*                    >*/}
                {/*                            {uploading.video ? `Uploading... ${uploading.videoPercentage}%` : 'Upload'}*/}
                {/*                        </span>*/}
                {/*                </label>*/}
                {/*                <input*/}
                {/*                    type="file"*/}
                {/*                    id="fileVideoUpload"*/}
                {/*                    className="hidden"*/}
                {/*                    onClick={event => event.target.value = null}*/}
                {/*                    onChange={(event) => videoUpload(event.target.files[0])}*/}
                {/*                />*/}
                {/*            </div>*/}
                {/*        </Form.Item>*/}
                {/*    </Col>*/}
                {/*    {file.video ? (*/}
                {/*        <Col md={4}>*/}
                {/*            <video width="320" height="240" controls>*/}
                {/*                <source src={Constants.S3_BASE_URL(file.video)} type="video/mp4" />*/}
                {/*            </video>*/}
                {/*            <div>*/}
                {/*                <Button*/}
                {/*                    size="extra-small"*/}
                {/*                    type="danger"*/}
                {/*                    onClick={() => fileDelete(file.featured, 'video')}*/}
                {/*                >*/}
                {/*                    <FeatherIcon icon="trash-2" size={14} />*/}
                {/*                </Button>*/}
                {/*            </div>*/}
                {/*        </Col>*/}
                {/*    ) : null}*/}
                {/*</Row>*/}
                <Row>
                    <Col md={8}>
                        <Form.Item
                            initialValue={file.video}
                            rules={[{ required: true }]}
                            label="Video">
                            <Input
                                value={file.video}
                                onChange={(event) => setFile({...file, video: event.target.value})}
                                placeholder="Video URL" />
                        </Form.Item>
                    </Col>
                </Row>
                <div className="divider" />
                <Row>
                    <Col md={8}>
                        <Form.Item
                            name="country"
                            initialValue={product?.country?._id ? product?.country?._id : ''}
                            rules={[{ required: true }]}
                            label="Country">
                            <Select
                                showSearch
                                filterOption={(input, option) => option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0}
                                filterSort={(optionA, optionB) => optionA.children.toLowerCase().localeCompare(optionB.children.toLowerCase())}
                            >
                                {countries.map((country, ci) =>
                                    <Select.Option key={ci} value={country._id}>{country.name}</Select.Option>
                                )}
                            </Select>
                        </Form.Item>
                    </Col>
                    <Col md={8}>
                        <Form.Item
                            name="tags"
                            rules={[{ required: true }]}
                            initialValue={product?.tags && product?.tags.length ? getInitialTags() : [] }
                            label="Tags">
                            <Select
                                mode="multiple"
                                allowClear
                                style={{ width: '100%' }}
                                placeholder="Please select"
                                filterOption={(input, option) => option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0}
                                filterSort={(optionA, optionB) => optionA.children.toLowerCase().localeCompare(optionB.children.toLowerCase())}
                            >
                                {tags.map((tag) =>
                                    <Select.Option key={tag._id} value={tag._id}>{tag.name}</Select.Option>
                                )}
                            </Select>
                        </Form.Item>
                    </Col>
                    <Col md={8}>
                        <Form.Item
                            name="category"
                            initialValue={product?.category?._id ? product?.category?._id : ''}
                            rules={[{ required: true }]}
                            label="Category">
                            <Select
                                showSearch
                                onChange={(event) => {getSubCategory(event); form.setFieldsValue({subCategory: "", childCategory: ""})}}
                                filterOption={(input, option) => option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0}
                                filterSort={(optionA, optionB) => optionA.children.toLowerCase().localeCompare(optionB.children.toLowerCase())}
                            >
                                {categories.map((cat) =>
                                    <Select.Option key={cat._id} value={cat._id}>{cat.name}</Select.Option>
                                )}
                            </Select>
                        </Form.Item>
                    </Col>
                    <Col md={8}>
                        <Form.Item
                            name="subCategory"
                            initialValue={product?.subCategory?._id ? product.subCategory._id : ''}
                            label="Sub Category">
                            <Select
                                showSearch
                                onChange={(event) => {getChildCategory(event); form.setFieldsValue({childCategory: ""})}}
                                filterOption={(input, option) => option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0}
                                filterSort={(optionA, optionB) => optionA.children.toLowerCase().localeCompare(optionB.children.toLowerCase())}
                            >
                                {subCategories.map((subCat) =>
                                    <Select.Option key={subCat._id} value={subCat._id}>{subCat.name}</Select.Option>
                                )}
                            </Select>
                        </Form.Item>
                    </Col>
                    <Col md={8}>
                        <Form.Item
                            name="childCategory"
                            initialValue={product?.childCategory?._id ? product.childCategory._id : ''}
                            rules={[{ required: false }]}
                            label="Child Category">
                            <Select
                                showSearch
                                filterOption={(input, option) => option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0}
                                filterSort={(optionA, optionB) => optionA.children.toLowerCase().localeCompare(optionB.children.toLowerCase())}
                            >
                                {childCategories.map((childCat) =>
                                    <Select.Option key={childCat._id} value={childCat._id}>{childCat.name}</Select.Option>
                                )}
                            </Select>
                        </Form.Item>
                    </Col>
                </Row>
                <div className="divider" />
                <Row>
                    <Col md={8}>
                        <Form.Item
                            name="weight"
                            rules={[{required: false}]}
                            initialValue={product?.weight ? product.weight : null}
                            label="Weight (kg)">
                            <Input type={"number"} placeholder="Weight"/>
                        </Form.Item>
                    </Col>
                    <Col md={8}>
                        <Form.Item
                            name="priceCost"
                            rules={[{required: true}]}
                            initialValue={product?.price?.cost ? product.price.cost : null}
                            label="Cost">
                            <Input type={"number"} placeholder="Cost"/>
                        </Form.Item>
                    </Col>
                    <Col md={8}>
                        <Form.Item
                            name="priceTax"
                            rules={[{required: true}]}
                            initialValue={product?.price?.tax || product?.price?.tax === 0 ? product.price.tax : null}
                            label="Tax">
                            <Input type={"number"} placeholder="Tax"/>
                        </Form.Item>
                    </Col>
                    <Col md={8}>
                        <Form.Item
                            name="priceRegular"
                            rules={[{required: true}]}
                            initialValue={product?.price?.regular ? product.price.regular : null}
                            label="Regular Price">
                            <Input type={"number"} placeholder="Regular Price"/>
                        </Form.Item>
                    </Col>
                    <Col md={8}>
                        <Form.Item
                            name="priceNew"
                            initialValue={product?.price?.new ? product.price.new : null}
                            label="New Price">
                            <Input disabled={true} type={"number"} placeholder="New Price"/>
                        </Form.Item>
                    </Col>
                </Row>
                <div className="divider" />
                <Row>
                    <Col md={8}>
                        <Form.Item
                            name="discountType"
                            rules={[{required: false}]}
                            initialValue={product?.discount?.type ? product.discount.type : ''}
                            label="Discount Type">
                            <Select onChange={() => form.setFieldsValue({discountValue: 0})}>
                                <Select.Option value="">Select One</Select.Option>
                                {Constants.discountTypes.map((dis) =>
                                    <Select.Option key={dis.value} value={dis.value}>{dis.name}</Select.Option>
                                )}
                            </Select>
                        </Form.Item>
                    </Col>
                    <Col md={8}>
                        <Form.Item
                            name="discountValue"
                            rules={[{required: false}]}
                            initialValue={product?.discount?.value ? product.discount.value : null}
                            label="Discount Value">
                            <Input
                                onChange={(e) => setProductNewPrice(e.target.value)}
                                type={"number"}
                                placeholder="Discount Value"/>
                        </Form.Item>
                    </Col>
                    <Col md={8}>
                        <Form.Item
                            name="discountFrom"
                            rules={[{required: false}]}
                            initialValue={product?.discount?.from ? product.discount.from.split('T')[0] : null}
                            label="Discount From">
                            <Input type={"date"} placeholder="Discount From"/>
                        </Form.Item>
                    </Col>
                    <Col md={8}>
                        <Form.Item
                            name="discountTo"
                            rules={[{required: false}]}
                            initialValue={product?.discount?.to ? product.discount.to.split('T')[0] : null}
                            label="Discount To">
                            <Input type={"date"} placeholder="Discount To"/>
                        </Form.Item>
                    </Col>
                </Row>
                <div className="divider" />
                <Row>
                    <Col md={8}>
                        <Form.Item
                            name="stockIsAlert"
                            rules={[{required: false}]}
                            initialValue={product?.stock?.isAlert ? '1' : '0'}
                            label="Stock Is Alert?">
                            <Select>
                                <Select.Option value="">Select</Select.Option>
                                <Select.Option value="1">YES</Select.Option>
                                <Select.Option value="0">NO</Select.Option>
                            </Select>
                        </Form.Item>
                    </Col>
                    <Col md={8}>
                        <Form.Item
                            name="stockAlertQty"
                            rules={[{required: false}]}
                            initialValue={product?.stock?.alertQty ? product.stock.alertQty : null}
                            label="Stock Alert Qty">
                            <Input type={"number"} placeholder="Limit"/>
                        </Form.Item>
                    </Col>
                    <Col md={8}>
                        <Form.Item
                            name="stockQuantity"
                            rules={[{required: true}]}
                            initialValue={product?.stock?.quantity ? product.stock.quantity : null}
                            label="Stock Qty">
                            <Input type={"number"} placeholder="Stock Qty"/>
                        </Form.Item>
                    </Col>
                    <Col md={8}>
                        <Form.Item
                            name="preOrderIsAllowed"
                            rules={[{required: false}]}
                            initialValue={product?.preOrder?.isAllowed ? '1' : '0'}
                            label="Pre Order Is Allowed?">
                            <Select>
                                <Select.Option value="">Select</Select.Option>
                                <Select.Option value="1">YES</Select.Option>
                                <Select.Option value="0">NO</Select.Option>
                            </Select>
                        </Form.Item>
                    </Col>
                    <Col md={8}>
                        <Form.Item
                            name="preOrderLimit"
                            rules={[{required: false}]}
                            initialValue={product?.preOrder?.limit ? product.preOrder.limit : null}
                            label="Pre Order Limit">
                            <Input type={"number"} placeholder="Limit"/>
                        </Form.Item>
                    </Col>
                    <Col md={8}>
                        <Form.Item
                            name="factsIsFeatured"
                            rules={[{required: false}]}
                            initialValue={product?.facts?.isFeatured ? '1' : '0'}
                            label="Is Featured?">
                            <Select>
                                <Select.Option value="">Select</Select.Option>
                                <Select.Option value="1">YES</Select.Option>
                                <Select.Option value="0">NO</Select.Option>
                            </Select>
                        </Form.Item>
                    </Col>
                </Row>
                <div className="divider" />
                <Row>
                    <Col md={8}>
                        <Form.Item
                            name="descriptionShort"
                            rules={[{required: false}]}
                            initialValue={product?.description?.short ? product.description.short : null}
                            label="Description Short">
                            <TextArea placeholder="Short"/>
                        </Form.Item>
                    </Col>
                    <Col md={16}>
                        <Form.Item
                            labelCol={4}
                            wrapperCol={22}
                            name="descriptionLong"
                            rules={[{required: false}]}
                            initialValue={product?.description?.long ? product.description.long : null}
                            label="Description Long">
                            <Editor
                                editorState={longDescription}
                                wrapperClassName="text-editor-wrapper"
                                editorClassName="text-editor"
                                onEditorStateChange={setLongDescription}
                                placeholder={'Long Description'}
                            />
                        </Form.Item>
                    </Col>
                </Row>
            </Form>
        </Modal>
    )
}

export default ProductForm;
