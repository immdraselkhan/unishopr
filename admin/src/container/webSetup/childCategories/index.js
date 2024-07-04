import React, {useState, useEffect} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {Main} from "../../styled";
import {Form} from "antd";
import ChildCategoryList from "./list";
import ChildCategoryForm from "./form";
import {
    addChildCategory,
    fetchChildCategories,
    fetchChildCategory,
    updateChildCategory,
    deleteChildCategory,
    resetChildCategoryForm
} from "../../../redux/webSetup/childCategories/actionCreator";

import {fetchCategories as utilitiesCategories, fetchSubCategories as utilitiesSubCategories} from "../../../redux/utilities/actionCreator";

const ChildCategoriesData = () => {
    const dispatch = useDispatch();
    const isLoading = useSelector(state => state.utilities.loading);
    const childCategories = useSelector(state => state.wsChildCategories.childCategories);
    const childCategory = useSelector(state => state.wsChildCategories.childCategory);
    const categories = useSelector(state => state.utilities.categories);
    const subCategories = useSelector(state => state.utilities.subCategories);
    const [form] = Form.useForm()

    const [state, setState] = useState({
        visible: false,
        modalType: 'primary',
        colorModal: false,
        uploading: false,
    });

    useEffect(() => {
        const fetchData = async () => {
            await dispatch(fetchChildCategories({page: 1, perPage: 10}))
            await dispatch(utilitiesCategories())
        };
        fetchData().then(r => {});
    }, []);

    const getChildCategories = async (page, perPage) => await dispatch(fetchChildCategories({page, perPage}));
    const getChildCategoryInfo = (_id) => dispatch(fetchChildCategory(_id, async () => {
        await showModalEdit();
        await utilitiesSubCategories(_id)
    }));

    const showModal = async type => {
        await setState({
            ...state,
            visible: true,
            modalType: type,
        });
        await dispatch(resetChildCategoryForm());
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
            <ChildCategoryList
                state={state}
                setState={setState}
                showModal={showModal}
                isLoading={isLoading}
                childCategories={childCategories}
                getChildCategories={getChildCategories}
                getChildCategoryInfo={getChildCategoryInfo}
                deleteChildCategory={deleteChildCategory}/>

            <ChildCategoryForm
                form={form}
                state={state}
                childCategory={childCategory}
                addChildCategory={addChildCategory}
                updateChildCategory={updateChildCategory}
                categories={categories}
                fetchSubCategories={utilitiesSubCategories}
                subCategories={subCategories}
                handleOk={handleOk}
                isLoading={isLoading}/>
        </Main>
    )
}

export default ChildCategoriesData;
