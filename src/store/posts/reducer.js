import { types } from './actions';

const initialState = {
  posts: [],
  errors: {},
};

function setResponse(state, response) {
  const newState = Object.assign({}, state, response);
  return newState;
}

function setErrors(state, response) {
  const newState = Object.assign({}, state);
  newState.errors = response.errors || {};
  return newState;
}

function deletePost(state, id) {
  const posts = state.posts.filter(post => post._id!==id);
  const newState = Object.assign({}, state);
  newState.posts = posts;
  return newState;
}

function removeErrors(state) {
  const newState = Object.assign({}, state);
  newState.errors = {};
  return newState;
}

export default function reduce(state = initialState, action = {}) {
  switch (action.type) {

  case types.REMOVE_ERRORS:
    return removeErrors(state);

  case types.SET_RESPONSE:
    return setResponse(state, action.res);

  case types.SET_RESPONSE_ERRORS:
    return setErrors(state, action.res);

  case types.DELETE_POST:
    return deletePost(state, action.res.id);

  default:
    return state;
  }
}
