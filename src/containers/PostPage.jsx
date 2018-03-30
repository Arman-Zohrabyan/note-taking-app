import React from 'react';
import { connect } from 'react-redux';
import Post from '../components/Post.jsx';

import * as PostsSelectors from '../store/posts/selectors';
import * as PostsActions from '../store/posts/actions';


class PostPage extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      id: props.match.params._id
    }
  }
  
  componentDidMount() {
    this.props.getPostById(this.state.id);
  }

  render() {
    const post = this.props.post(this.state.id);
    return (
      <Post post={post} />
    );
  }
}


function mapStateToProps(state) {
  return {
    post: (id) => PostsSelectors.getPostById(state, id),
  };
}

function mapDispatchToProps(dispatch) {
  return {
    getPostById: (id) => {
      dispatch(PostsActions.getPostById(id));
    },
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(PostPage);
