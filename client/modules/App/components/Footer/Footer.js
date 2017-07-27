import React from 'react';
import { Link } from 'react-router';
import { FormattedMessage } from 'react-intl';

// Import Style
import styles from './Footer.css';
import LogoFooter from '../../../../assets/logo_footer.png';

export function Footer() {
  return (

    <div className={styles.footer}>
      <div className={styles.cols}>
        <div className={styles.col1}>
          <img src={LogoFooter}/>
        </div>
        <div className={styles.col2}>
          <ul>
            <li><Link to="/about" >quienes somos</Link></li>
            <li><Link to="/services" >servicios</Link></li>
            <li><Link to="/contact" >contacto</Link></li>
          </ul>
        </div>
      </div>
      <div className={styles.col100}>
        <p>+alquileres.com 2017 Todos los derechos reservados</p>
      </div>
    </div>
  );
}

export default Footer;
