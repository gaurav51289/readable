import {
    ERROR,
    ERROR_RESET,
    SET_CATEGORIES_DATA
} from "../Actions/UIActions";

export const error = (state = { error: false, message: ''}, action) => {
    switch (action.type) {
        case ERROR:
            return{
                error: true,
                message: action.error.message
            };
        case ERROR_RESET:
            return{
                error: false,
                message: ''
            };
        default:
            return state;
    }
};


export const categories = (state = [{name: 'all'}], action) => {
    switch (action.type){
        case SET_CATEGORIES_DATA:
            return state.length === 1 ? state.concat(action.categories) : state;
        default:
            return state;
    }
};