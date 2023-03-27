import { ADD_CONFIGURATION, ADD_RTL } from './actionTypes';

const initialState = {
    configuration: {},
    rtlList: []
};

const rootReducer = (state = initialState, action) => {
    switch (action.type) {
        case ADD_CONFIGURATION:
            return {
                ...state,
                configuration: action.payload
            };

        case ADD_RTL:
            return {
                ...state,
                rtlList: action.payload
            };
        default:
            return state;
    }
};

export { rootReducer };
