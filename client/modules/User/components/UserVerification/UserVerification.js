import React, { PropTypes, Component } from 'react';
import { Link } from 'react-router';
import Bootstrap, { Button } from 'react-bootstrap';
import DropZone from 'react-dropzone';

// Import Style
import styles from './UserVerification.css';

import img1 from '../../../../assets/header_login.png';
import imgcerrar from '../../../../assets/btncerrarpop.png';
import icon_verified from '../../../../assets/icon_verificado03.png';

import { uploadDNI, changeField, changeProfile, login } from '../../UserActions';


class UserVerification extends Component {

  constructor(props) {
    super(props);
    this.state = { success: false };
  }

  setField(field) {
    return (value) => {
      this.props.dispatch(changeField(field, value.target.value));
    }
  };

  onDrop = (acceptedFiles, rejectedFiles) => {
    let data = new FormData();
    data.append('file', acceptedFiles[ 0 ]);

    this.setState({ subiendo: true });
    this.props.dispatch(uploadDNI(this.props.user._id, data))
      .then(res => {
        this.setState({ subiendo: false })
        this.props.dispatch(login(res));
      });
  };

  onOpenClick = () => {
    this.dropzone.open();
  };

  handleSubmit = (e) => {
    e.preventDefault();

    this.props.dispatch(changeProfile(this.props.user._id, this.props.user))
      .then(() => this.setState({ success: true }))
  };

  render() {
    return (
      <div className={styles[ 'bgpopup' ]}>
        <div className={styles.popupwindow}>
          <div className={styles.boxMain}>
            <div>
              <span onClick={this.props.handleClose} className={styles.btnCerrar}>
                <img src={imgcerrar} className={styles.img100}/>
              </span>
              <img src={img1} className={styles.img100}/>
              <div className={styles.modalTitle}>
                Convertite en un usuario verificado
              </div>
              {
                this.state.success &&
                <div>
                  <div>
                    <p style={{ lineHeight: '170px', color: 'white' }}>
                      Su cuenta se encuentra en proceso de verificación
                    </p>
                  </div>
                  <div className={ styles.bottomTitle }>
                    <Link className={ styles.modificarDatos } to="/profile">
                      <p style={{ color: 'white', textDecoration: 'underline' }}>
                        Modificar datos cargados
                      </p>
                    </Link>
                  </div>
                </div>
              }
              {
                !this.state.success &&
                <div className={styles.formulario}>
                  <img src={icon_verified}/>
                  <p className={ styles.underVerifiedLogo }>USUARIO VERIFICADO</p>
                  <div className={ styles.inputContainer }>
                    <div style={{ display: 'none' }}>
                      <DropZone ref={(node) => {
                        this.dropzone = node;
                      }} multiple={false} accept="image/*" onDrop={this.onDrop}>
                      </DropZone>
                    </div>
                    <input className={ styles.input } type="text"
                           placeholder={ this.props.user.document_image ? "Imagen ya subida" : "Subir imagen del DNI"}
                           onChange={this.setField('document_image')}
                           disabled={true}/>
                    <div className={ styles.examinar }>
                      <Button bsStyle="info"
                              onClick={this.onOpenClick} disabled={this.state.subiendo}>
                        { this.state.subiendo ?
                          'Subiendo imagen...' :
                          this.props.user.document_image ? 'Volver a subir' : 'Examinar' }
                      </Button>
                    </div>
                    <p className={ styles.inputLabel }>Contactanos para finalizar tu verificación</p>
                    <input className={ styles.input } type="text"
                           placeholder="Skype: Lun a Vie de 10 a 18 Hs" onChange={this.setField('contact_info')}/>
                  </div>
                  <div className={styles.error}>
                    { this.state.msg }
                  </div>
                  <div>
                    <Button style={{ padding: '10px 30px', marginBottom: '15px' }}
                            className={ styles.submitButton }
                            onClick={ this.handleSubmit }
                            disabled={ !this.props.user.document_image || !this.props.user.contact_info }>
                      ENVIAR
                    </Button>
                    <br/>
                    <a style={{
                      display: 'inline-block',
                      padding: '10px 15px',
                      marginBottom: '15px',
                      color: 'white',
                      cursor: 'pointer',
                      textDecoration: 'underline'
                    }}
                       onClick={ this.props.handleClose }>
                      Ahora no, lo haré más adelante
                    </a>
                  </div>
                </div>
              }
            </div>
          </div>
        </div>
      </div>
    );
  }
}

UserVerification.propTypes = {
  user: PropTypes.object.isRequired,
  dispatch: PropTypes.func.isRequired,
  handleClose: PropTypes.func.isRequired
};

export default UserVerification;
