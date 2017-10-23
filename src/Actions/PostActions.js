import * as API from '../APIs/API';

export const FETCH_POSTS_SUCCESS = 'FETCH_POSTS_SUCCESS';
export const FILTER_POSTS = 'FILTER_POSTS';
export const SORT_POSTS = 'SORT_POSTS';
export const ADD_POST = 'ADD_POST';
export const DELETE_POST = 'DELETE_POST';
export const VOTE_CHANGE = 'VOTE_CHANGE';
export const EDIT_POST = 'EDIT_POST';


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

export const addPost = (post) => {
    return {
        type: ADD_POST,
        post
    }
};

export const deletePost = (postId) => {
    return {
        type: DELETE_POST,
        postId
    }
};

export const voteChange = (postId, vote) => {
    return {
        type: VOTE_CHANGE,
        postId,
        vote
    }
};

export const editPost = (postId, title, body) => {
    return {
        type: EDIT_POST,
        postId,
        title,
        body
    }
};

export const getAllPostData = () => {
    return (dispatch) => {
        API.getAllPosts().then((posts) => dispatch(fetchPostsSuccess(posts)));
    }
};

export const postAddPost = (post) => {
    return (dispatch) => {
        API.postAddPost(post).then(() => dispatch(addPost(post)));
    }
};

export const postDeletePost = (postId) => {
    return (dispatch) => {
        API.postDeletePost(postId).then(() => dispatch(deletePost(postId)));
    }
};

export const postVoteChange = (postId, vote) => {
    return (dispatch) => {
        API.postVoteChange(postId,vote).then(() => dispatch(voteChange(postId, vote)));
    }
};

export const putEditPost = (postId, title, body) => {
    return (dispatch) => {
        API.putEditPost(postId, title, body).then(() => dispatch(editPost(postId, title, body)));
    }
};