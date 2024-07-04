import React, { Suspense, useEffect, useState } from "react";
import FeatherIcon from 'feather-icons-react';
import { useDispatch, useSelector } from "react-redux";
import { Button } from "../../../components/buttons/buttons";
import { Row, Col, Form, Input, Modal, Select, Skeleton, } from "antd";
import { Constants } from "../../../config/constants";
import TextArea from "antd/es/input/TextArea";
import { Alert } from "../../../services/alertService";
import { uploadFile, deleteFile } from "../../../utility/fileUpload";
import { fetchCities, scrape } from "../../../redux/utilities/actionCreator";
import { Cards } from "../../../components/cards/frame/cards-frame";
import { UserCard } from "../../styled";
import Heading from "../../../components/heading/heading";
import { Link } from "react-router-dom";
import { fetchUsers } from "../../../redux/utilities/actionCreator";

const LeadForm = (
    {
        setState,
        cities,
        form,
        state,
        lead,
        addLead,
        updateLead,
        isLoading,
        handleOk,
        countries,
        handleRoute,
        filteredCities,
        setFilteredCities
    }) => {
    const dispatch = useDispatch()
    const layout = { labelCol: { span: 8 }, wrapperCol: { span: 16 } }
    const [user, setUser] = useState({ _id: null });
    const scrapeData = useSelector(state => state.utilities.scrape);

    useEffect(() => {
        if (lead && lead._id) {
            setUser(lead.user._id)
        }
    }, [lead])

    useEffect(() => {
        form.setFieldsValue({
            name: scrapeData?.title ? scrapeData?.title : "",
            photo: scrapeData?.photo ? scrapeData?.photo : ""
        })
    }, [scrapeData, form]);

    const validateMessages = {
        required: '${label} is required!',
    };

    const getConvertedCost = (data, amount) => {
        const country = countries.find((item) => item.currencySymbol === data.currency);
        if (country && lead.currency === "BDT") {
            return parseInt((amount * country.currencyFromBDT).toFixed(2))
        }
        return 0;
    }

    const handleSubmit = async (data) => {
        const leadData = {
            url: data.url,
            name: data.name,
            photo: data.photo,
            route: {
                fromCityId: data.routeFrom,
                toCityId: data.routeTo
            },
            weight: data.weight,
            foreignCurrency: data.currency,
            foreignPrice: data.price,
            // cost: parseInt((data.cost * currencyFromDollar).toFixed(2)),
            // price: parseInt((data.price * currencyFromDollar).toFixed(2)),
            cost: getConvertedCost(data, data.cost),
            price: getConvertedCost(data, data.price),
            quantity: data.quantity,
            isBoxNeeded: data.isBoxNeeded === "1",
            isUrgent: data.isUrgent === "1",
            description: data.description
        }

        if (lead._id) {
            Object.assign(leadData, { _id: lead._id });
            await updateLead(leadData, handleOk);
            await setUser({ _id: null });
        } else {
            Object.assign(leadData, { user });
            await addLead(leadData, handleOk);
            await setUser({ _id: null });
        }
    };

    // const [filteredCities, setFilteredCities] = useState([])

    // const handleRoute = (value) => {
    //     dispatch(fetchCities(value))
    //     const currentCity = cities.filter(city => city._id === value)
    //     setFilteredCities(cities.filter(city => city.country._id !== currentCity[0].country._id))
    // }

    const scraper = async (url) => {
        await dispatch(scrape(url))
    }

    const footerButtons = [
        // <Button
        //     form="myForm"
        //     key="scrape"
        //     htmlType="button"
        //     type="info"
        //     disabled={isLoading}
        //     size="medium"
        //     onClick={() => scraper(lead.url)}
        // >
        //     {isLoading ? 'Loading...' : 'Scrape'}
        // </Button>,
        <Button
            form="myForm"
            key="submit"
            htmlType="submit"
            type="primary"
            disabled={isLoading}
            size="medium"
        >
            {isLoading ? 'Loading...' : 'Submit'}
        </Button>
    ];

    return (
        <Col>
            <Modal
                type="primary"
                title="Leads Form"
                visible={state.visible}
                onCancel={async () => {
                    await setUser({ _id: null });
                    await handleOk();
                }}
                footer={footerButtons}
            >
                <Form
                    {...layout}
                    name={'leadForm'}
                    form={form}
                    id={'myForm'}
                    validateMessages={validateMessages}
                    onFinish={handleSubmit}
                >

                    {user?._id ? (
                        <Suspense
                            fallback={
                                <Cards headless>
                                    <Skeleton avatar active />
                                </Cards>
                            }
                        >
                            <UserCard>
                                <div className="card user-card">
                                    <Cards headless>
                                        <figure>
                                            {/* <img src={user?.photo ? Constants.S3_BASE_URL(user.photo) : 'https://cdn0.iconfinder.com/data/icons/user-pictures/100/matureman1-512.png'} alt="" /> */}
                                            <img src={user?.photo ? user.photo : 'https://cdn0.iconfinder.com/data/icons/user-pictures/100/matureman1-512.png'} alt="" />
                                        </figure>
                                        <figcaption>
                                            <div className="card__content">
                                                <Heading className="card__name" as="h6">
                                                    <Link to="#">{`${user?.firstName || lead?.user?.firstName} ${user?.lastName || lead?.user?.lastName}`}</Link>
                                                </Heading>
                                                <p className="card__designation no-margin">
                                                    {user?.phone?.country?.code}{user?.phone?.phone}
                                                    <br />
                                                    {user?.email}
                                                </p>
                                            </div>
                                        </figcaption>
                                    </Cards>
                                </div>
                            </UserCard>
                        </Suspense>
                    ) : (
                        <Form.Item
                            name="user"
                            label="User Email"
                            rules={[{ required: true }]}
                        >
                            <Input
                                placeholder="User Email"
                                onBlur={({ target }) => target.value ? dispatch(fetchUsers({ email: target.value }, (cb) => setUser(cb[0]))) : null}
                            />
                        </Form.Item>
                    )}
                    <Form.Item
                        name="url"
                        rules={[{ required: true }]}
                        initialValue={lead?.url ? lead.url : null}
                        label={lead.url ? <span><a target="_blank" href={lead.url}>Url</a></span> : "Url"}
                    >
                        <Input
                            disabled={lead?.url ? true : false}
                            className="pointer"
                            placeholder="Url"
                        />
                    </Form.Item>
                    <Form.Item
                        name="name"
                        rules={[{ required: true }]}
                        initialValue={lead?.name ? lead.name : null}
                        label="Name">
                        <Input placeholder="Name" />
                    </Form.Item>

                    <Form.Item
                        name="photo"
                        initialValue={lead?.photo ? lead.photo : null}
                        label="Photo">
                        <Input placeholder="Photo" />
                    </Form.Item>
                    <Form.Item
                        name="currency"
                        initialValue={lead?.currency ? lead?.currency : ''}
                        rules={[{ required: true }]}
                        label="Currency">
                        <Select>
                            <Select.Option value="">Currency</Select.Option>
                            {countries.length && countries.map((country) => (
                                <Select.Option key={country._id} value={country.currencySymbol}>{country.currencySymbol}</Select.Option>
                            ))}
                        </Select>
                    </Form.Item>
                    <Form.Item
                        name="cost"
                        rules={[{ required: true }]}
                        initialValue={lead?.cost ? lead.cost : null}
                        label="Cost">
                        <Input type={"number"} placeholder="Cost" />
                    </Form.Item>
                    <Form.Item
                        name="price"
                        rules={[{ required: true }]}
                        initialValue={lead?.price ? lead.price : null}
                        label="Price">
                        <Input type={"number"} placeholder="Price" />
                    </Form.Item>
                    <Form.Item
                        name="quantity"
                        rules={[{ required: true }]}
                        initialValue={lead?.quantity ? lead.quantity : null}
                        label="Quantity">
                        <Input type={"number"} placeholder="Quantity" />
                    </Form.Item>
                    <Form.Item
                        name="weight"
                        rules={[{ required: false }]}
                        initialValue={lead?.weight ? lead.weight : null}
                        label="Weight (kg)">
                        <Input type={"number"} placeholder="Weight" />
                    </Form.Item>
                    <Form.Item
                        name="routeFrom"
                        initialValue={lead?.route?.from?._id ? lead?.route?.from?._id : null}
                        rules={[{ required: true }]}
                        label="From">
                        <Select onChange={handleRoute}>
                            <Select.Option value="">City</Select.Option>
                            {cities.length && cities.map((city) => (
                                <Select.Option key={city._id} value={city._id}>{city.name}</Select.Option>
                            ))}
                        </Select>
                    </Form.Item>
                    {
                        filteredCities.length !== 0 ?
                            <Form.Item
                                name="routeTo"
                                initialValue={lead?.route?.to?._id ? lead?.route?.to?._id : null}
                                rules={[{ required: true }]}
                                label="To">
                                <Select>
                                    <Select.Option value="">City</Select.Option>
                                    {filteredCities?.length && filteredCities?.map((city) => (
                                        <Select.Option key={city._id} value={city._id}>{city.name}</Select.Option>
                                    ))}
                                </Select>
                            </Form.Item>
                            :
                            <Form.Item
                                name="routeTo"
                                initialValue={lead?.route?.to?._id ? lead?.route?.to?._id : null}
                                rules={[{ required: true }]}
                                label="To">
                                <Select>
                                    <Select.Option value="">City</Select.Option>
                                    {cities.length && cities.map((city) => (
                                        (city.country.name !== lead?.route?.from?.country?.name) && <Select.Option key={city._id} value={city._id}>{city.name}</Select.Option>
                                    ))}
                                </Select>
                            </Form.Item>
                    }
                    <Form.Item
                        name="isBoxNeeded"
                        rules={[{ required: false }]}
                        initialValue={lead?.isBoxNeeded ? '1' : '0'}
                        label="With Box?">
                        <Select>
                            <Select.Option value="">Select</Select.Option>
                            <Select.Option value="1">YES</Select.Option>
                            <Select.Option value="0">NO</Select.Option>
                        </Select>
                    </Form.Item>
                    <Form.Item
                        name="isUrgent"
                        rules={[{ required: false }]}
                        initialValue={lead?.isUrgent?.isUrgent ? '1' : '0'}
                        label="Is Urgent?">
                        <Select>
                            <Select.Option value="">Select</Select.Option>
                            <Select.Option value="1">YES</Select.Option>
                            <Select.Option value="0">NO</Select.Option>
                        </Select>
                    </Form.Item>
                    <Form.Item
                        name="description"
                        rules={[{ required: false }]}
                        initialValue={lead?.description ? lead.description : null}
                        label="Description">
                        <TextArea placeholder="Description" />
                    </Form.Item>
                </Form>
            </Modal>
        </Col>
    )
}

export default LeadForm;
