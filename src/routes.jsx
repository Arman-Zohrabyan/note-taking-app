import React from 'react';
import { Route, Redirect, Switch } from 'react-router';

import Layout from './containers/Layout.jsx';
import ErrorPage from './components/ErrorPage.jsx';

import LoginPage from './containers/LoginPage.jsx';
import SignUpPage from './containers/SignUpPage.jsx';
import HomePage from './containers/HomePage.jsx';
import AddPostPage from './containers/AddPostPage.jsx';
import EditPostPage from './containers/EditPostPage.jsx';
import PostPage from './containers/PostPage.jsx';

import Auth from './modules/Auth';



const logOut = (nextState, replace) => {
  Auth.deauthenticateUser();
  return <Redirect to="/login"/>
};

export default (
  <div>
    <header>
      <Route component={Layout} />
    </header>

    <main>
      <Switch>
        <Redirect from="/" exact to="/login" />
        <Route path="/logout" exact render={logOut} />
        
        <Route path="/login" exact component={LoginPage} />
        <Route path="/signup" exact component={SignUpPage} />

        <Route path="/posts" exact component={HomePage} />
        <Route path="/post/edit/:_id" component={EditPostPage} />
        <Route path="/post/add" exact component={AddPostPage} />
        <Route path="/post/:_id" component={PostPage} />
        <Route path="/*" component={ErrorPage} />
      </Switch>
    </main>
  </div>
);

