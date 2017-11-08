import {
    ERROR,
    SET_CATEGORIES_DATA
} from "../Actions/UIActions";

export const error = (state = { error: false}, action) => {
    switch (action.type) {
        case ERROR:
            return{
                error: true
            };
        default:
            return state;
    }
};


export const categories = (state = [{name: 'all'}], action) => {
    switch (action.type){
        case SET_CATEGORIES_DATA:
            return state.concat(action.categories);
        default:
            return state;
    }
};