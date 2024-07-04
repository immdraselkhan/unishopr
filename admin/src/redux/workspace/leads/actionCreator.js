import actions from './actions'
import { RequestService as req } from "../../../services/requestService";
import { Constants } from "../../../config/constants";

const { fetchLeadsAction, fetchLeadAction, resetLeadAction } = actions;

export const fetchLeads = (queries) => {
    return async dispatch => {
        await req.getRequest({
            url: `${Constants.WORKSPACE}leads`,
            queries,
            auth: 'bearer'
        }, (cb) => dispatch(fetchLeadsAction(cb)))
    };
};

export const fetchLead = (_id, action) => {
    return async dispatch => {
        await req.getRequest({
            url: `${Constants.WORKSPACE}lead/${_id}`,
            auth: 'bearer'
        }, async (cb) => {
            await dispatch(fetchLeadAction(cb));
            if (action) await dispatch(action);
        })
    };
};

export const addLead = (data, action) => {
    return async dispatch => {
        await req.postRequest({
            url: Constants.WORKSPACE + 'leads',
            auth: 'bearer',
            body: data
        }, async (cb) => {
            await dispatch(fetchLeads({ page: 1, perPage: 10 }));
            await dispatch(action);
        })
    };
};

export const updateLead = (body, action, queries) => {
    return async dispatch => {
        await req.putRequest({
            url: `${Constants.WORKSPACE}leads/${body._id}`,
            body,
            auth: 'bearer'
        }, async (cb) => {
            if (action) await action();
            await dispatch(fetchLead(body._id));
            await dispatch(fetchLeads(queries));
        })
    };
};

export const addLeadUpdate = ({ data, leadId, action }) => {
    return async dispatch => {
        await req.postRequest({
            url: Constants.WORKSPACE + 'leads/update/' + leadId,
            auth: 'bearer',
            body: data
        }, (cb) => {
            dispatch(fetchLead(leadId))
            if (action) action()
        })
    };
}

export const updateLeadUpdate = ({ data, leadId, action }) => {
    return async dispatch => {
        await req.putRequest({
            url: Constants.WORKSPACE + 'leads/update/' + leadId,
            auth: 'bearer',
            body: data
        }, (cb) => {
            dispatch(fetchLead(leadId))
            if (action) action()
        })
    };
}

export const updateLeadAdditionalInfo = ({ data, leadId, action }) => {
    return async dispatch => {
        await req.putRequest({
            url: Constants.WORKSPACE + 'leads/additional/' + leadId,
            auth: 'bearer',
            body: data
        }, (cb) => {
            dispatch(fetchLead(leadId))
            if (action) action()
        })
    };
}

export const resetLeadForm = () => dispatch => dispatch(resetLeadAction());

export const deleteLeadUpdate = (queries) => {
    return async dispatch => {
        await req.deleteRequest({
            url: Constants.WORKSPACE + 'leads/update/' + queries.leadId, queries,
            auth: 'bearer',
        }, (cb) => dispatch(fetchLead(queries.leadId)))
    };
};

export const leadsBulkImport = (body, action) => {
    return async dispatch => {
        await req.postRequest({
            url: `${Constants.WORKSPACE}leads-bulk-import`,
            body,
            auth: 'bearer'
        }, (cb) => action(cb))
    };
};