import * as CommentAPI from '../APIs/CommentsAPI';
import {errorOccured} from "./UIActions";
import {addComments} from "./PostActions";



export const ADD_COMMENT = 'ADD_COMMENT';
export const DELETE_COMMENT = 'DELETE_COMMENT';
export const COMMENT_VOTE_CHANGE = 'COMMENT_VOTE_CHANGE';
export const EDIT_COMMENT = 'EDIT_COMMENT';


export const deleteComment = (postId, commentId) => {
    return {
        type: DELETE_COMMENT,
        postId,
        commentId
    }
};

export const commentVoteChange = (commentId, vote) => {
    return {
        type: COMMENT_VOTE_CHANGE,
        commentId,
        vote
    }
};

export const editComment = (commentId, timestamp, body) => {
    return {
        type: EDIT_COMMENT,
        commentId,
        timestamp,
        body
    }
};


export const postAddComment = (postId, comments) => {
    return (dispatch) => {
        CommentAPI.postAddComment(comments[0])
            .then(() => dispatch(addComments(postId, comments)))
            .catch((error) => {
                console.error(error);
                dispatch(errorOccured());
            });
    }
};

export const postDeleteComment = (postId, commentId) => {
    return (dispatch) => {
        CommentAPI.postDeleteComment(commentId)
            .then(() => dispatch(deleteComment(postId, commentId)))
            .catch((error) => {
                console.error(error);
                dispatch(errorOccured());
            });
    }
};

export const postCommentVoteChange = (commentId, vote) => {
    return (dispatch) => {
        CommentAPI.postCommentVoteChange(commentId,vote)
            .then(() => dispatch(commentVoteChange(commentId, vote)))
            .catch((error) => {
                console.error(error);
                dispatch(errorOccured());
            });
    }
};

export const putEditComment = (commentId, timestamp, body) => {
    return (dispatch) => {
        CommentAPI.putEditComment(commentId, timestamp, body)
            .then(() => dispatch(editComment(commentId, timestamp, body)))
            .catch((error) => {
                console.error(error);
                dispatch(errorOccured());
            });
    }
};

