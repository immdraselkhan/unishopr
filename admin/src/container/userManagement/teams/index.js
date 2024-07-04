import React, {useState, useEffect} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {Main} from "../../styled";
import {Form} from "antd";
import TeamList from "./list";
import TeamForm from "./form";
import {
    addTeam,
    fetchTeams,
    fetchTeam,
    updateTeam,
    deleteTeam,
    resetTeamForm
} from "../../../redux/userManagement/teams/actionCreator";

const TeamsData = () => {
    const dispatch = useDispatch();
    const isLoading = useSelector(state => state.utilities.loading);
    const teams = useSelector(state => state.umTeams.teams);
    const team = useSelector(state => state.umTeams.team);
    const [form] = Form.useForm()

    const [state, setState] = useState({ visible: false });

    useEffect(() => {
        const fetchData = async () => {
            await dispatch(fetchTeams({page: 1, perPage: 10}))
        };
        fetchData().then(r => {});
    }, [dispatch]);

    const getTeams = async (page, perPage) => await dispatch(fetchTeams({page, perPage}));
    const getTeamInfo = (_id) => dispatch(fetchTeam(_id, showModalEdit));
    const showModal = async type => {
        await setState({ ...state, visible: true });
        await dispatch(resetTeamForm());
        await form.resetFields();
    };

    const showModalEdit = async () => {
        await setState({ ...state, visible: true });
        await form.resetFields();
    };

    const handleOk = () => {
        setState({ ...state, visible: false });
    };

    return (
        <Main>
            <TeamList
                state={state}
                setState={setState}
                showModal={showModal}
                isLoading={isLoading}
                teams={teams}
                getTeams={getTeams}
                getTeamInfo={getTeamInfo}
                deleteTeam={deleteTeam}
            />

            <TeamForm
                form={form}
                state={state}
                team={team}
                addTeam={addTeam}
                updateTeam={updateTeam}
                handleOk={handleOk}
                isLoading={isLoading}
            />
        </Main>
    )
}

export default TeamsData;
