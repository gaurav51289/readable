import * as API from '../APIs/API';

export const FETCH_POSTS_SUCCESS = 'FETCH_POSTS_SUCCESS';
export const FILTER_POSTS = 'FILTER_POSTS';
export const SORT_POSTS = 'SORT_POSTS';


export const fetchPostsSuccess = (posts) => {
    return {
        type: FETCH_POSTS_SUCCESS,
        posts
    }
};

export const filterPostsByCategory = (category) => {
    return {
        type: FILTER_POSTS,
        category
    }
};

export const sortPosts = (sort) => {
    return {
        type: SORT_POSTS,
        sort
    }
};

export const getAllPostData = () => {
    return (dispatch) => {
        API.getAllPosts().then((posts) => dispatch(fetchPostsSuccess(posts)));
    }
};