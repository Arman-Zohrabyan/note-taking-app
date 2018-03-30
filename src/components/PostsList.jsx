import React, { Fragment } from 'react';
import {Card, CardActions, CardHeader} from 'material-ui/Card';
import FlatButton from 'material-ui/FlatButton';


const styles = {
  cardSubtitle: {
    paddingTop: 8,
  }
};

export default class PostsList extends React.Component {
  render() {
    const {posts, userId} = this.props;
    return (
        <div className="container">
          <div className="row">
          {
            posts.map( (post, key) =>
              <div className="col-xs-12 col-md-6 card" key={key}>
                <Card>
                  <CardHeader
                    title={post.publisherName}
                    subtitle={post.title}
                    actAsExpander={true}
                    subtitleStyle={styles.cardSubtitle}
                  />
                  <CardActions>
                    <FlatButton label="Show More" onClick={this.props.redirect.bind(this, `/post/${post._id}`)} />
                    {
                      post.publisherId===userId ?
                      <Fragment>
                        <FlatButton label="Delete" secondary={true} onClick={this.props.removePost.bind(this, post._id)} />
                        <FlatButton label="Edit" primary={true} onClick={this.props.redirect.bind(this, `/post/edit/${post._id}`)} />
                      </Fragment> : null
                    }
                  </CardActions>
                </Card>
              </div>
            )
          }
          </div>
        </div>
    );
  }
}

