import React from 'react';
import { Link } from 'react-router';

import styles from './PostTabs.css';

export default function PostTabs(props) {

  return(
    <div className={styles['tab-container']}>
      <a href='#' className={`${styles['tab']} ${styles[props.activeTab('main')]}`}
         onClick={props.setActive('main')}>
        Características
      </a>
      <a href='#' className={`${styles['tab']} ${styles[props.activeTab('photos')]}`}
         onClick={props.setActive('photos')}>
        Fotos & Videos
      </a>
      <a href='#' className={`${styles['tab']} ${styles[props.activeTab('location')]}`}
         onClick={props.setActive('location')}>
        Ubicación
      </a>
      <a href='#' className={`${styles['tab']} ${styles[props.activeTab('conditions')]}`}
         onClick={props.setActive('conditions')}>
        Condiciones
      </a>
    </div>
  );

}
