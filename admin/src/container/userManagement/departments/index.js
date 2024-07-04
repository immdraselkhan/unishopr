import React, {useState, useEffect} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {Main} from "../../styled";
import {Form} from "antd";
import DepartmentList from "./list";
import DepartmentForm from "./form";
import {
    addDepartment,
    fetchDepartments,
    fetchDepartment,
    updateDepartment,
    deleteDepartment,
    resetDepartmentForm
} from "../../../redux/userManagement/departments/actionCreator";

const DepartmentsData = () => {
    const dispatch = useDispatch();
    const isLoading = useSelector(state => state.utilities.loading);
    const departments = useSelector(state => state.umDepartments.departments);
    const department = useSelector(state => state.umDepartments.department);
    const [form] = Form.useForm()

    const [state, setState] = useState({
        visible: false,
        uploading: false,
    });

    useEffect(() => {
        const fetchData = async () => {
            await dispatch(fetchDepartments({page: 1, perPage: 10}))
        };
        fetchData().then(r => {});
    }, [dispatch]);

    const getDepartments = async (page, perPage) => await dispatch(fetchDepartments({page, perPage}));
    const getDepartmentInfo = (_id) => dispatch(fetchDepartment(_id, showModalEdit));
    const showModal = async type => {
        await setState({ ...state, visible: true });
        await dispatch(resetDepartmentForm());
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
            <DepartmentList
                state={state}
                setState={setState}
                showModal={showModal}
                isLoading={isLoading}
                departments={departments}
                getDepartments={getDepartments}
                getDepartmentInfo={getDepartmentInfo}
                deleteDepartment={deleteDepartment}
            />

            <DepartmentForm
                form={form}
                state={state}
                department={department}
                addDepartment={addDepartment}
                updateDepartment={updateDepartment}
                handleOk={handleOk}
                isLoading={isLoading}
            />
        </Main>
    )
}

export default DepartmentsData;
