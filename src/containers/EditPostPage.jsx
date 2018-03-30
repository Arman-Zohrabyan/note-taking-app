import React from 'react';
import { connect } from 'react-redux';

import * as AuthSelectors from '../store/auth/selectors';
import * as PostsActions from '../store/posts/actions';
import * as PostsSelectors from '../store/posts/selectors';

import EditPostForm from '../components/EditPostForm.jsx';

class EditPostPage extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      id: props.match.params._id,
      post: {
        title: '',
        text: '',
      },
    };

    this.onSubmit = this.onSubmit.bind(this);
    this.changePost = this.changePost.bind(this);
  }
  
  componentDidMount() {
    this.props.getPostById(this.state.id);
  }

  componentWillReceiveProps(nextProps) {
    const currentData = nextProps.post(this.state.id);
    const post = {
      title: currentData.title,
      text: currentData.text,
    };
    this.setState({post: post});
  }

  componentWillUnmount() {
    this.props.removeErrors();
  }

  onSubmit(event) {
    event.preventDefault();
    this.props.editPost(this.state.id, this.state.post);
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
      <EditPostForm
        name={this.props.user.name}
        values={this.state.post}
        onChange={this.changePost}
        onSubmit={this.onSubmit}
        errors={this.props.errors}
      />
    );
  }
}


function mapStateToProps(state) {
  return {
    post: (id) => PostsSelectors.getPostById(state, id),
    user: AuthSelectors.getUser(state),
    errors: PostsSelectors.getErrors(state),
  };
}

function mapDispatchToProps(dispatch) {
  return {
    editPost: (id, postData) => {
      dispatch(PostsActions.editPost(id, postData));
    },
    getPostById: (id) => {
      dispatch(PostsActions.getPostById(id));
    },
    removeErrors: () => {
      dispatch(PostsActions.removeErrors());
    },
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(EditPostPage);
