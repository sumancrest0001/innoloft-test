import { ADD_CONFIGURATION, ADD_RTL } from './actionTypes';

const addConfiguration = (payload) => {
    return {
        type: ADD_CONFIGURATION,
        payload
    };
};

const addRtlList = (payload) => {
    return {
        type: ADD_RTL,
        payload
    };
};

export { addConfiguration, addRtlList };
