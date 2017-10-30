
export const FETCH_CATEGORIES_SUCCESS = 'FETCH_CATEGORIES_SUCCESS';
export const ERROR = 'ERROR';

export const fetchCategoriesSuccess = (categories) => {
    return {
        type : FETCH_CATEGORIES_SUCCESS,
        categories
    }
};

export const errorOccured = () => {
    return {
        type: ERROR
    }
};
