import React, {useState, useEffect} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {Main} from "../../styled";
import {Form} from "antd";
import LocationList from "./list";
import LocationForm from "./form";
import {
    addLocation,
    fetchLocations,
    fetchLocation,
    updateLocation,
    deleteLocation,
    resetLocationForm} from "../../../redux/webSetup/locations/actionCreator";

import {fetchCountries, fetchCities} from "../../../redux/utilities/actionCreator";

const LocationData = () => {
    const dispatch = useDispatch();
    const isLoading = useSelector(state => state.utilities.loading);
    const locations = useSelector(state => state.wsLocations.locations);
    const location = useSelector(state => state.wsLocations.location);
    const countries = useSelector(state => state.utilities.countries);
    const [form] = Form.useForm()

    const [state, setState] = useState({
        visible: false,
        modalType: 'primary',
        colorModal: false,
        uploading: false,
    });

    useEffect(() => {
        const fetchData = async () => {
            await dispatch(fetchLocations({page: 1, perPage: 10}))
        };
        fetchData().then(r => {});
    }, []);

    useEffect(() => {
        const fetchData = async () => {
            await dispatch(fetchCountries())
        };
        fetchData().then(r => {});
    }, []);

    const getLocations = async (page, perPage) => await dispatch(fetchLocations({page, perPage}));
    const getLocationInfo = async (_id) => dispatch(fetchLocation(_id, showModalEdit));

    const getCities = async (queries) => await dispatch(fetchCities(queries));
    const showModal = async type => {
        await setState({
            ...state,
            visible: true,
            modalType: type,
        });
        await dispatch(resetLocationForm());
        await form.resetFields();
    };

    const showModalEdit = async () => {
        await setState({
            ...state,
            visible: true,
            modalType: "primary",
        });
        await form.resetFields();
    };

    const handleOk = () => {
        setState({
            ...state,
            visible: false,
            colorModal: false,
        });
    };
    return (
        <Main>
            <LocationList
                state={state}
                setState={setState}
                showModal={showModal}
                isLoading={isLoading}
                locations={locations}
                getLocations={getLocations}
                getLocationInfo={getLocationInfo}
                deleteLocation={deleteLocation}
                getCities={getCities}/>

            <LocationForm
                form={form}
                state={state}
                location={location}
                addLocation={addLocation}
                updateLocation={updateLocation}
                getCities={getCities}
                countries={countries}
                handleOk={handleOk}
                isLoading={isLoading}/>
        </Main>
    )
}

export default LocationData;
