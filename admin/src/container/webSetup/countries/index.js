import React, {useState, useEffect} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {Main} from "../../styled";
import {Form} from "antd";
import CountryList from "./list";
import CountryForm from "./form";
import {
    addCountry,
    fetchCountries,
    fetchCountry,
    updateCountry,
    deleteCountry,
    resetCountryForm} from "../../../redux/webSetup/countries/actionCreator";

const CountriesData = () => {
    const dispatch = useDispatch();
    const isLoading = useSelector(state => state.utilities.loading);
    const countries = useSelector(state => state.wsCountries.countries);
    const country = useSelector(state => state.wsCountries.country);
    const [form] = Form.useForm()

    const [state, setState] = useState({
        visible: false,
        modalType: 'primary',
        colorModal: false,
        uploading: false,
        photo: null
    });

    useEffect(() => {
        const fetchData = async () => {
            await dispatch(fetchCountries({page: 1, perPage: 10}))
        };
        fetchData().then(r => {});
    }, []);

    const getCountries = async (page, perPage) => await dispatch(fetchCountries({page, perPage}));
    const getCountryInfo = (_id) => dispatch(fetchCountry(_id, showModalEdit));
    const showModal = async type => {
        await setState({
            ...state,
            visible: true,
            modalType: type,
            photo: null,
            uploading: false
        });
        await dispatch(resetCountryForm());
        await form.resetFields();
    };

    const showModalEdit = async (country) => {
        await setState({
            ...state,
            visible: true,
            modalType: "primary",
            uploading: false,
            photo: country.flag
        });
        await form.resetFields();
    };

    const handleOk = () => {
        setState({
            ...state,
            visible: false,
            colorModal: false,
            photo: null,
            uploading: false
        });
    };

    return (
        <Main>
            <CountryList
                state={state}
                setState={setState}
                showModal={showModal}
                isLoading={isLoading}
                countries={countries}
                getCountries={getCountries}
                getCountryInfo={getCountryInfo}
                deleteCountry={deleteCountry}/>

            <CountryForm
                form={form}
                state={state}
                setState={setState}
                country={country}
                addCountry={addCountry}
                updateCountry={updateCountry}
                handleOk={handleOk}
                isLoading={isLoading}/>
        </Main>
    )
}

export default CountriesData;
