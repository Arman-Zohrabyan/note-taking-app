import React from 'react';
import { Link } from 'react-router-dom';
import { Card, CardText } from 'material-ui/Card';
import RaisedButton from 'material-ui/RaisedButton';
import TextField from 'material-ui/TextField';

export default class LoginForm extends React.Component {

  render() {
    const {onSubmit, messageData, onChange, user} = this.props;

    return(
      <Card className="auth-container">
        <form action="/" onSubmit={onSubmit}>
          <h2 className="card-heading">Login</h2>

          {
            messageData.success ?
              <p className="success-message">{messageData.message}</p> :
              <p className="error-message">{messageData.message}</p>
          }

          <div className="field-line">
            <TextField
              floatingLabelText="Email"
              name="email"
              onChange={onChange}
              value={user.email}
            />
          </div>

          <div className="field-line">
            <TextField
              floatingLabelText="Password"
              type="password"
              name="password"
              onChange={onChange}
              value={user.password}
            />
          </div>

          <div className="button-line">
            <RaisedButton type="submit" label="Log in" primary />
          </div>

          <CardText>Don't have an account? <Link to={'/signup'}>Create one</Link>.</CardText>
        </form>
      </Card>
    );
  }
}
