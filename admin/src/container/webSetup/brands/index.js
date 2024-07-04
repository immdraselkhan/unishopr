import React, {useState, useEffect} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {Main} from "../../styled";
import {Form} from "antd";
import BrandList from "./list";
import BrandForm from "./form";
import {
    addBrand,
    fetchBrands,
    fetchBrand,
    updateBrand,
    deleteBrand,
    resetBrandForm
} from "../../../redux/webSetup/brands/actionCreator";

const BrandsData = () => {
    const dispatch = useDispatch();
    const isLoading = useSelector(state => state.utilities.loading);
    const brands = useSelector(state => state.wsBrands.brands);
    const brand = useSelector(state => state.wsBrands.brand);
    const [form] = Form.useForm()

    const [state, setState] = useState({
        visible: false,
        modalType: 'primary',
        colorModal: false,
        uploading: false,
        photo: null
    });

    useEffect(() => {
        const fetchData = async () => {
            await dispatch(fetchBrands({page: 1, perPage: 10}))
        };
        fetchData().then(r => {});
    }, [dispatch]);

    const getBrands = async (page, perPage) => await dispatch(fetchBrands({page, perPage}));
    const getBrandInfo = (_id) => dispatch(fetchBrand(_id, showModalEdit));

    const showModal = async type => {
        await setState({
            ...state,
            visible: true,
            modalType: type,
            photo: null,
            uploading: false
        });
        await dispatch(resetBrandForm());
        await form.resetFields();
    };

    const showModalEdit = async (brand) => {
        await setState({
            ...state,
            visible: true,
            modalType: "primary",
            uploading: false,
            photo: brand.photo
        });
        await form.resetFields();
    };

    const handleOk = () => {
        setState({
            ...state,
            visible: false,
            colorModal: false,
            photo: null,
            uploading: false
        });
    };

    return (
        <Main>
            <BrandList
                state={state}
                setState={setState}
                showModal={showModal}
                isLoading={isLoading}
                brands={brands}
                getBrands={getBrands}
                getBrandInfo={getBrandInfo}
                deleteBrand={deleteBrand}
            />

            <BrandForm
                form={form}
                state={state}
                setState={setState}
                brand={brand}
                addBrand={addBrand}
                updateBrand={updateBrand}
                handleOk={handleOk}
                isLoading={isLoading}
            />
        </Main>
    )
}

export default BrandsData;
