import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from "react-redux";
import { Main } from "../../styled";
import { Form } from "antd";
import TravelList from "./list";
import TravelForm from "./form";
import {
    addTravel,
    fetchTravels,
    fetchTravel,
    updateTravel,
    deleteTravel,
    resetTravelForm,
    fetchTravelLeads,
    addTravelLead,
    travelResolve
} from "../../../redux/workspace/travels/actionCreator";
import { fetchCities, fetchUsers, fetchUser } from "../../../redux/utilities/actionCreator";
import TravelLeads from "./leads";
import TravelLeadsForm from "./leadsForm";
import TravelsFilter from "./filter";

const TravelsData = () => {
    const dispatch = useDispatch();
    const isLoading = useSelector(state => state.utilities.loading);
    const travels = useSelector(state => state.workspaceTravels.travels);
    const travel = useSelector(state => state.workspaceTravels.travel);
    const travelLeads = useSelector(state => state.workspaceTravels.travelLeads);
    const users = useSelector(state => state.utilities.users);
    const cities = useSelector(state => state.utilities.cities);

    const [state, setState] = useState({
        visible: false,
        leadVisible: false,
        leadFormVisible: false,
        travelId: null,
        uploading: false,
        user: { _id: null }
    });

    const [form] = Form.useForm()
    const [filter] = Form.useForm()

    const initialFilters = {
        page: 1,
        perPage: 10,
        from: "",
        to: "",
        users: "",
        travelDate: "",
    };

    const [filters, setFilters] = useState(initialFilters);
    const [filteredCities, setFilteredCities] = useState([])

    useEffect(() => {
        const fetchData = async () => {
            await dispatch(fetchTravels(filters));
            await dispatch(fetchCities());
        };
        fetchData().then(r => { });
    }, [filters]);

    const getTravels = async (page, perPage) => await dispatch(fetchTravels({ page, perPage }));
    const getTravelInfo = (_id, action = null) => dispatch(fetchTravel(_id, action ? action : showModalEdit));
    const getTravelLeads = (_id) => dispatch(fetchTravelLeads(_id, () => setState({ ...state, leadFormVisible: true, travelId: _id })));
    const showModal = async type => {
        await setState({ ...state, visible: true, user: { _id: null } });
        await dispatch(resetTravelForm());
        await form.resetFields();
    };

    const showModalEdit = async (cb) => {
        await setState({ ...state, visible: true, user: cb.user });
        await form.resetFields();
    };

    const handleOk = () => {
        setState({ ...state, visible: false, user: { _id: null } });
    };

    const handleLeadOk = () => {
        setState({ ...state, leadVisible: false, lead: { _id: null } })
    };

    const handleTravelLeadOk = () => {
        setState({ ...state, leadFormVisible: false, travelId: null })
    };

    const handleRoute = (value) => {
        const currentCity = cities.filter(city => city._id == value)
        setFilteredCities(cities.filter(city => city.country._id !== currentCity[0].country._id))
    }

    return (
        <Main>
            <TravelList
                filters={filters}
                setFilters={setFilters}
                state={state}
                setState={setState}
                showModal={showModal}
                isLoading={isLoading}
                travels={travels}
                getTravels={getTravels}
                getTravelInfo={getTravelInfo}
                deleteTravel={deleteTravel}

            />

            <TravelForm
                form={form}
                state={state}
                setState={setState}
                travel={travel}
                addTravel={addTravel}
                updateTravel={updateTravel}
                handleOk={handleOk}
                isLoading={isLoading}
                cities={cities}
                fetchUser={fetchUser}
                handleRoute={handleRoute}
                filteredCities={filteredCities}
                setFilteredCities={setFilteredCities}
            />

            <TravelLeads
                state={state}
                setState={setState}
                travel={travel}
                getTravelLeads={getTravelLeads}
                isLoading={isLoading}
                handleOk={handleLeadOk}
                travelResolve={travelResolve}
            />

            <TravelLeadsForm
                state={state}
                setState={setState}
                travelLeads={travelLeads}
                isLoading={isLoading}
                addTravelLead={addTravelLead}
                handleOk={handleTravelLeadOk}
            />

            <TravelsFilter
                filter={filter}
                state={state}
                setState={setState}
                setFilters={setFilters}
                filters={filters}
                fetchUsers={fetchUsers}
                fetchCities={fetchCities}
                users={users}
                cities={cities}
                isLoading={isLoading}
                initialFilters={initialFilters}
            />
        </Main>
    )
}

export default TravelsData;
