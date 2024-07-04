import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from "react-redux";
import { Main } from "../../styled";
import PaymentList from "./list";
import PaymentsFilter from "./filter";
import { fetchPayments, fetchPaymentsToDownload } from "../../../redux/workspace/payments/actionCreator";
import { fetchUsers } from '../../../redux/utilities/actionCreator';
import { Form } from "antd";
import InfoReq from "./infoReq";
import Invoice from "./invoice";
import { exportToCsv } from "../../../utility/utility";

const PaymentsData = () => {
    const dispatch = useDispatch();
    const isLoading = useSelector(state => state.utilities.loading);
    const payments = useSelector(state => state.workspacePayments.payments);
    const users = useSelector(state => state.utilities.users);
    const [filter] = Form.useForm()
    const [form] = Form.useForm()

    const [state, setState] = useState({
        filterVisible: false,
        modalType: 'primary',
        colorModal: false,
        uploading: false,
        paymentDateFrom: "",
        paymentDateTo: "",
        visible: false,
        reqModalVisible: false,
        refundModalVisible: false,
        invoiceModalVisible: false,
        payment: null,
        invoiceId: null,
    });

    const initialFilters = {
        page: 1,
        perPage: 10,
        userIds: "",
        status: "",
        invoiceIds: "",
        invoiceNos: "",
        sort: "",
        transactionIds: "",
    }
    const [filters, setFilters] = useState(initialFilters);
    useEffect(() => {
        const fetchData = async () => {
            await dispatch(fetchPayments(filters))
        };
        fetchData().then(r => { });
    }, [filters]);
    const getPayments = async (page, perPage) => await dispatch(fetchPayments({ page, perPage }));

    const showInfoReqModal = async (key) => {
        await setState({
            ...state,
            reqModalVisible: true,
            payment: key,
        });
        await form.resetFields();
    }

    const showInvoiceModal = async (key) => {
        await setState({
            ...state,
            invoiceModalVisible: true,
            invoiceId: key,
        });
        await form.resetFields();
    }

    const handleOk = () => {
        setState({
            ...state,
            visible: false,
            reqModalVisible: false,
            refundModalVisible: false,
            invoiceModalVisible: false,
        });
    };

    const downloadPayments = async () => {
        await dispatch(fetchPaymentsToDownload(filters, (data) => exportToCsv("payments.csv", data)))
    }

    return (
        <Main>
            <PaymentList
                state={state}
                setState={setState}
                filters={filters}
                setFilters={setFilters}
                isLoading={isLoading}
                payments={payments}
                showInfoReqModal={showInfoReqModal}
                showInvoiceModal={showInvoiceModal}
                downloadPayments={downloadPayments}
            />

            <PaymentsFilter
                filter={filter}
                state={state}
                setState={setState}
                isLoading={isLoading}
                initialFilters={initialFilters}
                setFilters={setFilters}
                filters={filters}
                fetchUsers={fetchUsers}
                users={users}
            />

            <InfoReq
                state={state}
                setState={setState}
                isLoading={isLoading}
                handleOk={handleOk}
                payment={state.payment}
            />

            <Invoice
                state={state}
                setState={setState}
                invoiceId={state.invoiceId}
                handleOk={handleOk}
                isLoading={isLoading}
            />
        </Main>
    )
}

export default PaymentsData;
