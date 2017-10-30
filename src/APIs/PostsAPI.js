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
    }).then((response) => response.json());
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
    }).then((response) => response.json());
};

export const postAddPost = (post) => {
    let url = URL + '/posts';
    return fetch(url, {
        method: 'POST',
        headers: {
            'Authorization': 'fijdahuofhpriohashufhdsajlfh',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(post)
    }).then((response) => {
        if (response.status === 200) {
            return response;
        } else {
            throw Error(response.status + " : " + response.statusText);
        }
    }).then((response) => response.json());
};

export const postDeletePost = (postId) => {
    let url = URL + '/posts/' + postId;
    return fetch(url, {
        method: 'DELETE',
        headers: {
            'Authorization': 'fijdahuofhpriohashufhdsajlfh'
        }
    }).then((response) => {
        if (response.status === 200) {
            return response;
        } else {
            throw Error(response.status + " : " + response.statusText);
        }
    }).then((response) => response.json());
};


export const postVoteChange = (postId, vote) => {
    let url = URL + '/posts/' + postId;
    return fetch(url, {
        method: 'POST',
        headers: {
            'Authorization': 'fijdahuofhpriohashufhdsajlfh',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({option: vote})
    }).then((response) => {
        if (response.status === 200) {
            return response;
        } else {
            throw Error(response.status + " : " + response.statusText);
        }
    }).then((response) => response.json());
};

export const putEditPost = (postId, title, body) => {
    let url = URL + '/posts/' + postId;
    return fetch(url, {
        method: 'PUT',
        headers: {
            'Authorization': 'fijdahuofhpriohashufhdsajlfh',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ title, body})
    }).then((response) => {
        if (response.status === 200) {
            return response;
        } else {
            throw Error(response.status + " : " + response.statusText);
        }
    });
};