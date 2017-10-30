import {combineReducers} from 'redux';

import { postData } from "./PostReducer";
import { commentData } from "./CommentReducer";
import { error } from "./UIReducers";


export default combineReducers({
    postData,
    commentData,
    error
});