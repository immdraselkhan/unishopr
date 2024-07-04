import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from "react-redux";
import { Main } from "../../styled";
import { Form } from "antd";
import LeadList from "./list";
import LeadUpdate from "./update";
import {
    fetchLeads,
    fetchLead,
    updateLead,
    addLeadUpdate,
    resetLeadForm,
    addLead,
    leadsBulkImport
} from "../../../redux/workspace/leads/actionCreator";
import { fetchUsers, fetchCities } from "../../../redux/utilities/actionCreator";
import Invoice from "./invoice";
import LeadsFilter from "./filter";
import LeadForm from "./form";
import LeadsImport from "./leadsImport";
import { fetchCountries as utilitiesCountries } from "../../../redux/utilities/actionCreator";
import Additional from "./additional";

const LeadsData = () => {
    const dispatch = useDispatch();
    const isLoading = useSelector(state => state.utilities.loading);
    const leads = useSelector(state => state.workspaceLeads.leads);
    const lead = useSelector(state => state.workspaceLeads.lead);
    const users = useSelector(state => state.utilities.users);
    const cities = useSelector(state => state.utilities.cities);
    const countries = useSelector(state => state.utilities.countries);
    const [filter] = Form.useForm()
    const [form] = Form.useForm()
    const [leadsImportForm] = Form.useForm()

    const initialFilters = {
        page: 1,
        perPage: 10,
        productName: "",
        from: "",
        to: "",
        users: "",
        status: "pending",
        leadDateFrom: "",
        leadDateTo: "",
        updatedDateFrom: "",
        updatedDateTo: "",
        sort: "",
        leadId: "",
    };

    const [filteredCities, setFilteredCities] = useState([])
    const [filters, setFilters] = useState(initialFilters);

    const [state, setState] = useState({
        modalType: 'primary',
        filterVisible: false,
        leadUpdateVisible: false,
        showInvoice: false,
        lead: null,
        visible: false,
        user: { _id: null },
        additional: null,
        leadsImportVisible: false,
    });

    useEffect(() => {
        const fetchData = async () => {
            await dispatch(fetchLeads(filters));
            await dispatch(fetchCities());
            await dispatch(utilitiesCountries())
        };
        fetchData().then(r => { });
    }, [filters]);

    const getLeads = async (page, perPage) => await dispatch(fetchLeads({ page, perPage }));
    const getLeadForUpdate = async (_id) => dispatch(fetchLead(_id, showUpdateModal));
    const getLeadForAdditional = async (_id) => dispatch(fetchLead(_id, showAdditionalModal));
    const getLeadInfo = async (_id) => dispatch(fetchLead(_id, showLeadEdit));
    const updateLeadInfo = async (body, action) => dispatch(updateLead(body, action, filters));

    const showModal = async type => {
        await setState({
            ...state,
            visible: true,
            modalType: type,
        });
        await dispatch(resetLeadForm());
        await form.resetFields();
    };

    const showUpdateModal = async lead => {
        await setState({ ...state, leadUpdateVisible: true, lead });
    }

    const showAdditionalModal = async lead => {
        await setState({ ...state, additionalVisible: true, additional: lead.additional });
    }

    const handleOk = () => {
        setState({
            ...state,
            filterVisible: false,
            // showInvoice: false,
            // leadUpdateVisible: false,
            visible: false,
        });
        form.resetFields();
        dispatch(resetLeadForm());
    };

    const handleUpdateOk = () => {
        setState(
            {
                ...state,
                visible: false,
                lead: null,
                leadUpdateVisible: false,
                additionalVisible: false,
            });
    }

    const handleInvoiceOk = () => {
        setState(
            {
                ...state,
                showInvoice: false,
                lead: null,
            });
    }

    const showLeadEdit = async () => {
        await setState({
            ...state,
            visible: true,
            modalType: "primary",
        });
        await form.resetFields();
    };

    const handleRoute = (value) => {
        dispatch(fetchCities(value))
        const currentCity = cities.filter(city => city._id === value)
        setFilteredCities(cities.filter(city => city.country._id !== currentCity[0].country._id))
    }

    return (
        <Main>
            <LeadList
                state={state}
                setState={setState}
                showModal={showModal}
                filters={filters}
                setFilters={setFilters}
                getLeadInfo={getLeadInfo}
                isLoading={isLoading}
                leads={leads}
                getLeads={getLeads}
                showInvoice={(lead) => dispatch(fetchLead(lead, () => setState({ ...state, showInvoice: true })))}
                getLeadForUpdate={getLeadForUpdate}
                updateLead={updateLeadInfo}
            />

            <Invoice
                state={state}
                setState={setState}
                lead={lead}
                updateLead={updateLeadInfo}
                getLeadInfo={getLeadInfo}
                getLeadForUpdate={getLeadForUpdate}
                getLeadForAdditional={getLeadForAdditional}
                handleOk={handleInvoiceOk}
                isLoading={isLoading}
            />

            <LeadsFilter
                filter={filter}
                state={state}
                initialFilters={initialFilters}
                setState={setState}
                users={users}
                cities={cities}
                filters={filters}
                setFilters={setFilters}
                fetchUsers={fetchUsers}
                fetchCities={fetchCities}
                isLoading={isLoading}
            />

            <LeadUpdate
                state={state}
                lead={lead}
                handleOk={handleUpdateOk}
                updateLead={addLeadUpdate}
                isLoading={isLoading}
            />

            <Additional
                state={state}
                lead={lead}
                handleOk={handleUpdateOk}
                updateLead={updateLeadInfo}
                isLoading={isLoading}
            />

            <LeadForm
                form={form}
                cities={cities}
                lead={lead}
                state={state}
                setState={setState}
                fetchCities={fetchCities}
                fetchUsers={fetchUsers}
                addLead={addLead}
                updateLead={updateLeadInfo}
                handleOk={handleOk}
                isLoading={isLoading}
                countries={countries}
                handleRoute={handleRoute}
                filteredCities={filteredCities}
                setFilteredCities={setFilteredCities}
            />

            <LeadsImport
                leadsImportForm={leadsImportForm}
                state={state}
                setState={setState}
                leadsBulkImport={leadsBulkImport}
            />

        </Main>
    )
}

export default LeadsData;
