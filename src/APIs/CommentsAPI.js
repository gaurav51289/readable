const URL = 'http://localhost:3001';

export const getCommentsForPost = (postId) => {
    let url = URL + '/posts/' + postId + '/comments';
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

export const postAddComment = (comment) => {
    let url = URL + '/comments';
    return fetch(url, {
        method: 'POST',
        headers: {
            'Authorization': 'fijdahuofhpriohashufhdsajlfh',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(comment)
    }).then((response) => {
        if (response.status === 200) {
            return response;
        } else {
            throw Error(response.status + " : " + response.statusText);
        }
    }).then((response) => response.json());
};

export const postDeleteComment = (commentId) => {
    let url = URL + '/comments/' + commentId;
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


export const postCommentVoteChange = (commentId, vote) => {
    let url = URL + '/comments/' + commentId;
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

export const putEditComment = (commentId, timestamp, body) => {
    let url = URL + '/comments/' + commentId;
    return fetch(url, {
        method: 'PUT',
        headers: {
            'Authorization': 'fijdahuofhpriohashufhdsajlfh',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ timestamp, body})
    }).then((response) => {
        if (response.status === 200) {
            return response;
        } else {
            throw Error(response.status + " : " + response.statusText);
        }
    });
};