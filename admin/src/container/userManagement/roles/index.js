import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Form } from 'antd';
import RoleForm from "./form";
import RoleList from "./list";
import { Main } from '../../styled';
import {
    addRole,
    fetchRoles,
    deleteRole,
    fetchRole,
    updateRole,
    resetRoleForm
} from '../../../redux/userManagement/roles/actionCreator';

const RolesData = () => {
    const dispatch = useDispatch();
    const isLoading = useSelector(state => state.utilities.loading);
    const roles = useSelector(state => state.umRoles.roles);
    const role = useSelector(state => state.umRoles.role);
    const [form] = Form.useForm();

    const [state, setState] = useState({ visible: false });

    useEffect(() => {
        const fetchData = async () => {
            await dispatch(fetchRoles({page: 1, perPage: 10}))
        };
        fetchData().then(r => {});
    }, [dispatch]);

    const getRoles = async (page, perPage) => await dispatch(fetchRoles({page, perPage}));
    const roleInfo = (_id) => dispatch(fetchRole(_id, showModalEdit));

    const showModal = async type => {
        await setState({ ...state, visible: true });
        await dispatch(resetRoleForm());
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
            <RoleForm
                form={form}
                state={state}
                role={role}
                addRole={addRole}
                updateRole={updateRole}
                handleOk={handleOk}
                isLoading={isLoading}
            />

            <RoleList
                state={state}
                setState={setState}
                showModal={showModal}
                isLoading={isLoading}
                roles={roles}
                getRoles={getRoles}
                roleInfo={roleInfo}
                deleteRole={deleteRole}
            />
        </Main>
    );
};

export default RolesData;
