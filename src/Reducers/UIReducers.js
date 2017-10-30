import {ERROR} from "../Actions/UIActions";

export function error(state = { error: false}, action) {
    switch (action.type) {
        case ERROR:
            return{
                error: true
            };
        default:
            return state;
    }
}