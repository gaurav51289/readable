import {
    FETCH_POSTS_SUCCESS,
    FILTER_POSTS,
    SORT_POSTS
} from "../Actions/PostActions";

const allPosts = {
    posts: [],
    filterBy: 'all',
    sortBy: 'votes'
};


export function filteredPosts(state = allPosts, action) {
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

        default:
            return state;
    }
}