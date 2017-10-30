import {
    ADD_COMMENT,
    EDIT_COMMENT,
    COMMENT_VOTE_CHANGE,
    DELETE_COMMENT
} from "../Actions/CommentActions";

import {
    ADD_COMMENTS
} from "../Actions/PostActions";

const allComments = {};


export function commentData(state = allComments, action) {
    switch (action.type) {
        case ADD_COMMENTS:
            return action.comments.reduce((comments, comment) => {
                comments[comment.id] = comment;
                return comments;
            }, allComments);


        case ADD_COMMENT:
            return{
                ...state,
                [action.comment.id] : action.comment
            };

        case DELETE_COMMENT:
            let newState = state;
            delete newState[action.commentId];
            return newState;

        case COMMENT_VOTE_CHANGE:
            return {
                ...state,
                [action.commentId]:{
                    ...state[action.commentId],
                    voteScore: action.vote === 'upVote' ?
                        state[action.commentId].voteScore + 1 :
                        state[action.commentId].voteScore - 1
                }
            };
        case EDIT_COMMENT:
            return{
                ...state,
                [action.commentId]: {
                    ...state[action.commentId],
                    timestamp: action.timestamp,
                    body: action.body
                }
            };

        default:
            return state;
    }
}