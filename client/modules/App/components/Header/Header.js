import React, { Component, PropTypes } from 'react';
import { Link } from 'react-router';
import { connect } from 'react-redux';
import { browserHistory } from 'react-router';

import FontAwesome from 'react-fontawesome';

import { toogleLoginPopup } from '../../AppActions';

import UserLogin from '../../../User/components/UserLogin/UserLogin';

import LogoImg from '../../../../assets/header-logo.png';
import AvatarImg from '../../../../assets/avatar.png';

// Import Style
import styles from './Header.css';

class Header extends Component {

  state = {};

  constructor(props, context) {
    super(props, context);
    this.context = context;
  }

  handleToggleLogin = (e) => {
    e.preventDefault();
    if (!!this.props.user._id) {
      browserHistory.replace(`/profile/${this.props.user._id}`);
    } else {
      this.props.dispatch(toogleLoginPopup());
    }
  };

  handleRegister = (email, password) => {
    return this.props.handleRegister(email, password).then(() => {
      this.props.dispatch(toogleLoginPopup(false));
    });
  };

  handleLogin = (email, password) => {
    return this.props.handleLogin(email, password).then(() => {
      this.props.dispatch(toogleLoginPopup(false));
    });
  };

  handleFacebookLogin = (data) => {
    return this.props.handleFacebookLogin(data).then(() => {
      this.props.dispatch(toogleLoginPopup(false));
    });
  };

  handleClose = () => {


    this.props.dispatch(toogleLoginPopup());

  };

  handlePublicar = () => {
    if(this.props.user.terms_accepted && this.props.user.plan) {
      browserHistory.replace('/posts/create');
    } else {
      browserHistory.replace('/plans');
    }
  };

  render() {
    return (
      <div className={`${styles.header} ${this.state.openNav ? styles.showHeader : styles.hideHeader}`}
           style={ { position: this.context.router.isActive('/', true) ? 'fixed' : 'relative' } }>
        <div className={`${styles.content} ${this.state.openNav === undefined ? '' : this.state.openNav ? styles.showNavContent : styles.hideNavContent}`}>
          <Link className={styles.imglogo} to="/">
            <img src={LogoImg}/>
          </Link>
          <span className={styles[ 'site-title' ]}>
            masalquileres.com
          </span>
          <div className={ `${styles[ 'nav' ]} ${this.state.openNav === undefined ? '' : this.state.openNav ? styles.showNav : styles.hideNav}` }>
            <div className={styles[ 'nav-item' ]}>
              <Link to="/about">QUIENES SOMOS</Link>
            </div>
            {/*<div className={styles[ 'nav-item' ]}>*/}
              {/*<Link to="/services">SERVICIOS</Link>*/}
            {/*</div>*/}
            <div className={styles[ 'nav-item' ]}>
              <Link to="/contact">CONTACTO</Link>
            </div>
            {
              this.props.logged &&
              <div className={styles[ 'nav-item' ]}>
                <a href="#" onClick={this.handlePublicar}>PUBLICAR</a>
              </div>
            }
            {/*{*/}
            {/*this.props.logged &&*/}
            {/*<div className={styles['nav-item']}>*/}
            {/*<Link to={`/posts/user/${this.props.user._id}`}>MIS ANUNCIOS</Link>*/}
            {/*</div>*/}
            {/*}*/}
            {
              this.props.logged &&
              <div className={styles[ 'nav-item' ]}>
                <a href="#" onClick={this.props.handleLogout}>LOG OUT</a>
              </div>
            }
            {/*<div className={styles['nav-item']}>*/}
            {/*{*/}
            {/*this.props.logged && <span>¡Hola { this.props.user.first_name || this.props.user.email }!</span>*/}
            {/*}*/}
            {/*</div>*/}
          </div>
          <div className={styles[ 'nav-item-bars' ]} onClick={() => this.setState({ openNav: !this.state.openNav })}>
            <FontAwesome
              name='bars'
              size='2x'
              style={{}}
            />
          </div>
          <div className={styles[ 'avatar' ]}>
            <a href="#" onClick={this.handleToggleLogin}>
              <img
                src={ this.props.user.avatar || this.props.user.facebook_id && `http://graph.facebook.com/${ this.props.user.facebook_id }/picture` || AvatarImg }/>
            </a>
          </div>
        </div>
        {
          (this.props.isLogginPopupOn) &&
          <UserLogin
            handleRegister={this.handleRegister}
            handleLogin={this.handleLogin}
            handleLogout={this.props.handleLogout}
            handleFacebookLogin={this.handleFacebookLogin}
            handleClose={this.handleClose}
            logged={this.props.logged}/>
        }
      </div>
    );
  }

  // languageNodes = props.intl.enabledLanguages.map(
  //   lang => <li key={lang} onClick={() => props.switchLanguage(lang)} className={lang === props.intl.locale ? styles.selected : ''}>{lang}</li>
  // );
}

Header.contextTypes = {
  router: React.PropTypes.object,
};

Header.propTypes = {
  handleRegister: PropTypes.func.isRequired,
  handleLogin: PropTypes.func.isRequired,
  handleFacebookLogin: PropTypes.func.isRequired,
  handleLogout: PropTypes.func.isRequired,
  switchLanguage: PropTypes.func.isRequired,
  intl: PropTypes.object.isRequired,
};

// Retrieve data from store as props
function mapStateToProps(store) {
  return {
    isLogginPopupOn: store.app.loginPopup,
    user: store.user,
    logged: !!store.user._id
  };
}

export default connect(mapStateToProps)(Header);
