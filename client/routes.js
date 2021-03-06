/* eslint-disable global-require */
import React from 'react';
import { Route, IndexRoute } from 'react-router';
import App from './modules/App/App';

// require.ensure polyfill for node
if (typeof require.ensure !== 'function') {
  require.ensure = function requireModule(deps, callback) {
    callback(require);
  };
}

/* Workaround for async react routes to work with react-hot-reloader till
  https://github.com/reactjs/react-router/issues/2182 and
  https://github.com/gaearon/react-hot-loader/issues/288 is fixed.
 */
if (process.env.NODE_ENV !== 'production') {
  // Require async routes only in development for react-hot-reloader to work.
  require('./modules/Post/pages/PostListPage/PostListPage');
  require('./modules/Post/pages/PostDetailPage/PostDetailPage');
  require('./modules/User/pages/SignUpPage/SignUpPage');
  require('./modules/User/pages/Profile/Profile');
}

// react-router setup with code-splitting
// More info: http://blog.mxstbr.com/2016/01/react-apps-with-pages/
export default (
  <Route path="/" component={App}>
    <IndexRoute
      getComponent={(nextState, cb) => {
        require.ensure([], require => {
          cb(null, require('./modules/Home/pages/HomePage').default);
        });
      }}
    />
    <Route
      path="/about"
      getComponent={(nextState, cb) => {
        require.ensure([], require => {
          cb(null, require('./modules/About/About').default);
        });
      }}
    />
    <Route
      path="/services"
      getComponent={(nextState, cb) => {
        require.ensure([], require => {
          cb(null, require('./modules/Services/Services').default);
        });
      }}
    />
    <Route
      path="/contact"
      getComponent={(nextState, cb) => {
        require.ensure([], require => {
          cb(null, require('./modules/Contact/Contact').default);
        });
      }}
    />
    <Route
      path="/plans"
      getComponent={(nextState, cb) => {
        require.ensure([], require => {
          cb(null, require('./modules/Plans/PlansPage').default);
        });
      }}
    />
    <Route
      path="/posts"
      getComponent={(nextState, cb) => {
        require.ensure([], require => {
          cb(null, require('./modules/Post/pages/PostListPage/PostListPage').default);
        });
      }}
    />
    <Route
      path="/posts/user/:id"
      getComponent={(nextState, cb) => {
        require.ensure([], require => {
          cb(null, require('./modules/Post/pages/PostUserPage/PostUserPage').default);
        });
      }}
    />
    <Route
      path="/posts/create"
      getComponent={(nextState, cb) => {
        require.ensure([], require => {
          cb(null, require('./modules/Post/pages/PostCreatePage/PostCreatePage').default);
        });
      }}
    />
    <Route
      path="/posts/edit/:id"
      getComponent={(nextState, cb) => {
        require.ensure([], require => {
          cb(null, require('./modules/Post/pages/PostEditPage/PostEditPage').default);
        });
      }}
    />
    <Route
      path="/posts/:id"
      getComponent={(nextState, cb) => {
        require.ensure([], require => {
          cb(null, require('./modules/Post/pages/PostDetailPage/PostDetailPage').default);
        });
      }}
    />
    <Route
      path="/users"
      getComponent={(nextState, cb) => {
        require.ensure([], require => {
          cb(null, require('./modules/User/pages/UserList/UserList').default);
        });
      }}
    />
    <Route
      path="/user/:id"
      getComponent={(nextState, cb) => {
        require.ensure([], require => {
          cb(null, require('./modules/User/pages/UserView/UserView').default);
        });
      }}
    />
    <Route
      path="/signup"
      getComponent={(nextState, cb) => {
        require.ensure([], require => {
          cb(null, require('./modules/User/pages/SignUpPage/SignUpPage').default);
        });
      }}
    />
    <Route
      path="/profile/:id"
      getComponent={(nextState, cb) => {
        require.ensure([], require => {
          cb(null, require('./modules/User/pages/Profile/Profile').default);
        });
      }}
    />
    <Route
      path="/login"
      getComponent={(nextState, cb) => {
        require.ensure([], require => {
          cb(null, require('./modules/Login/Login').default);
        });
      }}
    />
  </Route>
);
