import React from 'react';
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';

const raisedButtonStyle = {
  marginTop: 20
};

export default class AddPostForm extends React.Component {
  render() {
    return (
        <div className="container">
          <div className="row">
            <div className="col-xs-12">
              <form onSubmit={this.props.onSubmit}>
                <TextField
                  hintText="User Name"
                  floatingLabelText="User Name"
                  value={this.props.name}
                  disabled={true}
                  fullWidth={true}
                  multiLine={true}
                />
                <TextField
                  onChange={this.props.onChange}
                  errorText={this.props.errors.title}
                  name="title"
                  hintText="Title"
                  floatingLabelText="Post Title"
                  fullWidth={true}
                  multiLine={true}
                />
                <TextField
                  onChange={this.props.onChange}
                  errorText={this.props.errors.text}
                  name="text"
                  floatingLabelText="Text"
                  fullWidth={true}
                  multiLine={true}
                />
                <RaisedButton type="submit" label="Add Post" primary={true} fullWidth={true} style={raisedButtonStyle} />
              </form>
            </div>
          </div>
        </div>
    );
  }
}

