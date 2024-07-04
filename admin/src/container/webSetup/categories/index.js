import React, {useState, useEffect} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {Main} from "../../styled";
import {Form} from "antd";
import CategoryList from "./list";
import CategoryForm from "./form";
import {
    addCategory,
    fetchCategories,
    fetchCategory,
    updateCategory,
    deleteCategory,
    resetCategoryForm
} from "../../../redux/webSetup/categories/actionCreator";

const CategoriesData = () => {
    const dispatch = useDispatch();
    const isLoading = useSelector(state => state.utilities.loading);
    const categories = useSelector(state => state.wsCategories.categories);
    const category = useSelector(state => state.wsCategories.category);
    const [form] = Form.useForm()

    const [state, setState] = useState({
        visible: false,
        uploading: false,
    });

    useEffect(() => {
        const fetchData = async () => {
            await dispatch(fetchCategories({page: 1, perPage: 10}))
        };
        fetchData().then(r => {});
    }, [dispatch]);

    const getCategories = async (page, perPage) => await dispatch(fetchCategories({page, perPage}));
    const getCategoryInfo = (_id) => dispatch(fetchCategory(_id, showModalEdit));
    const showModal = async type => {
        await setState({ ...state, visible: true });
        await dispatch(resetCategoryForm());
        await form.resetFields();
    };

    const showModalEdit = async () => {
        await setState({ ...state, visible: true });
        await form.resetFields();
    };

    const handleOk = () => {
        setState({ ...state, visible: false });
    };

    return (
        <Main>
            <CategoryList
                state={state}
                setState={setState}
                showModal={showModal}
                isLoading={isLoading}
                categories={categories}
                getCategories={getCategories}
                getCategoryInfo={getCategoryInfo}
                deleteCategory={deleteCategory}
            />

            <CategoryForm
                form={form}
                state={state}
                category={category}
                addCategory={addCategory}
                updateCategory={updateCategory}
                handleOk={handleOk}
                isLoading={isLoading}
            />
        </Main>
    )
}

export default CategoriesData;
