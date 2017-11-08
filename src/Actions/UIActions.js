import * as PostAPI from '../APIs/PostsAPI';

export const FETCH_CATEGORIES_SUCCESS = 'FETCH_CATEGORIES_SUCCESS';
export const ERROR = 'ERROR';
export const ERROR_RESET = 'ERROR_RESET';

export const SET_CATEGORIES_DATA = 'SET_CATEGORIES_DATA';

export const setCategoriesData = (categories) => {
    return {
        type : SET_CATEGORIES_DATA,
        categories
    }
};

export const errorOccured = (error) => {
    return {
        type: ERROR,
        error
    }
};

export const errorReset = () => {
    return {
        type: ERROR_RESET,
    }
};


export const getAllCategories = () => {
    return (dispatch) => {
        PostAPI.getAllCategories()
            .then((resJSON) => dispatch(setCategoriesData(resJSON.categories)))
            .catch((error) => {
                dispatch(errorOccured(error.message));
            });
    };
};