import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from "react-redux";
import { Main } from "../../styled";
import { Form } from "antd";
import CouponList from "./list";
import CouponForm from "./form";
import {
    addCoupon,
    fetchCoupons,
    fetchCoupon,
    updateCoupon,
    deleteCoupon,
    resetCouponForm
} from "../../../redux/workspace/coupons/actionCreator";
import { fetchCountries as utilitiesCountries, fetchUsers } from "../../../redux/utilities/actionCreator";
// import { fetchSubscriptions } from "../../../redux/utilities/actionCreator";

const CouponsData = () => {
    const dispatch = useDispatch();
    const isLoading = useSelector(state => state.utilities.loading);
    const coupons = useSelector(state => state.workspaceCoupons.coupons);
    const coupon = useSelector(state => state.workspaceCoupons.coupon);
    const countries = useSelector(state => state.utilities.countries);
    // const subscriptions = useSelector(state => state.utilities.subscriptions);
    const users = useSelector(state => state.utilities.users);
    const [form] = Form.useForm()
    const [state, setState] = useState({
        visible: false,
        modalType: 'primary',
        colorModal: false,
        uploading: false,
        thumbnail: null
    });

    useEffect(() => {
        const fetchData = async () => {
            await dispatch(fetchCoupons({ page: 1, perPage: 10 }))
        };
        fetchData().then(r => { });
    }, [dispatch]);

    useEffect(() => {
        const fetchData = async () => {
            await dispatch(utilitiesCountries())
        };
        fetchData().then(r => { });
    }, []);

    // useEffect(() => {
    //     const fetchData = async () => {
    //         await dispatch(fetchSubscriptions())
    //     };
    //     fetchData().then(r => { });
    // }, []);

    const getCoupons = async (page, perPage) => await dispatch(fetchCoupons({ page, perPage }));
    const getCouponInfo = (_id) => dispatch(fetchCoupon(_id, showModalEdit));

    const showModal = async type => {
        await setState({
            ...state,
            visible: true,
            modalType: type,
            thumbnail: null,
            uploading: false
        });
        await dispatch(resetCouponForm());
        await form.resetFields();
    };

    const showModalEdit = async (coupon) => {
        await setState({
            ...state,
            visible: true,
            modalType: "primary",
            uploading: false,
            thumbnail: coupon.thumbnail
        });
        await form.resetFields();
    };

    const handleOk = () => {
        setState({
            ...state,
            visible: false,
            colorModal: false,
            thumbnail: null,
            uploading: false
        });
    };

    return (
        <Main>
            <CouponList
                state={state}
                setState={setState}
                showModal={showModal}
                isLoading={isLoading}
                coupons={coupons}
                getCoupons={getCoupons}
                getCouponInfo={getCouponInfo}
                deleteCoupon={deleteCoupon}
            />

            <CouponForm
                form={form}
                state={state}
                setState={setState}
                countries={countries}
                // subscriptions={subscriptions}
                coupon={coupon}
                addCoupon={addCoupon}
                updateCoupon={updateCoupon}
                handleOk={handleOk}
                isLoading={isLoading}
                users={users}
                fetchUsers={fetchUsers}
            />
        </Main>
    )
}

export default CouponsData;
