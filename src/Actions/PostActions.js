import * as PostAPI from '../APIs/PostsAPI';
import * as CommentAPI from '../APIs/CommentsAPI';
import {errorOccured} from "./UIActions";

export const FETCH_POSTS_SUCCESS = 'FETCH_POSTS_SUCCESS';
export const SORT_POSTS = 'SORT_POSTS';
export const ADD_POST = 'ADD_POST';
export const DELETE_POST = 'DELETE_POST';
export const VOTE_CHANGE = 'VOTE_CHANGE';
export const EDIT_POST = 'EDIT_POST';
export const ADD_COMMENTS = 'ADD_COMMENTS';


export const fetchPostsSuccess = (posts) => {
    return {
        type: FETCH_POSTS_SUCCESS,
        posts
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

export const addComments = (postId, comments) => {
    return {
        type: ADD_COMMENTS,
        postId,
        comments
    }
};

export const getAllPostData = (category) => {
    return (dispatch) => {
        PostAPI.getAllPosts(category)
            .then((posts) => {
                dispatch(fetchPostsSuccess(posts));
                return posts;
            })
            .then((posts) => {
                posts.map((post) => dispatch(getCommentsForPost(post.id)));
            })
            .catch((error) => {
                console.error(error);
                dispatch(errorOccured());
            });
    }
};

export const getPostData = (category, postId) => {
    return (dispatch) => {
        PostAPI.getPost(category, postId)
            .then((post) => {
                dispatch(addPost(post));
                return post;
            })
            .then((post) => {
                dispatch(getCommentsForPost(post.id));
            })
            .catch((error) => {
                console.error(error);
                dispatch(errorOccured(error));
            });
    }
};

export const postAddPost = (post) => {
    return (dispatch) => {
        PostAPI.postAddPost(post)
            .then(() => dispatch(addPost(post)))
            .catch((error) => {
                console.error(error);
                dispatch(errorOccured());
            });
    }
};

export const postDeletePost = (postId) => {
    return (dispatch) => {
        PostAPI.postDeletePost(postId)
            .then(() => dispatch(deletePost(postId)))
            .catch((error) => {
                console.error(error);
                dispatch(errorOccured());
            });
    }
};

export const postVoteChange = (postId, vote) => {
    return (dispatch) => {
        PostAPI.postVoteChange(postId,vote)
            .then(() => dispatch(voteChange(postId, vote)))
            .catch((error) => {
                console.error(error);
                dispatch(errorOccured());
            });
    }
};

export const putEditPost = (postId, title, body) => {
    return (dispatch) => {
        PostAPI.putEditPost(postId, title, body)
            .then(() => dispatch(editPost(postId, title, body)))
            .catch((error) => {
                console.error(error);
                dispatch(errorOccured());
            });
    }
};




export const getCommentsForPost = (postId) => {
    return (dispatch) => {
        CommentAPI.getCommentsForPost(postId)
            .then((comments) => {
                dispatch(addComments(postId, comments))
            })
            .catch((error) => {
                console.error(error);
                dispatch(errorOccured());
            });
    }
};