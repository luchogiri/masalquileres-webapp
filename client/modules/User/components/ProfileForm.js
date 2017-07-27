import React, { PropTypes, Component } from 'react';
import { connect } from 'react-redux';

import Bootstrap, { Button, Checkbox } from 'react-bootstrap';
import DatePicker from 'react-datepicker';
import moment from 'moment';
import DropZone from 'react-dropzone';

let Lightbox = (<div></div>);

import styles from './ProfileForm.css';
import 'react-datepicker/dist/react-datepicker.css';

import { nationalities, genders, document_types } from '../../../../shared/constants';

import InputContainer from '../../../components/InputContainer';

import * as Errors from '../../../util/formErrors';

class ProfileForm extends Component {

  required = [ 'first_name', 'last_name', 'email', 'document_number' ];

  constructor(props) {
    super(props);
    this.state = {
      ...Errors.initialState(this.required),
      error: false,
      success: false,
      msg: ''
    };
  }

  componentDidMount() {
    Lightbox = require('react-image-lightbox');
  }

  setField(field) {
    return (value) => {
      this.props.setField(field, value.target ? value.target.value : value);
    }
  };

  setBirthDateField = (value) => {
    this.setField('birthdate')({
      target: {
        value: value
      }
    });
  };

  handleSubmit = (e) => {
    e.preventDefault();

    this.setState({
      error: false,
      success: false
    });

    this.setState(Errors.checkErrors(this.state.errors, this.props.user));

    if (!Errors.hasError(this.state.errors)) {
      this.props.handleSubmit()
        .then(() => {
          this.setState({ success: true, msg: 'Guardado correctamente' });
        })
        .catch(res => {
          this.setState({
            error: true,
            msg: res.msg
          });
        });
    } else {
      this.setState({
        error: true,
        msg: 'Por favor revise todos los campos'
      });
    }
  };

  handleVerify = (value) => {
    this.setField('verified')(!this.props.user.verified);
  };

  onDrop = (acceptedFiles, rejectedFiles) => {
    let data = new FormData();
    data.append('file', acceptedFiles[ 0 ]);

    this.setState({ subiendo: true });

    this.props.handleUploadDNI(data)
      .then(() => {
        this.setState({ subiendo: false })
      });
  };

  onOpenClick = () => {
    this.dropzone.open();
  };

  render() {
    return (
      <div>
        <div className={ styles.form }>
          <div className={styles[ 'form-content' ]}>
            <h2 className={styles[ 'form-title' ]}>DATOS PERSONALES</h2>

            <div className={styles.inp100}>
              <InputContainer title="Nombre" styles={ styles } fieldError={ this.state.errors.first_name.error }>
                <input placeholder="Ej: Amplio departamento a estrenar." onChange={this.setField('first_name')}
                       className={styles[ 'form-field-input' ]} value={this.props.user.first_name}/>
              </InputContainer>
            </div>

            <div className={styles.inp100}>
              <InputContainer title="Apellido/s" styles={ styles }
                              fieldError={ this.state.errors.last_name.error }>
                <input placeholder="Ej: Amplio departamento a estrenar." onChange={this.setField('last_name')}
                       className={styles[ 'form-field-input' ]} value={this.props.user.last_name}/>
              </InputContainer>
            </div>

            <div className={styles.inp50}>
              <InputContainer title="Tipo de Documento" styles={ styles }>
                <select ref="document_type" className={ styles[ 'form-field-select' ] }>
                  { document_types.map((x) => <option value={x} key={x}>{x}</option>) }
                </select>
              </InputContainer>
            </div>

            <div className={styles.inp50nm}>
              <InputContainer title="Número de Documento" styles={ styles }
                              fieldError={ this.state.errors.document_number.error }>
                <input type="number" pattern="[0-9]*" onChange={this.setField('document_number')}
                       className={styles[ 'form-field-input' ]} value={this.props.user.document_number}/>
              </InputContainer>
            </div>

            <div className={styles.inp100}>
              <InputContainer title="Cuit/Cuil" styles={ styles }>
                <input onChange={this.setField('cuit')}
                       className={styles[ 'form-field-input' ]} value={this.props.user.cuit}/>
              </InputContainer>
            </div>

            <div className={styles.inp100}>
              <span className={styles.labelFix}>Sexo</span>
              <label><span>Masculino</span>
                <input type="radio" name="sexo" className={styles[ 'form-field-input' ]}
                       ref="gender" value="masculino" checked={this.props.user.gender === 'masculino'}
                       onChange={this.setField('gender')}/>
              </label>
              <label><span>Femenino</span>
                <input type="radio" name="sexo" className={styles[ 'form-field-input' ]}
                       ref="gender" value="femenino" checked={this.props.user.gender === 'femenino'}
                       onChange={this.setField('gender')}/>
              </label>
            </div>

            <div className={styles.inp100}>
              <InputContainer title="Fecha de Nacimiento" styles={ styles }>
                <DatePicker
                  className={styles[ 'form-field-input' ]}
                  dateFormat="DD/MM/YYYY"
                  selected={moment(this.props.user.birthdate)}
                  onChange={this.setBirthDateField}/>
              </InputContainer>
            </div>

            <div className={styles.inp50}>
              <InputContainer title="Nacionalidad" styles={ styles }>
                <select onChange={this.setField('nationality')} className={ styles[ 'form-field-select' ] }
                        value={this.props.user.nationality}>
                  { nationalities.map((x) => <option value={x} key={x}>{x}</option>) }
                </select>
              </InputContainer>
            </div>

            <div className={styles.inp50nm}>
              <InputContainer title="País de nacimiento" styles={ styles }>
                <input value={this.props.user.country} onChange={this.setField('country')}
                       className={styles[ 'form-field-input' ]}/>
              </InputContainer>
            </div>

            <div className={styles.inp50}>
              <InputContainer title="Telefono" styles={ styles }>
                <input onChange={this.setField('phone')}
                       className={styles[ 'form-field-input' ]} value={this.props.user.phone}/>
              </InputContainer>
            </div>

            <div className={styles.inp50nm}>
              <InputContainer title="Email" styles={ styles } fieldError={ this.state.errors.email.error }>
                <input onChange={this.setField('email')}
                       className={styles[ 'form-field-input' ]} value={this.props.user.email}
                       disabled={true}
                />
              </InputContainer>
            </div>

            <h2 className={styles[ 'form-title' ]}>DOMICILIO</h2>

            <div className={styles.inp100}>
              <InputContainer title="Calle" styles={ styles }>
                <input onChange={this.setField('address_street')} className={styles[ 'form-field-input' ]}
                       value={this.props.user.address_street}/>
              </InputContainer>
            </div>

            <div className={styles.inp50}>
              <InputContainer title="Número" styles={ styles }>
                <input onChange={this.setField('address_number1')} className={styles[ 'form-field-input' ]}
                       value={this.props.user.address_number1}/>
              </InputContainer>
            </div>

            <div className={styles.inp50nm}>
              <InputContainer title="Piso/departamento" styles={ styles }>
                <input onChange={this.setField('address_number2')} className={styles[ 'form-field-input' ]}
                       value={this.props.user.address_number2}/>
              </InputContainer>
            </div>

            <div className={styles.inp50}>
              <InputContainer title="Localidad" styles={ styles }>
                <input onChange={this.setField('address_city')} className={styles[ 'form-field-input' ]}
                       value={this.props.user.address_city}/>
              </InputContainer>
            </div>

            <div className={styles.inp50nm}>
              <InputContainer title="Provincia" styles={ styles }>
                <input onChange={this.setField('address_state')} className={styles[ 'form-field-input' ]}
                       value={this.props.user.address_state}/>
              </InputContainer>
            </div>

            <div className={styles.inp100}>
              <InputContainer title="Código postal" styles={ styles }>
                <input onChange={this.setField('address_zip_code')} className={styles[ 'form-field-input' ]}
                       value={this.props.user.address_zip_code}/>
              </InputContainer>
            </div>

            <h2 className={styles[ 'form-title' ]}>FICHA DEL CLIENTE</h2>

            <div className={styles.inp50}>
              <InputContainer title="Estado civil" styles={ styles }>
                <input onChange={this.setField('civil_status')} className={styles[ 'form-field-input' ]}
                       value={this.props.user.civil_status}/>
              </InputContainer>
            </div>

            <div className={styles.inp50nm}>
              <InputContainer title="Profesión o actividad principal" styles={ styles }>
                <input onChange={this.setField('job')} className={styles[ 'form-field-input' ]}
                       value={this.props.user.job}/>
              </InputContainer>
            </div>
          </div>
        </div>

        <div className={ styles.form2 }>
          <div className={styles[ 'form-content' ]}>

            <h2 className={styles[ 'form-title' ]}>VERIFICAR CUENTA</h2>

            <div className={styles.inp100}>
              <div className={styles[ 'upload-img-dropzone' ]}>
                <DropZone ref={(node) => {
                  this.dropzone = node;
                }}
                          multiple={false} accept="image/*" onDrop={this.onDrop}>
                </DropZone>
              </div>
              <InputContainer title="Imagen del DNI" styles={ styles }>
                <input style={{ height: '180px' }} className={styles[ 'form-field-input' ]} disabled={true}/>
                <div style={{ width: '100%', textAlign: 'right', marginTop: '-39px', marginLeft: '-8px' }}>
                  <Button bsStyle="info"
                          onClick={this.onOpenClick} disabled={this.state.subiendo}>
                    { this.state.subiendo ? 'Subiendo imagen...' : 'Subir imágen' }
                  </Button>
                </div>
                <div style={{ width: '100%' }}>
                  <img style={{
                    width: '350px', height: '150px',
                    position: 'absolute',
                    marginTop: '-160px', marginLeft: '16px'
                  }} src={this.props.user.document_image} onClick={() => this.setState({ isOpen: true })}/>
                </div>
              </InputContainer>
              {
                this.state.isOpen && this.props.user.document_image &&
                <Lightbox
                  mainSrc={this.props.user.document_image}
                  onCloseRequest={() => this.setState({ isOpen: false })}/>
              }
            </div>

            <div className={styles.inp100}>
              <InputContainer title="Contactenos para finalizar la verificación" styles={ styles }>
                <input onChange={this.setField('contact_info')} placeholder="Skype: Lun a Vie de 10 a 18 Hs."
                       className={styles[ 'form-field-input' ]} value={this.props.user.contact_info}/>
              </InputContainer>
            </div>

            {
              this.props.canVerify &&
              <div className={styles.inp100}>
                <InputContainer title="Usuario Verificado" styles={ styles }>
                  <label>
                    Verificado
                    <input
                      style={{ marginRight: '10px', marginTop: '4px' }}
                      type="checkbox"
                      checked={this.props.user.verified}
                      onChange={this.handleVerify} />
                  </label>
                </InputContainer>
              </div>
            }

            <div style={{ textAlign: 'center' }}>
              <a className={styles[ 'post-submit-button' ]} href="#" onClick={this.handleSubmit}>
                Guardar
              </a>
            </div>
            { this.state.error && <div className={styles[ 'form-error' ]}>{ this.state.msg }</div> }
            { this.state.success && <div className={styles[ 'form-success' ]}>{ this.state.msg }</div> }
          </div>
        </div>
      </div>
    );
  }

}

ProfileForm.propTypes = {
  setField: PropTypes.func.isRequired,
  handleSubmit: PropTypes.func.isRequired,
  handleUploadDNI: PropTypes.func.isRequired,
  user: PropTypes.object.isRequired,
  canVerify: PropTypes.bool
};

export default connect(state => ({}))(ProfileForm);
