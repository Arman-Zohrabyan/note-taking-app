export function getErrors(state) {
  return state.posts.errors;
}

export function getPosts(state) {
  return state.posts.posts;
}


export function getPostById(state, id) {
  return state.posts.posts.filter(post => post._id===id)[0] || {};
}
