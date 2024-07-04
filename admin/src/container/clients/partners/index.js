import React, {useEffect, useState} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {Main} from "../../styled";
import PartnerList from "./list";
import { fetchPartners, approveRequest } from "../../../redux/clients/partners/actionCreator";
import PartnersFilter from "./filter";
import {fetchPartners as fetchUtilitiesPartners} from "../../../redux/utilities/actionCreator";
import {Form} from "antd";

const PartnersData = () => {
    const dispatch = useDispatch();
    const isLoading = useSelector(state => state.utilities.loading);
    const partners = useSelector(state => state.clientsPartners.partners);
    const utilitiesPartners = useSelector(state => state.utilities.partners);

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
            await dispatch(fetchPartners(filters))
        };
        fetchData().then(r => {});
    }, [filters]);

    const getPartners = async (page, perPage) => await dispatch(fetchPartners({page, perPage}));

    return (
        <Main>
            <PartnerList
                state={state}
                setState={setState}
                isLoading={isLoading}
                filters={filters}
                setFilters={setFilters}
                partners={partners}
                getPartners={getPartners}
                approveRequest={approveRequest}
            />
            <PartnersFilter
                filter={filter}
                state={state}
                setState={setState}
                initialFilters={initialFilters}
                filters={filters}
                setFilters={setFilters}
                users={utilitiesPartners}
                fetchUsers={fetchUtilitiesPartners}
                isLoading={isLoading}
            />
        </Main>
    )
}

export default PartnersData;
