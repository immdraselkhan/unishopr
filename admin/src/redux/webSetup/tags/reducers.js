import actions from "./actions";

const {FETCH_TAG, FETCH_TAGS, RESET_TAG} = actions;
const initState = {
    tags: {
        page: 0,
        perPage: 10,
        data: [],
        total: 0
    },
    tag: {
        id: null,
        name: null,
        status: null,
        photo: null,
        description: null
    }
};

const TagReducer = (state = initState, action) => {
    const {type, data} = action;
    switch (type) {
        case FETCH_TAGS:
            return {
                ...state,
                tags: data
            }
        case RESET_TAG:
            return {
                ...state,
                tag: initState.tag,
            };
        case FETCH_TAG:
            return {
                ...state,
                tag: data,
            };
        default:
            return state;
    }
}

export default TagReducer;
