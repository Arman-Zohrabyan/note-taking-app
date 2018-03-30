import React from 'react';
import {Card, CardActions, CardTitle, CardText} from 'material-ui/Card';
import FlatButton from 'material-ui/FlatButton';
import history from '../history.js';

const styles = {
  cardStyle: {
    marginTop: 20,
    marginBottom: 20,
  },
  img: {
    width: "100%",
  },
};

export default class Post extends React.Component {
  handleClick(link) {
    history.push(link);
  }

  render() {
    const { post } = this.props;
    return (
        <div className="container">
          <div className="row">
            <Card style={styles.cardStyle}>
              <img style={styles.img} src={post.image} alt="img" />
              <CardTitle title={post.publisherName} subtitle={post.title} />
              <CardText>{post.text}</CardText>
              <CardActions>
                <FlatButton label="Back To Posts" onClick={this.handleClick.bind(this, "/posts")} />
              </CardActions>
            </Card>
          </div>
        </div>
    );
  }
}