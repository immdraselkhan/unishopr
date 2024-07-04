import React, { useState, Suspense, useEffect } from "react";
import { useDispatch } from "react-redux";
import { Button } from "../../../components/buttons/buttons";
import { Col, Form, Input, Modal, Select, Skeleton } from "antd";
import { Constants } from "../../../config/constants";
import { Cards } from "../../../components/cards/frame/cards-frame";
import Heading from "../../../components/heading/heading";
import { Link } from "react-router-dom";
import { UserCard } from "../../styled";

const TravelForm = (
    {
        form,
        state,
        setState,
        travel,
        addTravel,
        updateTravel,
        isLoading,
        handleOk,
        cities,
        fetchUser,
        handleRoute,
        filteredCities,
        setFilteredCities
    }
) => {
    const dispatch = useDispatch()
    const layout = { labelCol: { span: 8 }, wrapperCol: { span: 16 } }
    const validateMessages = { required: '${label} is required!' };
    const handleSubmit = async (data) => {
        if (state.user._id) Object.assign(data, {
            user: {
                _id: state.user._id,
                firstName: state.user.firstName,
                lastName: state.user.lastName,
                photo: state.user.photo
            }
        });

        if (travel._id) {
            Object.assign(data, { _id: travel._id });
            await dispatch(updateTravel(data, handleOk))
        } else {
            await dispatch(addTravel(data, handleOk));
        }
    };

    const footerButtons = [
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

    const date = new Date()
    date.setDate(date.getDate() + 1)

    return (
        <Col md={12}>
            <Modal
                type={"primary"}
                title="Travels Form"
                visible={state.visible}
                onCancel={() => handleOk()}
                footer={footerButtons}
            >
                <Form
                    {...layout}
                    name={'travelForm'}
                    form={form}
                    id={'myForm'}
                    validateMessages={validateMessages}
                    onFinish={handleSubmit}
                >
                    {state.user._id ? (
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
                                            <img src={state.user?.photo ? Constants.S3_BASE_URL(state.user.photo) : 'https://cdn0.iconfinder.com/data/icons/user-pictures/100/matureman1-512.png'} alt="" />
                                        </figure>
                                        <figcaption>
                                            <div className="card__content">
                                                <Heading className="card__name" as="h6">
                                                    <Link to="#">{`${state.user?.firstName} ${state.user?.lastName}`}</Link>
                                                </Heading>
                                                <p className="card__designation no-margin">
                                                    {state.user?.phone?.country?.code}{state.user?.phone?.phone}
                                                    <br />
                                                    {state.user?.email}
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
                                onBlur={({ target }) => target.value ? dispatch(fetchUser({ email: target.value }, (cb) => setState({ ...state, user: cb }))) : null}
                            />
                        </Form.Item>
                    )}
                    <Form.Item
                        name="routeFrom"
                        initialValue={travel?.route?.from?._id ? travel?.route?.from?._id : null}
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
                                initialValue={travel?.route?.to?._id ? travel?.route?.to?._id : null}
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
                                initialValue={travel?.route?.to?._id ? travel?.route?.to?._id : null}
                                rules={[{ required: true }]}
                                label="To">
                                <Select>
                                    <Select.Option value="">City</Select.Option>
                                    {cities.length && cities.map((city) => (
                                        (city.country.name !== travel?.route?.from?.country?.name) && <Select.Option key={city._id} value={city._id}>{city.name}</Select.Option>
                                    ))}
                                </Select>
                            </Form.Item>
                    }
                    <Form.Item
                        name="weightCapacity"
                        initialValue={travel?.weight?.capacity ? travel?.weight?.capacity : null}
                        rules={[{ required: true }]}
                        label="Weight Capacity"
                    >
                        <Input placeholder="Weight Capacity" />
                    </Form.Item>
                    <Form.Item
                        name="travelDate"
                        initialValue={travel.travelDate ? travel.travelDate.slice(0, 10) : null}
                        rules={[{ required: true }]}
                        label="Travel Date"
                    >
                        <Input
                            type="date"
                            placeholder="Travel Date"
                            min={date.toISOString().split('T')[0]}
                        />
                    </Form.Item>
                </Form>
            </Modal>
        </Col>
    )
}

export default TravelForm;
