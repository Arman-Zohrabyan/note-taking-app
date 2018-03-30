import history from '../../history.js';
import Api from '../../services/Api';
import Auth from '../../modules/Auth';

export const types = {
  REMOVE_ERRORS: 'Auth.REMOVE_ERRORS',
  REMOVE_NOTIFY: 'Auth.REMOVE_NOTIFY',
  SET_RESPONSE: 'Auth.SET_RESPONSE',
};

export function logIn(data) {
  return async (dispatch) => {
    let response = await Api.post('/auth/login', data);

    if(response.success) {
      Auth.authenticateUser(response.token);
      response.message = "";
      history.push('/posts');
    }

    dispatch({
      type: types.SET_RESPONSE,
      res: response,
    });
  };
}

export function register(data) {
  return async (dispatch) => {
    let response = await Api.post('/auth/signup', data);

    if(response.success) {
      history.push('/login');
    }

    dispatch({
      type: types.SET_RESPONSE,
      res: response,
    });
  };
}

export function getCurrentUser() {
  return async (dispatch) => {
    let response = await Api.get('/auth/user');

    if(!response.success) {
      Auth.deauthenticateUser();
      history.push('/');
    }

    dispatch({
      type: types.SET_RESPONSE,
      res: response,
    });
  };
}

export function removeErrors() {
  return {
    type: types.REMOVE_ERRORS,
  };
}
