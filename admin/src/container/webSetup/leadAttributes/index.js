import React, {useState, useEffect} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {Main} from "../../styled";
import {Form} from "antd";
import LeadAttributeList from "./list";
import LeadAttributeForm from "./form";
import {
    addLeadAttribute,
    fetchLeadAttributes,
    fetchLeadAttribute,
    updateLeadAttribute,
    deleteLeadAttribute,
    resetLeadAttributeForm
} from "../../../redux/webSetup/leadAttribute/actionCreator";
import {fetchCountries as utilitiesCountries} from "../../../redux/utilities/actionCreator";

const LeadAttributesData = () => {
    const dispatch = useDispatch();
    const isLoading = useSelector(state => state.utilities.loading);
    const leadAttributes = useSelector(state => state.wsLeadAttributes.leadAttributes);
    const leadAttribute = useSelector(state => state.wsLeadAttributes.leadAttribute);
    const countries = useSelector(state => state.utilities.countries);
    const [form] = Form.useForm()

    const [state, setState] = useState({
        visible: false,
        uploading: false,
    });

    useEffect(() => {
        const fetchData = async () => {
            await dispatch(fetchLeadAttributes({page: 1, perPage: 10}))
        };
        fetchData().then(r => {});
    }, [dispatch]);

    useEffect(() => {
        const fetchData = async () => {
            await dispatch(utilitiesCountries())
        };
        fetchData().then(r => {});
    }, []);

    const getLeadAttributes = async (page, perPage) => await dispatch(fetchLeadAttributes({page, perPage}));
    const getLeadAttributeInfo = (_id) => dispatch(fetchLeadAttribute(_id, showModalEdit));
    const showModal = async type => {
        await setState({ ...state, visible: true });
        await dispatch(resetLeadAttributeForm());
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
            <LeadAttributeList
                state={state}
                setState={setState}
                showModal={showModal}
                isLoading={isLoading}
                leadAttributes={leadAttributes}
                getLeadAttributes={getLeadAttributes}
                getLeadAttributeInfo={getLeadAttributeInfo}
                deleteLeadAttribute={deleteLeadAttribute}
            />

            <LeadAttributeForm
                form={form}
                state={state}
                countries={countries}
                leadAttribute={leadAttribute}
                addLeadAttribute={addLeadAttribute}
                updateLeadAttribute={updateLeadAttribute}
                handleOk={handleOk}
                isLoading={isLoading}
            />
        </Main>
    )
}

export default LeadAttributesData;
