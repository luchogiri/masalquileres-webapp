import React, { Component } from 'react';

import { connect } from 'react-redux';

import { browserHistory } from 'react-router';

// Import Style
import styles from './Services.css';

import imgHeader from '../../assets/header_servicios.png';
import imgService1 from '../../assets/ico_services_1.png';
import imgService2 from '../../assets/ico_services_2.png';
import imgService3 from '../../assets/ico_servicios_3.png';
import imgService4 from '../../assets/img_services_1.png';
import imgService5 from '../../assets/img_services_2.png';
import imgService6 from '../../assets/img_services_3.png';

export class Services extends Component {

  handleClick = () => {
    browserHistory.push(`/contact`);
  };

  render() {
    return(
      <div>
        <div className={styles.boxHeader} style={{ background: `#FFF url(${imgHeader}) center no-repeat`, backgroundSize: 'cover' }}>
          <div className={styles.infoHead}>
            <h2>Servicios</h2>
            <span className={styles.borderBottomTitle}></span>
            <p>
              masalquileres.com es una plataforma de encuentro entre propietarios, inmobiliaria y los interesados
              en alquilar cualquier tipo de inmueble en la Ciudad Autónoma de Buenos Aires y en Zona Norte del Gran Buenos Aires.
            </p>
          </div>
        </div>

        <div className={styles.boxServices}>
          <div className={styles.boxService}>
            <img src={imgService1} />
            <h4>plan gratuito</h4>
            <p>
              Lorem ipsum dolor sit amet, consectetuer adipiscing elit,
            </p>
            <p>
              <span onClick={this.handleClick}>publicar</span>
            </p>
          </div>
          <div className={styles.boxService}>
            <img src={imgService2} />
            <h4>verificación de propiedad</h4>
            <p>
              Lorem ipsum dolor sit amet, consectetuer adipiscing elit,
            </p>
            <p>
              <span onClick={this.handleClick}>contratar</span>
            </p>
          </div>
          <div className={styles.boxService}>
            <img src={imgService3} />
            <h4>informe de dominio</h4>
            <p>
              Lorem ipsum dolor sit amet, consectetuer adipiscing elit,
            </p>
            <p>
              <span onClick={this.handleClick}>contratar</span>
            </p>
          </div>
        </div>

        <div className={styles.box5050}>

          <div className={styles.row}>
            <div className={styles.row50}>
              <h2>videos 360</h2>
              <span className={styles.borderBottomTitle}></span>
              <p>
                masalquileres.com es una plataforma de encuentro entre propietarios, inmobiliaria y los interesados
                en alquilar cualquier tipo de inmueble en la Ciudad Autónoma de Buenos Aires y en Zona Norte del Gran Buenos Aires.
              </p>
              <p className={styles.centrar}>
                <span onClick={this.handleClick}>solicitar servicios</span>
              </p>
            </div>
            <div className={styles.row50}>
              <img src={imgService4} />
            </div>
          </div>

          <div className={styles.row}>
            <div className={styles.row50}>
              <img src={imgService5} />
            </div>
            <div className={styles.row50}>
              <h2>fotografia profesional</h2>
              <span className={styles.borderBottomTitle}></span>
              <p>
                masalquileres.com es una plataforma de encuentro entre propietarios, inmobiliaria y los interesados
                en alquilar cualquier tipo de inmueble en la Ciudad Autónoma de Buenos Aires y en Zona Norte del Gran Buenos Aires.
              </p>
              <p className={styles.centrar}>
                <span onClick={this.handleClick}>solicitar servicios</span>
              </p>
            </div>
          </div>

          <div className={styles.row}>
            <div className={styles.row50}>
              <h2>home staging</h2>
              <span className={styles.borderBottomTitle}></span>
              <p>
                masalquileres.com es una plataforma de encuentro entre propietarios, inmobiliaria y los interesados
                en alquilar cualquier tipo de inmueble en la Ciudad Autónoma de Buenos Aires y en Zona Norte del Gran Buenos Aires.
              </p>
              <p className={styles.centrar}>
                <span onClick={this.handleClick}>solicitar servicios</span>
              </p>
            </div>
            <div className={styles.row50}>
              <img src={imgService6} />
            </div>
          </div>

        </div>

      </div>
    );
  }

}

export default connect(state => state)(Services);
