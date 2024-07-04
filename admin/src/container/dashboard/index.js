import React, {useEffect} from 'react';
import {Row, Col} from 'antd';
import FeatherIcon from 'feather-icons-react';
import {Cards} from '../../components/cards/frame/cards-frame';
import {ChartjsBarChartTransparent} from '../../components/charts/chartjs';
import {
    fetchUsersStats,
    fetchPurchasesStats,
    fetchRevenueStats,
} from "../../redux/dashboard/actionCreator";
import {Main} from '../styled';
import Heading from '../../components/heading/heading';
import {CardBarChart2, EChartCard} from './style';
import {useDispatch, useSelector} from "react-redux";

const chartOptions = {
    legend: {
        display: false,
        labels: {
            display: false,
        },
    },
    scales: {
        yAxes: [
            {
                stacked: true,
                gridLines: {
                    display: false,
                },
                ticks: {
                    display: false,
                },
            },
        ],
        xAxes: [
            {
                stacked: true,
                barPercentage: 1,
                gridLines: {
                    display: false,
                },
                ticks: {
                    display: false,
                },
            },
        ],
    },
};

const Dashboard = () => {
    const dispatch      = useDispatch();
    const usersStats = useSelector(state => state.dashboard.usersStats);
    const purchasesStats = useSelector(state => state.dashboard.purchasesStats);
    const revenueStats = useSelector(state => state.dashboard.revenueStats);

    useEffect(() => {
        if (
            fetchUsersStats &&
            fetchPurchasesStats &&
            fetchRevenueStats
        ) {
            const fetchData = async () => {
                await dispatch(fetchUsersStats());
                await dispatch(fetchPurchasesStats());
                await dispatch(fetchRevenueStats());
            };
            fetchData().then(r => {});
        }
    }, [dispatch]);

    const getStatMonthNames = (stats) => {
        const arr = [];
        stats.forEach((data) => arr.push(`${data.month} ${data._id.year}`));
        return arr;
    }

    const getStatMonthValues = (stats) => {
        const arr = [];
        stats.forEach((data) => arr.push(data.count));
        return arr;
    }

    const getRevenueValues = (stats) => {
        const arr = [];
        stats.forEach((data) => arr.push((data.count).toFixed(0)));
        return arr;
    }

    return (
        <Main style={{marginTop: "30px"}}>
            <Row gutter={25}>
                <Col xxl={8} md={8} sm={12} xs={24}>
                    <Cards headless>
                        <EChartCard>
                            <div className="card-chunk">
                                <CardBarChart2>
                                    <Heading as="h1">{(usersStats.total).toLocaleString('en-US')}</Heading>
                                    <span>Customers</span>
                                    <p>
                                        <span className="growth-upward">
                                            <FeatherIcon icon="arrow-up"/> {usersStats.percentage}%
                                        </span>
                                        <span>This Month</span>
                                    </p>
                                </CardBarChart2>
                            </div>
                            <div className="card-chunk">
                                <ChartjsBarChartTransparent
                                    labels={getStatMonthNames(usersStats.stats)}
                                    datasets={[
                                        {
                                            data: getStatMonthValues(usersStats.stats),
                                            backgroundColor: '#5F63F23a',
                                            hoverBackgroundColor: '#5F63F2',
                                            label: 'Customers',
                                        },
                                    ]}
                                    options={chartOptions}
                                />
                            </div>
                        </EChartCard>
                    </Cards>
                </Col>

                <Col xxl={8} md={8} sm={12} xs={24}>
                    <Cards headless>
                        <EChartCard>
                            <div className="card-chunk">
                                <CardBarChart2>
                                    <Heading as="h1">{(purchasesStats.total).toLocaleString('en-US')}</Heading>
                                    <span>Orders</span>
                                    <p>
                                        <span className="growth-upward">
                                            <FeatherIcon icon="arrow-up"/> {purchasesStats.percentage}%
                                        </span>
                                        <span>This Month</span>
                                    </p>
                                </CardBarChart2>
                            </div>
                            <div className="card-chunk">
                                <ChartjsBarChartTransparent
                                    labels={getStatMonthNames(purchasesStats.stats)}
                                    datasets={[
                                        {
                                            data: getStatMonthValues(purchasesStats.stats),
                                            backgroundColor: '#fa8b0c3a',
                                            hoverBackgroundColor: '#FA8B0C',
                                            label: 'Orders',
                                        },
                                    ]}
                                    options={chartOptions}
                                />
                            </div>
                        </EChartCard>
                    </Cards>
                </Col>

                <Col xxl={8} md={8} sm={12} xs={24}>
                    <Cards headless>
                        <EChartCard>
                            <div className="card-chunk">
                                <CardBarChart2>
                                    <Heading as="h1">{(Number((revenueStats.total).toFixed(0))).toLocaleString('en-US')} <small>BDT</small></Heading>
                                    <span>Revenue</span>
                                    <p>
                                        <span className="growth-upward">
                                            <FeatherIcon icon="arrow-up"/> {revenueStats.percentage}%
                                        </span>
                                        <span>This Month</span>
                                    </p>
                                </CardBarChart2>
                            </div>
                            <div className="card-chunk">
                                <ChartjsBarChartTransparent
                                    labels={getStatMonthNames(revenueStats.stats)}
                                    datasets={[
                                        {
                                            data: getRevenueValues(revenueStats.stats),
                                            backgroundColor: '#2c3e503a',
                                            hoverBackgroundColor: '#2c3e50',
                                            label: 'BDT',
                                        },
                                    ]}
                                    options={chartOptions}
                                />
                            </div>
                        </EChartCard>
                    </Cards>
                </Col>
            </Row>
        </Main>
    );
};

export default Dashboard;
