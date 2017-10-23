import {
    FETCH_POSTS_SUCCESS,
    FILTER_POSTS,
    SORT_POSTS,
    ADD_POST, DELETE_POST, VOTE_CHANGE, EDIT_POST
} from "../Actions/PostActions";

const allPosts = {
    posts: [],
    filterBy: 'all',
    sortBy: 'votes'
};


export function postData(state = allPosts, action) {
    switch (action.type) {
        case FETCH_POSTS_SUCCESS:
            return {
                ...state,
                posts: action.posts
            };

        case FILTER_POSTS:
            return {
                ...state,
                filterBy: action.category
            };

        case SORT_POSTS:
            return {
                ...state,
                sortBy: action.sort
            };

        case ADD_POST:
            return{
                ...state,
                posts: state.posts.concat(action.post)
            };
        case DELETE_POST:
            return{
                ...state,
                posts: state.posts.filter((post) => !(post.id === action.postId))
            };
        case VOTE_CHANGE:
            return {
                ...state,
                posts: state.posts.map((post) => {

                    if(post.id !== action.postId){
                        return post;
                    }

                    return {
                        ...post,
                        voteScore: action.vote === 'upVote' ? post.voteScore + 1 : post.voteScore - 1
                    };
                })
            };
        case EDIT_POST:
            return{
                ...state,
                posts: state.posts.map((post) => {
                    if(post.id !== action.postId){
                        return post;
                    }
                    return{
                        ...post,
                        title: action.title,
                        body: action.body
                    }
                })
            };
        default:
            return state;
    }
}