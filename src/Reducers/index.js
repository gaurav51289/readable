import {combineReducers} from 'redux';

import { postData } from "./PostReducer";


export default combineReducers({
    postData: postData
});