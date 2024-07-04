import React, {useState, useEffect} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {Main} from "../../styled";
import {Form} from "antd";
import ProductList from "./list";
import ProductForm from "./form";
import {
    fetchProducts,
    addProduct,
    updateProduct,
    deleteProduct,
    fetchProduct,
    resetProductForm,
    updateProductStatus,
    addAttribute
} from "../../../redux/workspace/products/actionCreator";
import {
    fetchCountries,
    fetchCategories,
    fetchSubCategories,
    fetchChildCategories,
    fetchTags} from "../../../redux/utilities/actionCreator";
import ProductAttributes from "./attributes";

const ProductsData = () => {
    const dispatch = useDispatch();
    const isLoading = useSelector(state => state.utilities.loading);
    const products = useSelector(state => state.workspaceProducts.products);
    const product = useSelector(state => state.workspaceProducts.product);
    const countries = useSelector(state => state.utilities.countries);
    const categories = useSelector(state => state.utilities.categories);
    const subCategories = useSelector(state => state.utilities.subCategories);
    const childCategories = useSelector(state => state.utilities.childCategories);
    const tags = useSelector(state => state.utilities.tags);
    const [form] = Form.useForm()

    const [state, setState] = useState({
        visible: false,
        modalType: 'primary',
        colorModal: false,
    });

    const [attributeState, setAttributeState] = useState({
        visible: false,
        modalType: 'primary',
        colorModal: false,
        product: null
    });

    useEffect(() => {
        const fetchData = async () => {
            await dispatch(fetchProducts({page: 1, perPage: 10}))
            await dispatch(fetchCountries())
            await dispatch(fetchCategories())
            await dispatch(fetchTags())
        };
        fetchData().then(r => {});
    }, [dispatch]);

    const getProducts = async (queries) => await dispatch(fetchProducts(queries));
    const getSubCategories = async (categoryId) => await dispatch(fetchSubCategories(categoryId));
    const getChildCategories = async (subCategoryId) => await dispatch(fetchChildCategories(subCategoryId));
    const getProductInfo = async (_id) => dispatch(fetchProduct(_id, showModalEdit));
    const getProductForAttribute = async (_id) => dispatch(fetchProduct(_id, showAttributeModal));

    const showModal = async type => {
        await setState({
            ...state,
            visible: true,
            modalType: type,
        });
        await dispatch(resetProductForm());
        await form.resetFields();
    };

    const showAttributeModal = async product => {
        await setAttributeState({
            ...state,
            visible: true,
            modalType: 'primary',
            product
        });
    };

    const handleOk = () => {
        setState({
            ...state,
            visible: false,
            colorModal: false,
        });
        form.resetFields();
        dispatch(resetProductForm());
    };

    const handleAttributeOk = () => {
        setAttributeState({
            ...state,
            visible: false,
            colorModal: false,
            product: null
        });
    };

    const showModalEdit = async () => {
        await setState({
            ...state,
            visible: true,
            modalType: "primary",
        });
        await form.resetFields();
    };

    return (
        <Main>
            <ProductList
                state={state}
                setState={setState}
                showModal={showModal}
                getProductForAttribute={getProductForAttribute}
                isLoading={isLoading}
                getProducts={getProducts}
                getProductInfo={getProductInfo}
                deleteProduct={deleteProduct}
                statusUpdate={updateProductStatus}
                products={products}
            />

            <ProductForm
                form={form}
                state={state}
                product={product}
                countries={countries}
                categories={categories}
                subCategories={subCategories}
                childCategories={childCategories}
                tags={tags}
                addProduct={addProduct}
                updateProduct={updateProduct}
                getSubCategory={getSubCategories}
                getChildCategory={getChildCategories}
                handleOk={handleOk}
                isLoading={isLoading}
            />

            <ProductAttributes
                state={attributeState}
                product={product}
                handleOk={handleAttributeOk}
                addAttribute={addAttribute}
                isLoading={isLoading}
            />
        </Main>
    )
}

export default ProductsData;
