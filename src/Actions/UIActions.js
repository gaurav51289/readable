
export const FETCH_CATEGORIES_SUCCESS = 'FETCH_CATEGORIES_SUCCESS';


export const fetchCategoriesSuccess = (categories) => {
    return {
        type : FETCH_CATEGORIES_SUCCESS,
        categories
    }
};