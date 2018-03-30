import React from 'react';
import { connect } from 'react-redux';
import PostsList from '../components/PostsList.jsx';
import history from '../history.js';

import * as PostsActions from '../store/posts/actions';
import * as PostsSelectors from '../store/posts/selectors';
import * as AuthSelectors from '../store/auth/selectors';


class ProfilePage extends React.Component {
  componentDidMount() {
    this.props.getPosts();
  }

  redirect(link) {
    history.push(link);
  }

  render() {
    return (
      <PostsList
        posts={this.props.posts}
        userId={this.props.userId}
        removePost={this.props.removePost}
        redirect={this.redirect}
      />
    );
  }
}


function mapStateToProps(state) {
  return {
    posts: PostsSelectors.getPosts(state),
    userId: AuthSelectors.getUserId(state),
  };
}

function mapDispatchToProps(dispatch) {
  return {
    getPosts: () => {
      dispatch(PostsActions.getPosts());
    },
    removePost: (postId) => {
      dispatch(PostsActions.removePost(postId));
    },
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(ProfilePage);
