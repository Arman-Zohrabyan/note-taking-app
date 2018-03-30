import history from '../../history.js';
import Api from '../../services/Api';

export const types = {
  SET_RESPONSE_ERRORS: 'Posts.SET_RESPONSE_ERRORS',
  SET_RESPONSE: 'Posts.SET_RESPONSE',
  DELETE_POST: 'Posts.DELETE_POST',
  REMOVE_ERRORS: 'Posts.REMOVE_ERRORS',
};


export function addNewPost(data) {
  return async (dispatch) => {
    let response = await Api.post('/api/posts/add', data);

    if(response.success) {
      history.push('/posts');
    }

    dispatch({
      type: types.SET_RESPONSE_ERRORS,
      res: response,
    });
  };
}

export function editPost(id, data) {
  return async (dispatch) => {
    let response = await Api.put(`/api/post/edit/${id}`, data);

    if(response.success) {
      history.push('/posts');
    } else {
      dispatch({
        type: types.SET_RESPONSE_ERRORS,
        res: response,
      });
    }
  };
}

export function getPosts() {
  return async (dispatch) => {
    let response = await Api.get('/api/posts');

    dispatch({
      type: types.SET_RESPONSE,
      res: response,
    });
  };
}

export function getPostById(id) {
  return async (dispatch) => {
    let response = await Api.get(`/api/post/${id}`);

    if(!response.success) {
      history.push("/posts");
    }
    dispatch({
      type: types.SET_RESPONSE,
      res: response,
    });
  };
}

export function removePost(id) {
  return async (dispatch) => {
    let response = await Api.delete(`/api/post/${id}`);

    if(response.success) {
      dispatch({
        type: types.DELETE_POST,
        res: {id: id},
      });
    }
  };
}

export function removeErrors() {
  return {
    type: types.REMOVE_ERRORS,
  };
}
