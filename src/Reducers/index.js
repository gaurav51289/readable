import {combineReducers} from 'redux';

import { postData } from "./PostReducer";
import { commentData } from "./CommentReducer";
import { categories, error } from "./UIReducers";


export default combineReducers({
    postData,
    commentData,
    categories,
    error
});