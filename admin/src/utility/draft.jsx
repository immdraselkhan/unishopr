import React from "react";
import { ContentState, convertToRaw, EditorState } from "draft-js";
import draftToHtml from "draftjs-to-html";

export const isJsonString = (str) => {
    try {
        JSON.parse(str);
    } catch (e) {
        return false;
    }
    return true;
}

export const getDraftHtml = (data) => {
    if (isJsonString(data)) {
        const editor = EditorState.createWithContent(ContentState.fromJS(JSON.parse(data)));
        const rawContentState = convertToRaw(editor.getCurrentContent());
        return <div dangerouslySetInnerHTML={{ __html: draftToHtml(rawContentState) }} />
    } else return <div />
}
