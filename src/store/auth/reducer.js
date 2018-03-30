import { types } from './actions';

const initialState = {
  errors: {},
  message: "",
  success: false,
  user: {},
};

function setResponse(state, response) {
  const newState = Object.assign({}, state, response);
  return newState;
}

function removeErrors(state) {
  const newState = Object.assign({}, state);
  newState.errors = {};
  newState.message = '';
  return newState;
}

export default function reduce(state = initialState, action = {}) {
  switch (action.type) {

  case types.REMOVE_ERRORS:
    return removeErrors(state);

  case types.SET_RESPONSE:
    return setResponse(state, action.res);

  default:
    return state;
  }
}
