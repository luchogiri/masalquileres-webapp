import React, {PropTypes, Component} from 'react';
import FacebookLogin from 'react-facebook-login';

// Import Style
import styles from './UserLogin.css';

import img1 from '../../../../assets/header_login.png';
import img2 from '../../../../assets/modal_face.png';
import imgcerrar from '../../../../assets/btncerrarpop.png';
import modal_logo from '../../../../assets/modal_logo.png';
import Config from '../../../../../server/config';

class UserLogin extends Component {

  constructor(props) {
    super(props);
    this.state = {error: false, msg: '', toogleTabLogin: true};
  }

  setField = (field) => {
    return (value) => {
      this.setState({
        [field]: value.target.value
      });
    };
  };

  handleLogin = (e) => {
    e.preventDefault();
    this.setState({error: false, msg: ''});
    this.props.handleLogin(this.state.email, this.state.password)
      .catch((err) => {
        this.setState({
          error: true,
          msg: err.msg
        });
      });
  };

  handleRegister = (e) => {
    e.preventDefault();

    if (this.state.password !== this.state.password2) {
      this.setState({
        error: true,
        msg: 'Password does not match'
      });
      return;
    }

    this.props.handleRegister(this.state.email, this.state.password)
      .catch((err) => {
        this.setState({
          error: true,
          msg: err.msg
        });
      });
  };

  handleFacebookLogin = (data) => {
    this.setState({error: false, msg: ''});
    this.props.handleFacebookLogin({
      ...data,
      facebook_id: data.id
    }).catch((err) => {
      this.setState({
        error: true,
        msg: err.msg
      });
    });
  };

  handleLogout = () => {
    this.props.handleLogout();
  };

  toogleTab = () => {
    this.setState({
      toogleTabLogin: !this.state.toogleTabLogin,
      error: false,
      msg: ''
    });
  };

  handleClose = () => {
    this.setState({
      toClose: true
    });
    setTimeout(this.props.handleClose, 350);
  };

  render() {

    return (
      <div className={`${styles['bgpopup']} ${ styles.animated } ${ styles.fadeIn } ${ this.state.toClose && styles.fadeOut }`}>
        <div className={ `${styles.popupwindow}` }>
          <div className={styles.boxContainer}>
            <div className={styles.boxMain}>
              <span onClick={this.handleClose} className={styles.btnCerrar}>
                <img src={imgcerrar} className={styles.img100}/>
              </span>
              <img src={img1} className={styles.img100}/>
              <img src={modal_logo} className={styles.modalLogo}/>
              <div className={styles.accesos}>
                <div className={styles.accesoTxtR}>
                  {
                    (this.state.toogleTabLogin) ?
                      <div>
                        <span className={styles.nonselected}><button onClick={this.toogleTab}>registro</button></span>
                        <i>&nbsp;</i>
                      </div>
                      :
                      <span><button onClick={this.props.handleRegis}>registro</button></span>
                  }
                </div>
                <div className={styles.accesoTxtL}>
                  {
                    (!this.state.toogleTabLogin) ?
                      <div>
                        <span className={styles.nonselected}><button onClick={this.toogleTab}>login</button></span>
                        <i>&nbsp;</i>
                      </div>
                      :
                      <span><button onClick={this.props.handleLogin}>login</button></span>
                  }
                </div>
              </div>
              <div className={styles.formulario}>
                {
                  (this.state.toogleTabLogin) ?
                    <div>
                      <input type="text" placeholder="Email" onChange={this.setField('email')}/>
                      <input type="password" placeholder="Clave" onChange={this.setField('password')}/>
                    </div>
                    :
                    <div>
                      <input type="text" placeholder="Email" onChange={this.setField('email')}/>
                      <input type="password" placeholder="Clave" onChange={this.setField('password')}/>
                      <input type="password" placeholder="Repetir Clave" onChange={this.setField('password2')}/>
                    </div>
                }
                <div className={styles.error}>
                  { this.state.msg }
                </div>
                <div className={styles.col1}>
                  <button style={{padding: '15px 40px'}}
                          onClick={this.state.toogleTabLogin ? this.handleLogin : this.handleRegister}>
                    entrar
                  </button>
                </div>
                <div className={styles.col2}>
                  <p>o registrarse con</p>
                  <ul>
                    <li className={ styles.facebook }>
                      <FacebookLogin
                        appId={Config.facebookAppID}
                        autoLoad={false}
                        fields="first_name,last_name,email,picture"
                        cssClass="facebook-icon"
                        icon={<img src={img2}/>}
                        callback={this.handleFacebookLogin}
                        textButton=""/>
                    </li>
                    {/*<li><img src={img3} /></li>*/}
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

UserLogin.need = [];

UserLogin.propTypes = {
  handleRegister: PropTypes.func.isRequired,
  handleLogin: PropTypes.func.isRequired,
  handleFacebookLogin: PropTypes.func.isRequired,
  handleLogout: PropTypes.func.isRequired,
  handleClose: PropTypes.func.isRequired,
  logged: PropTypes.bool.isRequired
};

export default UserLogin;
