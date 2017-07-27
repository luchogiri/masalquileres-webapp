import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { browserHistory } from 'react-router';

// Import Style
import styles from './App.css';

// Import Components
import Helmet from 'react-helmet';
import DevTools from './components/DevTools';
import Header from './components/Header/Header';
import Footer from './components/Footer/Footer';

// Import Actions
import { toggleAddPost } from './AppActions';
import { switchLanguage } from '../../modules/Intl/IntlActions';
import { loginRequest, logout, loginIfToken, signUpRequest, facebookLoginRequest } from '../User/UserActions';
import { addPosts, fetchPosts } from '../Post/PostActions'

export class App extends Component {
  constructor(props) {
    super(props);
    this.state = { isMounted: false };
  }

  componentDidMount() {
    this.setState({ isMounted: true }); // eslint-disable-line
    this.props.dispatch(loginIfToken());
  }

  handleLogin = (email, password) => {
    return this.props.dispatch(loginRequest({
      email,
      password
    })).then(() => {
      browserHistory.replace('/');
    });
  };

  handleLogout = () => {
    this.props.dispatch(logout());
    this.props.dispatch(addPosts([]));
    browserHistory.replace('/');
  };

  handleRegister = (email, password) => {
    return this.props.dispatch(signUpRequest({
      email,
      password
    })).then(() => {
      browserHistory.replace('/');
    });
  };

  handleFacebookLogin = (data) => {
    return this.props.dispatch(facebookLoginRequest({
      data
    })).then(() => {
      browserHistory.replace('/');
    });
  };

  render() {
    return (
      <div>
        {/*{this.state.isMounted && !window.devToolsExtension && process.env.NODE_ENV === 'development' && <DevTools />}*/}
        <div>
          <Helmet
            title="Más alquileres"
            meta={[
              { charset: 'utf-8' },
              {
                'http-equiv': 'X-UA-Compatible',
                content: 'IE=edge',
              },
              {
                name: 'viewport',
                content: 'width=device-width, initial-scale=1',
              },
            ]}
            link={[
              {
                rel: 'stylesheet',
                href: 'https://maxcdn.bootstrapcdn.com/font-awesome/4.7.0/css/font-awesome.min.css'
              },
              {
                rel: 'stylesheet',
                href: 'https://fonts.googleapis.com/css?family=Vollkorn:400,700'
              },
              {
                rel: 'stylesheet',
                href: 'https://fonts.googleapis.com/css?family=Montserrat:300,400,700'
              },
              {
                rel: 'stylesheet',
                href: 'https://maxcdn.bootstrapcdn.com/bootstrap/latest/css/bootstrap.min.css'
              }
            ]}
            script={[
              {
                type: 'text/javascript',
                src: 'https://maps.googleapis.com/maps/api/js?key=AIzaSyCJ37fsXvzbwC45eGbyfEUr9_Nnsk6Yt9o&libraries=places'
              }
            ]}
            style={[
              { type: "text/css",
                cssText:
                  `.pagination ul {
                    display: inline-block;
                    padding-left: 15px;
                    padding-right: 15px;
                  }

                  .pagination .disabled {
                    font-weight: 100;
                  }

                  .pagination li {
                    display: inline-block;
                    margin-left: 15px;
                    cursor: pointer;
                    width: 30px;
                    text-align: center;
                  }

                  .pagination li.active {
                    font-weight: bold !important;
                    border-radius: 10px;
                    color: white;
                    background: grey;
                  }

                  .pagination li.previous, li.next {
                    background: white !important;
                    width: 90px;
                  }

                  .pagination .break a {
                    cursor: default;
                  }
                  `
                }
            ]}
          />
          <Header
            switchLanguage={lang => this.props.dispatch(switchLanguage(lang))}
            intl={this.props.intl}
            handleRegister={this.handleRegister}
            handleLogin={this.handleLogin}
            handleLogout={this.handleLogout}
            handleFacebookLogin={this.handleFacebookLogin}
            logged={!!this.props.user._id}
            user={this.props.user}
          />
          <div className={styles.container}>
            { this.props.children }
          </div>
          <Footer />
        </div>
      </div>
    );
  }
}

App.contextTypes = {
  router: React.PropTypes.object,
};

App.propTypes = {
  children: PropTypes.object.isRequired,
  dispatch: PropTypes.func.isRequired,
  intl: PropTypes.object.isRequired,
};

// Retrieve data from store as props
function mapStateToProps(store) {
  return {
    intl: store.intl,
    user: store.user,
  };
}

export default connect(mapStateToProps)(App);
