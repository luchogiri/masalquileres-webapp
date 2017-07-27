import React, { Component } from 'react';

import { connect } from 'react-redux';

// Import Style
import styles from './Login.css';

import img1 from '../../assets/header_login.png';
import img2 from '../../assets/login_icon_fb.png';
import img3 from '../../assets/login_icon_g.png';

export class Login extends Component {

  render() {
    return(
      <div>
        <div className={styles.boxMain}>
          <img src={img1} className={styles.img100} />
          <div className={styles.accesos}>
            <div className={styles.accesoTxtR}>
              <span>registro</span>
              <i>&nbsp;</i>
            </div>
            <div className={styles.accesoTxtL}>
              <span>login</span>
            </div>
          </div>


          <div className={styles.formulario}>
            <p className={styles.txt}>
              <span>¿Olvidaste tu clave?</span><br />
              Ingresa el e-mail o usuario con el que te registraste y te ayudaremos.
            </p>
            <input type="text" placeholder="Repetir Clave" />
            <div className={styles.colCenter}>
              <button>entrar</button>
            </div>
          </div>
{/*  */}
{/*
          <div className={styles.formulario}>
            <input type="text" placeholder="Email" />
            <input type="text" placeholder="Clave" />

            <div className={styles.col1}>
              <button>entrar</button>
            </div>
            <div className={styles.col2}>
              <p>o registrarse con</p>
              <ul>
                <li><img src={img2} /></li>
                <li><img src={img3} /></li>
              </ul>
            </div>
          </div>
*/}
{/*
<div className={styles.formulario}>
  <input type="text" placeholder="Email" />
  <input type="text" placeholder="Clave" />
  <input type="text" placeholder="Repetir Clave" />

  <div className={styles.col1}>
    <button>entrar</button>
  </div>
  <div className={styles.col2}>
    <p>o registrarse con</p>
    <ul>
      <li><img src={img2} /></li>
      <li><img src={img3} /></li>
    </ul>
  </div>
</div>
*/}
        </div>
      </div>
    );
  }

}

export default connect(state => state)(Login);
