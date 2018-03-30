export function getErrors(state) {
  return state.auth.errors;
}

export function getMessageData(state) {
  return {
    message: state.auth.message,
    success: state.auth.success,
  };
}

export function getUser(state) {
  return state.auth.user;
}

export function getUserId(state) {
  return state.auth.user._id;
}
