import React, { Component } from 'react';

import { connect } from 'react-redux';

// Import Style
import styles from './About.css';

import ico1 from '../../assets/ico_about_1.png';
import ico2 from '../../assets/ico_about_2.png';
import ico3 from '../../assets/ico_about_3.png';

import img1 from '../../assets/quienes01-8.png';
import img3 from '../../assets/footer_about.png';

export class About extends Component {

  render() {
    return (
      <div>

        <div className={styles.boxMain}>
          <div className={styles.columnLeft}>
            <img style={{ width: '100%' }} src={img1}/>
          </div>
          <div className={styles.columnRight}>
            {/*<h2 className={styles.titleh2}>+claro +rápido</h2>*/}
            {/*<span className={styles.borderBottomTitle}></span>*/}
            <p className={styles.copete}>
              masalquileres.com es una plataforma de encuentro entre locadores e interesados en alquilar cualquier tipo
              de inmueble en la zona norte de Capital o del Gran Buenos Aires. La plataforma no es una inmobiliaria ni
              se dedica al corretaje inmobiliario, si no que se limita a poner en contacto entre sí a locadores e
              interesados en alquilar, con la asistencia profesional de una inmobiliaria debidamente matriculada en las
              jurisdicciones de la Ciudad Autónoma de Buenos Aires y de la Provincia de Buenos Aires.
            </p>
            <ul>
              <li>
                <img src={ico1}/>
                <h4>+Transparente</h4>
                <p>
                  Vos elegís las condiciones del alquiler que se publican.
                </p>
              </li>
              <li>
                <img src={ico2}/>
                <h4>+Seguro</h4>
                <p>
                  Verificamos ​tu identidad ​y la ​de los interesados​ para lograr un trato mas seguro para ambas
                  partes.
                </p>
              </li>
              <li>
                <img src={ico3}/>
                <h4>+Fácil</h4>
                <p>
                  Te asistimos durante todo el proceso.
                </p>
              </li>
            </ul>
          </div>
        </div>

        {/*<div className={styles.boxSecond}>*/}
        {/*<div className={styles.centrarImg}>*/}
        {/*<div className={styles.infoImg}>*/}
        {/*<h3 className={styles.title}>Clientes potenciales</h3>*/}
        {/*<p className={styles.txt} style={{ color: 'white', fontSize: '14px' }}>*/}
        {/*Lorem ipsum dolor sit amet, consectetuer adipiscing*/}
        {/*elit, sed diam nonummy nibh euismod tincidunt ut*/}
        {/*laoreet dolore magna aliquam.*/}
        {/*</p>*/}
        {/*<p>*/}
        {/*<span className={styles.link1}>completar formulario</span>*/}
        {/*</p>*/}
        {/*</div>*/}
        {/*</div>*/}
        {/*<div>*/}
        {/*<img src={ img2 }/>*/}
        {/*</div>*/}
        {/*</div>*/}

        <div className={styles.boxThird} style={{ background: `#FFF url(${img3}) center`, backgroundSize: 'cover' }}>
          <div className={styles.centrarImgBg}>
            <h3>¿quiere contactarnos?</h3>
            <span className={styles.borderBottomTitle}></span>
            <p className={styles.txt}>
              Comunicate con nosotros al <span className={styles.txt2}>5275-4500</span> o por correo electrónico a <span className={styles.link}>info@masalquileres.com</span>.
              Muchas gracias.
            </p>
            {/*<p className={styles.txt}>*/}
            {/*<span className={styles.link1}>completar formulario</span>*/}
            {/*</p>*/}
          </div>
        </div>

      </div>
    );
  }

}

export default connect(state => state)(About);
