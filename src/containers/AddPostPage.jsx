import React from 'react';
import { connect } from 'react-redux';

import * as AuthSelectors from '../store/auth/selectors';
import * as PostsActions from '../store/posts/actions';
import * as PostsSelectors from '../store/posts/selectors';

import AddPostForm from '../components/AddPostForm.jsx';

class AddPostPage extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      post: {
        title: '',
        text: '',
      },
    };

    this.onSubmit = this.onSubmit.bind(this);
    this.changePost = this.changePost.bind(this);
  }

  componentWillUnmount() {
    this.props.removeErrors();
  }

  onSubmit(event) {
    event.preventDefault();
    this.props.addNewPost(this.state.post);
  }

  changePost(event) {
    const field = event.target.name;
    const post = this.state.post;
    post[field] = event.target.value;

    this.setState({
      post,
    });
  }

  render() {
    return (
      <AddPostForm
        name={this.props.user.name}
        onChange={this.changePost}
        onSubmit={this.onSubmit}
        errors={this.props.errors}
      />
    );
  }
}


function mapStateToProps(state) {
  return {
    user: AuthSelectors.getUser(state),
    errors: PostsSelectors.getErrors(state),
  };
}

function mapDispatchToProps(dispatch) {
  return {
    addNewPost: (postData) => {
      dispatch(PostsActions.addNewPost(postData));
    },
    removeErrors: () => {
      dispatch(PostsActions.removeErrors());
    },
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(AddPostPage);
