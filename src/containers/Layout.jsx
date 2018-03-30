import React, { Fragment } from 'react';
import history from '../history.js';
import AppBar from 'material-ui/AppBar';
import FlatButton from 'material-ui/FlatButton';
import { connect } from 'react-redux';

import * as AuthActions from '../store/auth/actions';

import Auth from '../modules/Auth';


const buttonStyle = {
  backgroundColor: 'transparent',
  marginTop: '14px',
  color: 'white',
};

class Layout extends React.Component {

  handleActive(link) {
    history.push(link);
  }

  componentDidMount() {
    if(Auth.isUserAuthenticated()) {
      this.props.getUserData();
    } 
  }

  render() {
    return(
      <Fragment>
        <AppBar title="TEST" showMenuIconButton={false}>
          {
            Auth.isUserAuthenticated() ? (
              <Fragment>
                <FlatButton label="Add Post" style={buttonStyle} onClick={this.handleActive.bind(this, "/post/add")} />
                <FlatButton label="Posts" style={buttonStyle} onClick={this.handleActive.bind(this, "/posts")} />
                <FlatButton label="Log Out" style={buttonStyle} onClick={this.handleActive.bind(this, "/logout")} />
              </Fragment>
            ) : (
              <Fragment>
                <FlatButton label="Log In" style={buttonStyle} onClick={this.handleActive.bind(this, "/login")} />
                <FlatButton label="Sign Up" style={buttonStyle} onClick={this.handleActive.bind(this, "/signup")} />
              </Fragment>
            )
          }
        </AppBar>
        {this.props.children}
      </Fragment>
    );
  }
}


function mapStateToProps(state) {
  return {
  };
}

function mapDispatchToProps(dispatch) {
  return {
    getUserData: () => {
      dispatch(AuthActions.getCurrentUser());
    },
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Layout);
