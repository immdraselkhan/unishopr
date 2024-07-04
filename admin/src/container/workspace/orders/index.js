import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from "react-redux";
import { Main } from "../../styled";
import OrderList from "./list";
import { Form } from "antd";
import {
    fetchOrders,
    fetchOrder,
    resetOrderForm,
    updateOrder,
    fetchOrdersToDownload
} from "../../../redux/workspace/orders/actionCreator";
import StatusForm from "./statusForm";
import Invoice from "./invoice";
import OrdersFilter from "./filter";
import { fetchUsers } from "../../../redux/utilities/actionCreator";
import { addLeadUpdate, fetchLead, updateLead } from "../../../redux/workspace/leads/actionCreator";
import LeadUpdate from "../leads/update";
import LeadInvoice from "../leads/invoice"
import Additional from "../leads/additional";
import { exportToCsv } from "../../../utility/utility";
import PaymentInvoice from "../payments/invoice"

const OrdersData = () => {
    const dispatch = useDispatch();
    const [form] = Form.useForm()
    const isLoading = useSelector(state => state.utilities.loading);
    const orders = useSelector(state => state.workspaceOrders.orders);
    const order = useSelector(state => state.workspaceOrders.order);
    const lead = useSelector(state => state.workspaceLeads.lead);
    const users = useSelector(state => state.utilities.users);
    const [filter] = Form.useForm()

    const [state, setState] = useState({
        filterVisible: false,
        visible: false,
        showInvoice: false
    });

    const [leadState, setLeadState] = useState({ showInvoice: false })
    const [additionalState, setAdditionalState] = useState({ additionalVisible: false })
    const [paymentState, setPaymentState] = useState({ invoiceModalVisible: false, invoiceId: null, })

    const initialFilters = {
        page: 1,
        perPage: 10,
        userIds: "",
        status: "",
        invoiceId: "",
        invoiceNo: "",
        orderId: "",
        leadId: "",
        sort: "",
        orderDateFrom: "",
        orderDateTo: "",
    }
    const [filters, setFilters] = useState(initialFilters);

    useEffect(() => {
        const fetchData = async () => {
            await dispatch(fetchOrders(filters))
        };
        fetchData().then(r => { });
    }, [filters]);

    const getOrders = async (page, perPage) => await dispatch(fetchOrders({ page, perPage }));
    const getOrderInfo = (order) => dispatch(fetchOrder(order, showModalEdit));
    const getLeadForUpdate = async (_id) => dispatch(fetchLead(_id, showUpdateModal));
    const getLeadForAdditional = async (_id) => dispatch(fetchLead(_id, showAdditionalModal));

    const showModal = async () => {
        await setState({ ...state, visible: true });
        await dispatch(resetOrderForm());
        await form.resetFields();
    };

    const showModalEdit = async (order) => {
        await setState({ ...state, visible: true });
        await form.resetFields();
    };

    const showUpdateModal = async lead => {
        await setState({ ...state, leadUpdateVisible: true, lead });
    }

    const handleOk = () => {
        setState({ ...state, visible: false, showInvoice: false });
        setPaymentState({ ...paymentState, invoiceModalVisible: false })
    };

    const showAdditionalModal = async lead => {
        await setAdditionalState({ ...additionalState, additionalVisible: true, additional: lead.additional });
    }

    const showPaymentInvoiceModal = async (key) => {
        await setPaymentState({
            ...paymentState,
            invoiceModalVisible: true,
            invoiceId: key,
        });
        await form.resetFields();
    }

    const handleUpdateOk = () => {
        setState(
            {
                ...state,
                visible: false,
                lead: null,
                leadUpdateVisible: false,
            });
    }

    const downloadOrders = async () => {
        await dispatch(fetchOrdersToDownload(filters, (data) => exportToCsv("orders.csv", data)))
    }

    return (
        <Main>
            <OrderList
                state={state}
                setState={setState}
                showModal={showModal}
                showInvoice={(order) => dispatch(fetchOrder(order, () => setState({ ...state, showInvoice: true })))}
                isLoading={isLoading}
                getOrders={getOrders}
                getOrderInfo={getOrderInfo}
                filters={filters}
                setFilters={setFilters}
                handleOk={handleOk}
                orders={orders}
                showLeadInvoice={(leadId) => dispatch(fetchLead(leadId, () => setLeadState({ ...leadState, showInvoice: true })))}
                downloadOrders={downloadOrders}
                getLeadForUpdate={getLeadForUpdate}
                showPaymentInvoiceModal={showPaymentInvoiceModal}
            />

            <LeadUpdate
                state={state}
                lead={lead}
                handleOk={handleUpdateOk}
                updateLead={addLeadUpdate}
                isLoading={isLoading}
            />

            <LeadInvoice
                state={leadState}
                lead={lead}
                updateLead={updateLead}
                // getLeadInfo={getLeadInfo}
                getLeadForUpdate={getLeadForUpdate}
                getLeadForAdditional={getLeadForAdditional}
                handleOk={() => setLeadState({ ...leadState, showInvoice: false })}
                isLoading={isLoading}
            />

            <StatusForm
                form={form}
                state={state}
                setState={setState}
                order={order}
                updateOrder={updateOrder}
                handleOk={handleOk}
                isLoading={isLoading}
            />

            <Invoice
                state={state}
                setState={setState}
                order={order}
                handleOk={handleOk}
                isLoading={isLoading}
            />

            <Additional
                state={additionalState}
                lead={lead}
                handleOk={() => setAdditionalState({ ...additionalState, additionalVisible: false, lead: { _id: null } })}
                updateLead={updateLead}
                isLoading={isLoading}
            />

            <OrdersFilter
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

            <PaymentInvoice
                state={paymentState}
                setState={setState}
                invoiceId={paymentState.invoiceId}
                handleOk={handleOk}
                isLoading={isLoading}
            />
        </Main>
    )
}

export default OrdersData;
