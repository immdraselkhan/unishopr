import React, {Fragment, Suspense, useEffect, useState} from "react";
import { Main } from '../../styled';
import { useDispatch, useSelector } from 'react-redux';
import {Avatar, Col, Row, Skeleton, Table, Tabs,Menu, Dropdown, Button,  Form} from "antd";
import {Cards} from "../../../components/cards/frame/cards-frame";
import Heading from "../../../components/heading/heading";
import {UserCard} from "../../pages/style";
import {Link} from "react-router-dom";
import {Constants} from "../../../config/constants";
import FontAwesome from "react-fontawesome";
import {
    fetchUserInfo,
    updateUser,
    updateTraveler
} from "../../../redux/clients/users/actionCreator";
import {fetchCountries as utilitiesCountries} from "../../../redux/utilities/actionCreator";
import {UserBioBox} from "../../profile/myProfile/overview/style";
import {Scope} from "../../../services/scopeService";
import {shortDate} from "../../../utility/dataTime";
import {FacebookOutlined, TwitterOutlined, InstagramOutlined, LinkedinOutlined, MoreOutlined, DownOutlined   } from "@ant-design/icons";
import UserForm from "./form";
import ServicerReqForm from "./servicerReqForm";
import PaymentList from "../../workspace/payments/list";
import OrderList from "../../workspace/orders/list";
import TravelList from "../../workspace/travels/list";
import {fetchOrder, fetchOrders} from "../../../redux/workspace/orders/actionCreator";

const Profile = (props) => {
    const dispatch = useDispatch();
    const isLoading = useSelector(state => state.utilities.loading);
    const userInfo = useSelector(state => state.clientsUsers.userInfo);
    const userOrders = useSelector(state => state.clientsUsers.userOrders);
    const userPayments = useSelector(state => state.clientsUsers.userPayments);
    const travelerTravels = useSelector(state => state.clientsUsers.travelerTravels);
    const countries = useSelector(state => state.utilities.countries);

    const getOrders = async (page, perPage) => await dispatch(fetchOrders({page, perPage}));

    const [form] = Form.useForm()
    const [menu, setMenu] = useState({
        userKey: "orders",
    });
    const [state, setState] = useState({
        visible: false,
        reqModalVisible: false,
        modalType: 'primary',
        userInfo: null,
        update: false,
        showInfo: false,
        showInvoice: false
    });

    useEffect(() => {
        const fetchData = async () => {
            await dispatch(fetchUserInfo(props.match.params._id))
        };
        fetchData().then(r => {});
    }, [props.match.params._id,dispatch]);

    useEffect(() => {
        const fetchData = async () => {
            await dispatch(utilitiesCountries())
        };
        fetchData().then(r => {});
    }, [dispatch]);

    const showModal = async () => {
        await setState({
            ...state,
            visible: true,
            modalType: "update",

        });
        await form.resetFields();
    };

    const showServiceReqModal = async (type, user) => {
        await setState({
            ...state,
            reqModalVisible: true,
            modalType: type,
            user: user,
            update: true,
        });
        await form.resetFields();
    }

    const handleOk = async () => await setState({...state, visible: false, reqModalVisible: false});
    const handleUserMenuClick = (e) => setMenu({...menu, userKey: e.key});

    const UserDropdownMenu = (action) => (
        <Dropdown
            key="more"
            overlay={(
                <Menu onClick={action}>
                    <Menu.Item key="orders">
                        Orders
                    </Menu.Item>
                    <Menu.Item key="travels">
                        Travels
                    </Menu.Item>
                    <Menu.Item key="payments">
                        Payments
                    </Menu.Item>

                </Menu>
            )}
            placement="bottomRight"
        >
            <Button type="text" icon={<MoreOutlined style={{ fontSize: 20 }} />} />
        </Dropdown>
    );

    return (
        <Main style={{marginTop: '15px'}}>
            <Row gutter={25}>
                <Col md={6} sm={6} xs={6}>
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
                                        <img src={userInfo?.photo ? Constants.S3_BASE_URL(userInfo.photo) : 'https://cdn0.iconfinder.com/data/icons/user-pictures/100/matureman1-512.png'} alt="" />
                                    </figure>
                                    <figcaption>
                                        <div className="card__content">
                                            <Heading className="card__name" as="h6">
                                                <Link to="#">{`${userInfo?.firstName} ${userInfo?.lastName}`}</Link>
                                            </Heading>
                                            <p className="card__designation">
                                                {userInfo?.phone?.country?.code} {userInfo?.phone?.phone}
                                                <br/>
                                                {userInfo?.email}
                                            </p>
                                        </div>
                                    </figcaption>
                                </Cards>
                            </div>
                        </UserCard>
                    </Suspense>
                    <UserBioBox>
                        <Cards headless>
                            <article className="user-info">
                                <Row>
                                    <Col md={12}>
                                        <h5 className="user-info__title">User Info</h5>
                                    </Col>
                                    {Scope.checkScopes(['clients_users_index']) ? (
                                        <Col md={12} className="text-right">
                                            <FontAwesome
                                                name={"edit"}
                                                className="color-primary"
                                                onClick={showModal}
                                                style={{ textShadow: '0 1px 0 rgba(0, 0, 0, 0.1)', cursor: "pointer" }}
                                            />
                                            <UserForm
                                                form={form}
                                                state={state}
                                                updateUser={updateUser}
                                                handleOk={handleOk}
                                                isLoading={isLoading}
                                                countries={countries}
                                                userInfo={userInfo}
                                            />
                                        </Col>
                                    ) : null}
                                </Row>
                                <p>
                                    <b>Gender: </b> {userInfo?.gender}
                                    <br/>
                                    <b>Date of Birth: </b> { shortDate(userInfo?.dateOfBirth)}
                                    <br/>
                                    <b>Religion: </b> {userInfo?.religion}
                                    <br/>
                                    <b>Social: </b> {userInfo?.social?.facebook && <Link to={userInfo?.social?.facebook}><FacebookOutlined /></Link>}
                                    {userInfo?.social.twitter && <Link to={userInfo?.social?.twitter}><TwitterOutlined /></Link>}
                                    {userInfo?.social.instagram &&<Link to={userInfo?.social.instagram}><InstagramOutlined /></Link>}
                                    {userInfo?.social.linkedin && <Link to={userInfo?.social.linkedin}><LinkedinOutlined /></Link>}
                                </p>
                            </article>
                        </Cards>
                    </UserBioBox>
                    {
                        userInfo?.services.traveler?.isTraveler && (
                            <UserBioBox>
                                <Cards headless>
                                    <article className="user-info">
                                        <Row>
                                            <Col md={12}>
                                                <h5 className="user-info__title">Traveler Info</h5>
                                            </Col>
                                            {Scope.checkScopes(['clients_users_update']) ? (
                                                <Col md={12} className="text-right">
                                                    <FontAwesome
                                                        name={"edit"}
                                                        className="color-primary"
                                                        onClick={() => showServiceReqModal('traveler', userInfo)}
                                                        style={{ textShadow: '0 1px 0 rgba(0, 0, 0, 0.1)', cursor: "pointer" }}
                                                    />
                                                    <ServicerReqForm
                                                        state={state}
                                                        handleOk={handleOk}
                                                        isLoading={isLoading}
                                                        form={form}
                                                        updateAuthor={updateTraveler}
                                                    />
                                                </Col>
                                            ) : null}
                                        </Row>
                                        <p>
                                            <b>Status: </b> {userInfo?.services.traveler?.status}
                                            <br/>
                                            <b>Overview: </b>{userInfo?.services.traveler?.overview}
                                        </p>
                                    </article>
                                </Cards>
                            </UserBioBox>
                        )
                    }
                </Col>
                <Col md={18} sm={18} xs={18}>
                    <div>
                        {
                            menu.userKey === "orders" && (
                                <OrderList
                                    state={state}
                                    setState={setState}
                                    showModal={showModal}
                                    showInvoice={(order) => dispatch(fetchOrder(order, () => setState({...state, showInvoice: true})))}
                                    extra={UserDropdownMenu}
                                    getOrders={getOrders}
                                    userDropDownAction={handleUserMenuClick}
                                    isLoading={isLoading}
                                    orders={userOrders}
                                />
                            )
                        }
                        {
                            menu.userKey === "travels" && (
                                <TravelList
                                    extra={UserDropdownMenu}
                                    state={state}
                                    userDropDownAction={handleUserMenuClick}
                                    isLoading={isLoading}
                                    travels={travelerTravels}
                                />
                            )
                        }
                        {
                            menu.userKey === "payments" && (
                                <PaymentList
                                    extra={UserDropdownMenu}
                                    userDropDownAction={handleUserMenuClick}
                                    isLoading={isLoading}
                                    payments={userPayments}
                                />
                            )
                        }
                    </div>
                </Col>
            </Row>
        </Main>

    )
}

export default Profile;
