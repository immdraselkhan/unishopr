import { Form } from "antd";
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from "react-redux";
import { Main } from "../../styled";
import BannerForm from "./form";
import BannerList from "./list";
import {
    addBanner,
    deleteBanner,
    fetchBanner,
    fetchBanners,
    resetBannerForm,
    updateBanner
} from "../../../redux/webSetup/banners/actionCreator";

const BannersData = () => {
    const dispatch = useDispatch();
    const isLoading = useSelector(state => state.utilities.loading);
    const banners = useSelector(state => state.wsBanners.banners);
    const banner = useSelector(state => state.wsBanners.banner);
    const [form] = Form.useForm()

    const [state, setState] = useState({
        visible: false,
        modalType: 'primary',
        colorModal: false,
        uploading: false,
    });

    useEffect(() => {
        const fetchData = async () => {
            await dispatch(fetchBanners({page: 1, perPage: 10}))
        };
        fetchData().then(r => {});
    }, []);

    const getBanners = async (page, perPage) => await dispatch(fetchBanners({page, perPage}));
    const getBannerInfo = (_id) => dispatch(fetchBanner(_id, showModalEdit));
    const showModal = async type => {
        await setState({
            ...state,
            visible: true,
            modalType: type,
        });
        await dispatch(resetBannerForm());
        await form.resetFields();
    };

    const handleOk = async () => {
        setState({
            ...state,
            visible: false,
            colorModal: false,
        });
        await dispatch(resetBannerForm());
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

    return (
        <Main>
            <BannerList
                state={state}
                setState={setState}
                showModal={showModal}
                isLoading={isLoading}
                banners={banners}
                getBanners={getBanners}
                getBannerInfo={getBannerInfo}
                deleteBanner={deleteBanner}/>

            <BannerForm
                form={form}
                state={state}
                banner={banner}
                addBanner={addBanner}
                updateBanner={updateBanner}
                handleOk={handleOk}
                isLoading={isLoading}/>
        </Main>
    )
}

export default BannersData;
