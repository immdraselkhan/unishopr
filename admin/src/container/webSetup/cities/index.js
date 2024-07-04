import React, {useState, useEffect} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {Main} from "../../styled";
import {Form} from "antd";
import CityList from "./list";
import CityForm from "./form";
import {
    addCity,
    fetchCities,
    fetchCity,
    updateCity,
    deleteCity,
    resetCityForm
} from "../../../redux/webSetup/cities/actionCreator";
import {fetchCountries as utilitiesCountries} from "../../../redux/utilities/actionCreator";

const CitiesData = () => {
    const dispatch = useDispatch();
    const isLoading = useSelector(state => state.utilities.loading);
    const cities = useSelector(state => state.wsCities.cities);
    const city = useSelector(state => state.wsCities.city);
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
            await dispatch(fetchCities({page: 1, perPage: 10}))
        };
        fetchData().then(r => {});
    }, []);

    useEffect(() => {
        const fetchData = async () => {
            await dispatch(utilitiesCountries())
        };
        fetchData().then(r => {});
    }, []);

    const getCities = async (page, perPage) => await dispatch(fetchCities({page, perPage}));
    const getCityInfo = (_id) => dispatch(fetchCity(_id, showModalEdit));
    const showModal = async type => {
        await setState({
            ...state,
            visible: true,
            modalType: type,
        });
        await dispatch(resetCityForm());
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
            <CityList
                state={state}
                setState={setState}
                showModal={showModal}
                isLoading={isLoading}
                cities={cities}
                getCities={getCities}
                getCityInfo={getCityInfo}
                deleteCity={deleteCity}/>

            <CityForm
                form={form}
                state={state}
                city={city}
                addCity={addCity}
                updateCity={updateCity}
                countries={countries}
                handleOk={handleOk}
                isLoading={isLoading}/>
        </Main>
    )
}

export default CitiesData;
