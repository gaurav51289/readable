import {
    FETCH_POSTS_SUCCESS,
    SORT_POSTS,
    ADD_POST,
    DELETE_POST,
    VOTE_CHANGE,
    EDIT_POST,
    ADD_COMMENTS
} from "../Actions/PostActions";

import {
    DELETE_COMMENT
} from "../Actions/CommentActions";

const allPosts = {
    posts: {},
    sortBy: 'votes'
};


export function postData(state = allPosts, action) {
    switch (action.type) {
        case FETCH_POSTS_SUCCESS:
            return {
                ...state,
                posts: action.posts.reduce((obj, post) => {
                    obj[post.id] = post;
                    return obj;
                }, {})
            };

        case SORT_POSTS:
            return {
                ...state,
                sortBy: action.sort
            };

        case ADD_POST:
            return{
                ...state,
                posts: {
                    ...state.posts,
                    [action.post.id]: action.post
                }
            };

        case DELETE_POST:
            let newPosts = state.posts;
            delete newPosts[action.postId];
            return{
                ...state,
                posts: newPosts
            };

        case VOTE_CHANGE:
            return {
                ...state,
                posts: {
                    ...state.posts,
                    [action.postId]:{
                        ...state.posts[action.postId],
                        voteScore: action.vote === 'upVote' ?
                            state.posts[action.postId].voteScore + 1 :
                            state.posts[action.postId].voteScore - 1
                    }
                }
            };

        case EDIT_POST:
            return{
                ...state,
                posts: {
                    ...state.posts,
                    [action.postId]: {
                        ...state.posts[action.postId],
                        title: action.title,
                        body: action.body
                    }
                }
            };

        case ADD_COMMENTS:
            if(!state.posts.commentIds){
                return{
                    ...state,
                    posts: {
                        ...state.posts,
                        [action.postId]: {
                            ...state.posts[action.postId],
                            commentIds: action.comments.map((comment) => (comment.id))
                        }
                    }
                };
            } else {
                return{
                    ...state,
                    posts: {
                        ...state.posts,
                        [action.postId]: {
                            ...state.posts[action.postId],
                            commentIds: state.posts[action.postId].commentIds.concat(action.comments.map((comment) => comment.id))
                        }
                    }
                };
            }


        case DELETE_COMMENT:
            console.log(action.postId);
            return {
                ...state,
                posts: {
                    ...state.posts,
                    [action.postId]: {
                        ...state.posts[action.postId],
                        commentIds: state.posts[action.postId].commentIds.filter((commentId) => (commentId !== action.commentId))
                    }
                }
            };

        default:
            return state;
    }
}