const URL = 'http://localhost:3001';

export const getAllCategories = () => {
    let url = URL + '/categories';
    return fetch(url, {
        headers: {'Authorization': 'fijdahuofhpriohashufhdsajlfh'}
    }).then((response) => {
        if (response.status === 200) {
            return response;
        } else {
            throw Error(response.status + " : " + response.statusText);
        }
    }).then((response) => response.json())
        .catch((error) => {
            console.log(error);
            return false;
        });
};

export const getAllPosts = () => {
    let url = URL + '/posts';
    return fetch(url, {
        headers: {'Authorization': 'fijdahuofhpriohashufhdsajlfh'}
    }).then((response) => {
        if (response.status === 200) {
            return response;
        } else {
            throw Error(response.status + " : " + response.statusText);
        }
    }).then((response) => response.json())
        .catch((error) => {
            console.log(error);
            return false;
        });
};