import React, { Component } from 'react';

import { connect } from 'react-redux';

import B, { Button } from 'react-bootstrap';

import styles from './Contact.css';

import IconPhone from '../../assets/icon_mobile.png';
import IconMail from '../../assets/icon_mail.png';

import { sendSearchRequest } from './ContactActions';

class ContactPage extends Component {

  constructor(props) {
    super(props);
    this.state = {
      contact: this.emptyContact()
    }
  }

  emptyContact = () => {
    return {
      name: '',
      email: '',
      phone: '',
      comments: ''
    };
  };

  setField(field) {
    return (value) => {
      this.setState({
        contact: { ...this.state.contact, [field]: value.target.value }
      })
    };
  }

  submit = () => {
    this.props.dispatch(sendSearchRequest(this.state.contact))
      .then(res => {
        ga('send', 'event','Contacto', 'Enviar');
        this.setState({
          contact: this.emptyContact()
        });
      });
  };

  render() {
    return(
      <div className={styles['main-container']}>
        <div className={styles['left-container']}>
          <div className={styles['left-container-title']}>
            Contacto
          </div>
          <p className={styles['left-container-text']}>
            ¿Estás listo para alquilar tu inmueble?
            Estamos para asistirte durante todo el proceso.
            Comunicate con nosotros de la forma que prefieras y te responderemos durante el día.
            Muchas gracias.
          </p>
          <div className={styles['contact-info']}>
            <img src={IconPhone} className={styles['contact-info-img-phone']}/>
            <div className={styles['contact-info-text']}>11 5275-4500</div>
          </div>
          <div className={styles['contact-info']}>
            <img src={IconMail} className={styles['contact-info-img-email']}/>
            <div className={styles['contact-info-text']}>info@masalquileres.com</div>
          </div>
        </div>
        <div className={styles['right-container']}>
          <div className={styles['form-container']}>
            <div className={styles['form-title']}>FORMULARIO</div>
            <div className={styles['form-field-container']}>
              <div className={styles['form-label']}>Nombre</div>
              <input className={styles['form-field-input']} type="text"
                     value={this.state.contact.name} onChange={this.setField('name')}/>
            </div>
            <div className={styles['form-field-container']}>
              <div className={styles['form-label']}>Email</div>
              <input className={styles['form-field-input']} type="text"
                     value={this.state.contact.email} onChange={this.setField('email')}/>
            </div>
            <div className={styles['form-field-container']}>
              <div className={styles['form-label']}>Teléfono</div>
              <input className={styles['form-field-input']} type="text"
                     value={this.state.contact.phone} onChange={this.setField('phone')}/>
            </div>
            <div className={styles['form-field-container']}>
              <div className={styles['form-label']}>Comentario</div>
              <textarea className={styles['form-field-text-area']} rows="0"
                        value={this.state.contact.comments} onChange={this.setField('comments')}>
              </textarea>
            </div>
          </div>
          <div className={styles['post-submit-button-container']}>
            <Button bsStyle="primary" className={ styles['form-button'] } onClick={this.submit}>ENVIAR</Button>
          </div>
        </div>
      </div>
    );
  }

}

export default connect(state => state)(ContactPage);
