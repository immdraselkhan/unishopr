import React, {useEffect, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {Form} from "antd";
import UserList from "./list";
import UserForm from "./form";
import {Main} from "../../styled";
import {
    addUser,
    deleteUser,
    fetchUser,
    fetchUsers,
    resetUserForm,
    updateUser
} from "../../../redux/userManagement/users/actionCreator";
import {fetchRoles} from "../../../redux/utilities/actionCreator";

const UsersData = () => {
    const [form] = Form.useForm();
    const dispatch = useDispatch();
    const isLoading = useSelector(state => state.utilities.loading);
    const users = useSelector(state => state.umUsers.users);
    const user = useSelector(state => state.umUsers.user);
    const roles = useSelector(state => state.utilities.roles);
    const [state, setState] = useState({ visible: false });

    useEffect(() => {
        const fetchData = async () => {
            await dispatch(fetchUsers({page: 1, perPage: 10}));
            await dispatch(fetchRoles())
        };
        fetchData().then(r => {});
    }, [dispatch]);

    const getUsers = async (page, perPage) => await dispatch(fetchUsers({page, perPage}));
    const getUserInfo = (_id) => dispatch(fetchUser(_id, showModalEdit));

    const showModal = async type => {
        await setState({ ...state, visible: true });
        await dispatch(resetUserForm());
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
            <UserList
                state={state}
                setState={setState}
                isLoading={isLoading}
                showModal={showModal}
                users={users}
                getUsers={getUsers}
                getUserInfo={getUserInfo}
                deleteUser={deleteUser}
            />

            <UserForm
                form={form}
                state={state}
                isLoading={isLoading}
                handleOk={handleOk}
                user={user}
                roles={roles}
                addUser={addUser}
                updateUser={updateUser}
            />
        </Main>
    );
};

export default UsersData;
