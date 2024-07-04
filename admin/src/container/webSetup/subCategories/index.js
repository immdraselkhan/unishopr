import React, {useState, useEffect} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {Main} from "../../styled";
import {Form} from "antd";
import SubCategoryList from "./list";
import SubCategoryForm from "./form";
import {
    addSubCategory,
    fetchSubCategories,
    fetchSubCategory,
    updateSubCategory,
    deleteSubCategory,
    resetSubCategoryForm
} from "../../../redux/webSetup/subCategories/actionCreator";

import {fetchCategories as utilitiesCategories} from "../../../redux/utilities/actionCreator";

const SubCategoriesData = () => {
    const dispatch = useDispatch();
    const isLoading = useSelector(state => state.utilities.loading);
    const subCategories = useSelector(state => state.wsSubCategories.subCategories);
    const subCategory = useSelector(state => state.wsSubCategories.subCategory);
    const categories = useSelector(state => state.utilities.categories);
    const [form] = Form.useForm()

    const [state, setState] = useState({
        visible: false,
        modalType: 'primary',
        colorModal: false,
        uploading: false,
    });

    useEffect(() => {
        const fetchData = async () => {
            await dispatch(fetchSubCategories({page: 1, perPage: 10}))
            await dispatch(utilitiesCategories())
        };
        fetchData().then(r => {});
    }, []);

    const getSubCategories = async (page, perPage) => await dispatch(fetchSubCategories({page, perPage}));
    const getSubCategoryInfo = (_id) => dispatch(fetchSubCategory(_id, showModalEdit));
    const showModal = async type => {
        await setState({
            ...state,
            visible: true,
            modalType: type,
        });
        await dispatch(resetSubCategoryForm());
        await form.resetFields();
    };

    const showModalEdit = async () => {
        await setState({
            ...state,
            visible: true,
            modalType: "primary",
        });
        await form.resetFields();
    };

    const handleOk = () => {
        setState({
            ...state,
            visible: false,
            colorModal: false,
        });
    };
    return (
        <Main>
            <SubCategoryList
                state={state}
                setState={setState}
                showModal={showModal}
                isLoading={isLoading}
                subCategories={subCategories}
                getSubCategories={getSubCategories}
                getSubCategoryInfo={getSubCategoryInfo}
                deleteSubCategory={deleteSubCategory}/>

            <SubCategoryForm
                form={form}
                state={state}
                subCategory={subCategory}
                addSubCategory={addSubCategory}
                updateSubCategory={updateSubCategory}
                categories={categories}
                handleOk={handleOk}
                isLoading={isLoading}/>
        </Main>
    )
}

export default SubCategoriesData;
