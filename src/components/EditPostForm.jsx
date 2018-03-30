import React from 'react';
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';

const raisedButtonStyle = {
  marginTop: 20
};

export default class EditPostForm extends React.Component {
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
                  value={this.props.values.title}
                  name="title"
                  hintText="Title"
                  floatingLabelText="Post Title"
                  fullWidth={true}
                  multiLine={true}
                />
                <TextField
                  onChange={this.props.onChange}
                  errorText={this.props.errors.text}
                  value={this.props.values.text}
                  name="text"
                  floatingLabelText="Text"
                  fullWidth={true}
                  multiLine={true}
                />
                <RaisedButton type="submit" label="Edit Post" primary={true} fullWidth={true} style={raisedButtonStyle} />
              </form>
            </div>
          </div>
        </div>
    );
  }
}

