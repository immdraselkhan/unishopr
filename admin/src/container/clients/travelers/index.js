import React, {useEffect, useState} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {Main} from "../../styled";
import TravelerList from "./list";
import { fetchTravelers, approveRequest } from "../../../redux/clients/travelers/actionCreator";
import TravelersFilter from "./filter";
import {fetchTravelers as fetchUtilitiesTravelers} from "../../../redux/utilities/actionCreator";
import {Form} from "antd";

const TravelersData = () => {
    const dispatch = useDispatch();
    const isLoading = useSelector(state => state.utilities.loading);
    const travelers = useSelector(state => state.clientsTravelers.travelers);
    const utilitiesTravelers = useSelector(state => state.utilities.travelers);

    const [filter] = Form.useForm()
    const [state, setState] = useState({
        visible: false,
        showFilter: false,
        reqModalVisible: false,
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
    }

    const [filters, setFilters] = useState(initialFilters);

    useEffect(() => {
        const fetchData = async () => {
            await dispatch(fetchTravelers(filters))
        };
        fetchData().then(r => {});
    }, [filters]);

    const getTravelers = async (page, perPage) => await dispatch(fetchTravelers({page, perPage}));

    return (
        <Main>
            <TravelerList
                state={state}
                setState={setState}
                isLoading={isLoading}
                filters={filters}
                setFilters={setFilters}
                travelers={travelers}
                getTravelers={getTravelers}
                approveRequest={approveRequest}
            />
            <TravelersFilter
                filter={filter}
                state={state}
                setState={setState}
                initialFilters={initialFilters}
                filters={filters}
                setFilters={setFilters}
                users={utilitiesTravelers}
                fetchUsers={fetchUtilitiesTravelers}
                isLoading={isLoading}
            />
        </Main>
    )
}

export default TravelersData;
