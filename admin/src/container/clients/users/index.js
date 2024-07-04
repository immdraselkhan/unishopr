import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from "react-redux";
import { Main } from "../../styled";
import UserList from "./list";
import { fetchUsers, addUser, resetUserForm, travelerRequest, partnerRequest, fetchUsersToDownload } from "../../../redux/clients/users/actionCreator";
import { Form } from "antd";
import UserForm from "./form";
import {
    fetchCountries as utilitiesCountries,
    fetchUsers as fetchUtilitiesUsers,
} from "../../../redux/utilities/actionCreator";
import ServicesReqForm from "./servicerReqForm";
import UsersFilter from "./filter";
import { exportToCsv } from "../../../utility/utility";

const UsersData = () => {
    const dispatch = useDispatch();
    const isLoading = useSelector(state => state.utilities.loading);
    const users = useSelector(state => state.clientsUsers.users);
    const utilitiesUsers = useSelector(state => state.utilities.users);
    const countries = useSelector(state => state.utilities.countries);
    const getUsers = async (page, perPage) => await dispatch(fetchUsers({ page, perPage }));

    const [form] = Form.useForm()
    const [filter] = Form.useForm()
    const [state, setState] = useState({
        visible: false,
        reqModalVisible: false,
        showFilter: false,
        modalType: 'primary',
        user: null,
    });

    const initialFilters = {
        page: 1,
        perPage: 10,
        name: "",
        phone: "",
        email: "",
        gender: "",
        createdDateFrom: "",
        createdDateTo: "",
    }

    const [filters, setFilters] = useState(initialFilters);

    useEffect(() => {
        const fetchData = async () => {
            await dispatch(fetchUsers(filters))
        };
        fetchData().then(r => { });
    }, [filters]);

    useEffect(() => {
        const fetchData = async () => {
            await dispatch(utilitiesCountries())
        };
        fetchData().then(r => { });
    }, [dispatch]);

    const showModal = async (type) => {
        await setState({
            ...state,
            visible: true,
            modalType: type,
        });
        await dispatch(resetUserForm());
        await form.resetFields();
    };

    const showServiceReqModal = async (type, user) => {
        await setState({
            ...state,
            reqModalVisible: true,
            modalType: type,
            user: user,
        });
        await form.resetFields();
    }

    const handleOk = () => {
        setState({
            ...state,
            visible: false,
            reqModalVisible: false,
        });
    };

    const downloadUsers = async () => {
        await dispatch(fetchUsersToDownload(filters, (data) => exportToCsv("users.csv", data)))
    }

    return (
        <Main>
            <UserList
                state={state}
                setState={setState}
                isLoading={isLoading}
                filters={filters}
                setFilters={setFilters}
                users={users}
                getUsers={getUsers}
                showModal={showModal}
                showServiceReqModal={showServiceReqModal}
                downloadUsers={downloadUsers}
            />
            <UsersFilter
                filter={filter}
                state={state}
                setState={setState}
                initialFilters={initialFilters}
                filters={filters}
                setFilters={setFilters}
                users={utilitiesUsers}
                fetchUsers={fetchUtilitiesUsers}
                isLoading={isLoading}
            />
            <UserForm
                countries={countries}
                addUser={addUser}
                state={state}
                isLoading={isLoading}
                form={form}
                handleOk={handleOk}
            />
            <ServicesReqForm
                state={state}
                setState={setState}
                isLoading={isLoading}
                form={form}
                travelerRequest={travelerRequest}
                partnerRequest={partnerRequest}
                handleOk={handleOk}
            />
        </Main>
    )
}

export default UsersData;
