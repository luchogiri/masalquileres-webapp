import {callApi, callApiMultipart} from '../../util/apiCaller';

// Export Constants
export const ADD_POSTS = 'ADD_POSTS';
export const SET_POST = 'SET_POST';

export function savePostRequest(post) {
  return (dispatch) => {
    if (post._id) {
      return callApi(`posts/${post._id}`, 'put', post);
    } else {
      return callApi('posts', 'post', post);
    }
  };
}

export function publishRequest(post) {
  return (dispatch) => {
    return callApi(`posts/${post._id}`, 'put', {
      ...post,
      published: true
    });
  };
}

export function pauseRequest(post) {
  return (dispatch) => {
    return callApi(`posts/${post._id}`, 'put', {
      ...post,
      published: false
    });
  };
}

export function addPosts(posts) {
  return {
    type: ADD_POSTS,
    posts,
  };
}

export function fetchPosts(data = {}) {
  return (dispatch) => {
    return callApi('posts', 'get', undefined, {pageSize: 4, ...data}).then(res => {
      return dispatch(addPosts(res));
    });
  };
}

export function setPost(post) {
  return {
    type: SET_POST,
    post
  }
}

export function fetchPost(id) {
  return (dispatch) => {
    return callApi(`posts/${id}`);
  };
}

export function deletePostRequest(id) {
  return (dispatch) => {
    return callApi(`posts/${id}`, 'delete')
      .then(() => dispatch(fetchPosts()));
  };
}

export function uploadImage(id, body) {
  return (dispatch) => {
    return callApiMultipart(`posts/upload/${id}`, 'post', body, {});
  };
}

export function uploadCondition(id, field, body) {
  return (dispatch) => {
    return callApiMultipart(`posts/upload-condition/${id}/${field}`, 'post', body, {});
  };
}
