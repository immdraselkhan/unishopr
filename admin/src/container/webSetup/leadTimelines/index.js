import React, {useState, useEffect} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {Main} from "../../styled";
import {Form} from "antd";
import LeadTimelineList from "./list";
import LeadTimelineForm from "./form";
import {
    addLeadTimeline,
    fetchLeadTimelines,
    fetchLeadTimeline,
    updateLeadTimeline,
    deleteLeadTimeline,
    resetLeadTimelineForm
} from "../../../redux/webSetup/leadTimeline/actionCreator";
import {fetchCountries as utilitiesCountries} from "../../../redux/utilities/actionCreator";

const LeadTimelinesData = () => {
    const dispatch = useDispatch();
    const isLoading = useSelector(state => state.utilities.loading);
    const leadTimelines = useSelector(state => state.wsLeadTimelines.leadTimelines);
    const leadTimeline = useSelector(state => state.wsLeadTimelines.leadTimeline);
    const [form] = Form.useForm()

    const [state, setState] = useState({
        visible: false,
        uploading: false,
    });

    useEffect(() => {
        const fetchData = async () => {
            await dispatch(fetchLeadTimelines({page: 1, perPage: 10}))
        };
        fetchData().then(r => {});
    }, [dispatch]);

    useEffect(() => {
        const fetchData = async () => {
            await dispatch(utilitiesCountries())
        };
        fetchData().then(r => {});
    }, []);

    const getLeadTimelines = async (page, perPage) => await dispatch(fetchLeadTimelines({page, perPage}));
    const getLeadTimelineInfo = (_id) => dispatch(fetchLeadTimeline(_id, showModalEdit));
    const showModal = async type => {
        await setState({ ...state, visible: true });
        await dispatch(resetLeadTimelineForm());
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
            <LeadTimelineList
                state={state}
                setState={setState}
                showModal={showModal}
                isLoading={isLoading}
                leadTimelines={leadTimelines}
                getLeadTimelines={getLeadTimelines}
                getLeadTimelineInfo={getLeadTimelineInfo}
                deleteLeadTimeline={deleteLeadTimeline}
            />

            <LeadTimelineForm
                form={form}
                state={state}
                leadTimeline={leadTimeline}
                addLeadTimeline={addLeadTimeline}
                updateLeadTimeline={updateLeadTimeline}
                handleOk={handleOk}
                isLoading={isLoading}
            />
        </Main>
    )
}

export default LeadTimelinesData;
