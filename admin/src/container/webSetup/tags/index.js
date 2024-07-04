import { Form } from "antd";
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from "react-redux";
import { Main } from "../../styled";
import TagForm from "./form";
import TagList from "./list";
import {
    addTag,
    deleteTag,
    fetchTag,
    fetchTags,
    resetTagForm,
    updateTag
} from "../../../redux/webSetup/tags/actionCreator";

const TagsData = () => {
    const dispatch = useDispatch();
    const isLoading = useSelector(state => state.utilities.loading);
    const tags = useSelector(state => state.wsTags.tags);
    const tag = useSelector(state => state.wsTags.tag);
    const [form] = Form.useForm()

    const [state, setState] = useState({
        visible: false,
        modalType: 'primary',
        colorModal: false,
        uploading: false,
    });

    useEffect(() => {
        const fetchData = async () => {
            await dispatch(fetchTags({page: 1, perPage: 10}))
        };
        fetchData().then(r => {});
    }, []);

    const getTags = async (page, perPage) => await dispatch(fetchTags({page, perPage}));
    const getTagInfo = (_id) => dispatch(fetchTag(_id, showModalEdit));
    const showModal = async type => {
        await setState({
            ...state,
            visible: true,
            modalType: type,
        });
        await dispatch(resetTagForm());
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
            <TagList
                state={state}
                setState={setState}
                showModal={showModal}
                isLoading={isLoading}
                tags={tags}
                getTags={getTags}
                getTagInfo={getTagInfo}
                deleteTag={deleteTag}/>

            <TagForm
                form={form}
                state={state}
                tag={tag}
                addTag={addTag}
                updateTag={updateTag}
                handleOk={handleOk}
                isLoading={isLoading}/>
        </Main>
    )
}

export default TagsData;
