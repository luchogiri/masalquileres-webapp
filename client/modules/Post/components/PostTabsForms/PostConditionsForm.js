import React, { Component, PropTypes } from 'react';
import Bootstrap, { Button, OverlayTrigger, Popover } from 'react-bootstrap';

let Lightbox = (<div></div>);

import FontAwesome from 'react-fontawesome';

import styles from './PostTabsForms.css';

import InputContainer from '../../../../components/InputContainer';
import DropZone from 'react-dropzone';

import {
  tipo_expensas,
  types,
  menores,
  horarios,
  mascotas,
  tipo_fianza,
  calefaccion,
  periodos
} from '../../../../../shared/constants';

export class PostConditionsForm extends Component {

  state = {};

  componentDidMount() {
    Lightbox = require('react-image-lightbox');
  }

  onOpenClick1 = () => {
    this.dropzone1.open();
  };

  onOpenClick2 = () => {
    this.dropzone2.open();
  };

  uploadCondition(field) {
    return (acceptedFiles, rejectedFiles) => {
      let data = new FormData();
      data.append('file', acceptedFiles[ 0 ]);
      this.setState({ ['subiendo' + field]: true });
      this.props.uploadCondition('img' + field, data)
        .then(() => {
          this.setState({ ['subiendo' + field]: false })
        });
    }
  }

  handleVerify = (value) => {
    this.props.setField('verified')(!this.props.post.verified);
  };

  render() {
    const styleInput1 = {
      ...styles,
      'form-field-container': styles[ 'form-field-container-1' ]
    };

    const styleInput2 = {
      ...styles,
      'form-field-container': styles[ 'form-field-container-2' ]
    };

    const setPositive = (field) =>
      (x) => x.target.value >= 0 ? this.props.setField(field)(x) : this.props.setField(field)(0);

    const setMaxima = (field) =>
      (x) => x.target.value >= 24 && x.target.value <= 60 ? this.props.setField(field)(x) :
        x.target.value < 24 ? this.props.setField(field)(24) : this.props.setField(field)(60);

    const popoverTop = (
      <Popover id="popover-positioned-top" title="En cantidad de meses de acuerdo al valor del primer mes de alquiler">
        La ley establece que no se puede exigir más de un mes por cada año de locación.
      </Popover>
    );

    return (
      <div>
        <div className={styles[ 'form-section' ]}>
          <div className={styles[ 'form-content' ]} style={{ padding: '0px 60px' }}>
            <h2 className={styles[ 'form-title' ]}>CONDICIONES</h2>

            <div className={styles[ 'col3' ]}>
              <InputContainer title="Precio de la publicación (en pesos)" styles={ styleInput2 }>
                <input type="number" placeholder="Monto mensual" className={ styles[ 'form-field-input' ] }
                       onChange={this.props.setField('preciopubli')}
                       defaultValue={this.props.post.preciopubli}/>
              </InputContainer>
            </div>

            <div className={styles[ 'col3' ]}>
              <InputContainer title="Períodos de Escalonamiento" styles={ styleInput2 }>
                <select className={ styles[ 'form-field-select' ] }
                        onChange={this.props.setField('periodo')}
                        defaultValue={this.props.post.periodo}>
                  <option value="">-- SELECIONE TIPO --</option>
                  { periodos.map((x) => <option value={x} key={x}>{x}</option>) }
                </select>
              </InputContainer>
            </div>

            <div className={styles[ 'col3nm' ]}>
              <InputContainer title="% por período de escalonamiento" styles={ styleInput2 }>
                <input type="number" placeholder="12%" className={ styles[ 'form-field-input' ] }
                       onChange={this.props.setField('porcentaje')}
                       defaultValue={this.props.post.porcentaje}/>
              </InputContainer>
            </div>

            <div className={styles[ 'col3' ]}>
              <InputContainer title="Expensas aproximadas (en pesos)" styles={ styleInput2 }>
                <input type="number" pattern="[0-9]*" placeholder="900" className={ styles[ 'form-field-input' ] }
                       onChange={setPositive('expensas')}
                       value={this.props.post.expensas}/>
              </InputContainer>
            </div>

            <div className={styles[ 'col3' ]}>
              <InputContainer title="Exp.: incluidas en el precio de la locación" styles={ styleInput2 }>
                <select className={ styles[ 'form-field-select' ] }
                        onChange={this.props.setField('tipo_expensas')}
                        defaultValue={this.props.post.tipo_expensas}>
                  <option value="">-- SELECIONE TIPO --</option>
                  { tipo_expensas.map((x) => <option value={x} key={x}>{x}</option>) }
                </select>
              </InputContainer>
            </div>

            <div className={styles[ 'col3nm' ]}>
              <InputContainer title="ABL aproximado (en pesos)" styles={ styleInput2 }>
                <input type="number" pattern="[0-9]*" placeholder="120" className={ styles[ 'form-field-input' ] }
                       onChange={setPositive('abl')}
                       value={this.props.post.abl}/>
              </InputContainer>
            </div>

            <div className={styles[ 'col3' ]}>
              <InputContainer title="ABL: incluidas en el precio de la locación" styles={ styleInput2 }>
                <select className={ styles[ 'form-field-select' ] }
                        onChange={this.props.setField('tipo_abl')}
                        defaultValue={this.props.post.tipo_abl}>
                  <option value="">-- SELECIONE TIPO --</option>
                  { tipo_expensas.map((x) => <option value={x} key={x}>{x}</option>) }
                </select>
              </InputContainer>
            </div>

            <div className={styles[ 'col3' ]}>
              <InputContainer title="Duración máxima del contrato (en meses)" styles={ styleInput2 }>
                <input type="number" pattern="[0-9]*" placeholder="Mínimo 24 meses"
                       className={ styles[ 'form-field-input' ] }
                       onChange={setMaxima('maxcontrato')}
                       value={this.props.post.maxcontrato}/>
              </InputContainer>
            </div>

            <div className={styles[ 'col3nm' ]}>
              <InputContainer title="Depósito de garantía" styles={ styleInput2 }>
                <select className={ styles[ 'form-field-select' ] }
                        onChange={this.props.setField('deposito')}
                        disabled={!this.props.post.maxcontrato}
                        defaultValue={this.props.post.deposito}>
                  <option value="">-- SELECIONE --</option>
                  { [ 1, 2, 3, 4, 5 ].filter((x) => x <= (this.props.post.maxcontrato / 12)).map((x) => <option
                    value={x} key={x}>{x}</option>) }
                </select>
                <OverlayTrigger trigger={[ 'hover', 'focus' ]} placement="bottom" overlay={popoverTop}>
                  <FontAwesome
                    name='info-circle'
                    size='2x'
                    style={{
                      textShadow: '0 1px 0 rgba(0, 0, 0, 0.1)',
                      position: 'absolute',
                      marginLeft: '-45px',
                      marginTop: '8px'
                    }}
                  />
                </OverlayTrigger>
              </InputContainer>
            </div>


            <div className={styles[ 'col3' ]}>
              <InputContainer title="Tipo De Fianza" styles={ styleInput2 }>
                <select className={ styles[ 'form-field-select' ] }
                        onChange={this.props.setField('tipo_fianza')}
                        defaultValue={this.props.post.tipo_fianza}>
                  <option value="">-- SELECIONE TIPO --</option>
                  { tipo_fianza.map((x) => <option value={x} key={x}>{x}</option>) }
                </select>
              </InputContainer>
            </div>

            <div className={styles[ 'col3' ]}>
              <InputContainer title="Mascotas" styles={ styleInput2 }>
                <select className={ styles[ 'form-field-select' ] }
                        onChange={this.props.setField('mascotas')}
                        defaultValue={this.props.post.mascotas}>
                  <option value="">-- SELECIONE TIPO --</option>
                  { mascotas.map((x) => <option value={x} key={x}>{x}</option>) }
                </select>
              </InputContainer>
            </div>

            <div className={styles[ 'col3nm' ]}>
              <InputContainer title="Niños pequeños" styles={ styleInput2 }>
                <select className={ styles[ 'form-field-select' ] }
                        onChange={this.props.setField('menores')}
                        defaultValue={this.props.post.menores}>
                  <option value="">-- SELECIONE TIPO --</option>
                  { menores.map((x) => <option value={x} key={x}>{x}</option>) }
                </select>
              </InputContainer>
            </div>

            <div className={styles[ 'col3' ]}>
              <InputContainer title="Horarios de Visita" styles={ styleInput2 }>
                <select className={ styles[ 'form-field-select' ] }
                        onChange={this.props.setField('horarios')}
                        defaultValue={this.props.post.horarios}>
                  <option value="">-- SELECIONE --</option>
                  { horarios.map((x) => <option value={x} key={x}>{x}</option>) }
                </select>
              </InputContainer>
            </div>

          </div>
        </div>

        {
          this.props.post._id &&
          <div className={styles[ 'form-section' ]} style={{ marginTop: '30px' }}>
            <div className={styles[ 'form-content' ]} style={{ padding: '0px 160px' }}>
              <h2 className={styles[ 'form-title' ]}>Verificación</h2>

              <div>
                {/*<div>*/}
                {/*<div className={styles[ 'upload-img-dropzone' ]}>*/}
                {/*<DropZone ref={(node) => {*/}
                {/*this.dropzone1 = node;*/}
                {/*}} multiple={false} accept="image/*" onDrop={this.uploadCondition('1')}>*/}
                {/*</DropZone>*/}
                {/*</div>*/}
                {/*<InputContainer title="Escritura de la propiedad" styles={ styles }>*/}
                {/*<input style={{ height: '180px' }} className={styles[ 'form-field-input' ]} disabled={true}/>*/}
                {/*<div style={{ width: '100%', textAlign: 'right', marginTop: '-39px', marginLeft: '-8px' }}>*/}
                {/*<Button bsStyle="info"*/}
                {/*onClick={this.onOpenClick1} disabled={this.state.subiendo1}>*/}
                {/*{ this.state.subiendo ? 'Subiendo imagen...' : 'Subir imágen' }*/}
                {/*</Button>*/}
                {/*</div>*/}
                {/*<div style={{ width: '100%' }}>*/}
                {/*<img*/}
                {/*onClick={() => this.setState({ isOpen1: true })}*/}
                {/*style={{*/}
                {/*width: '350px', height: '150px',*/}
                {/*position: 'absolute',*/}
                {/*marginTop: '-160px', marginLeft: '16px'*/}
                {/*}} src={this.props.post.img1}/>*/}
                {/*</div>*/}
                {/*</InputContainer>*/}
                {/*</div>*/}
                {/*{*/}
                {/*this.state.isOpen1 && this.props.post.img1 &&*/}
                {/*<Lightbox*/}
                {/*mainSrc={this.props.post.img1}*/}
                {/*onCloseRequest={() => this.setState({ isOpen1: false })}/>*/}
                {/*}*/}
                {/*<div style={{ marginTop: '25px' }}>*/}
                {/*<div className={styles[ 'upload-img-dropzone' ]}>*/}
                {/*<DropZone ref={(node) => {*/}
                {/*this.dropzone2 = node;*/}
                {/*}} multiple={false} accept="image/*" onDrop={this.uploadCondition('2')}>*/}
                {/*</DropZone>*/}
                {/*</div>*/}
                {/*<InputContainer title="Poder" styles={ styles }>*/}
                {/*<input style={{ height: '180px' }} className={styles[ 'form-field-input' ]} disabled={true}/>*/}
                {/*<div style={{ width: '100%', textAlign: 'right', marginTop: '-39px', marginLeft: '-8px' }}>*/}
                {/*<Button bsStyle="info"*/}
                {/*onClick={this.onOpenClick2} disabled={this.state.subiendo2}>*/}
                {/*{ this.state.subiendo ? 'Subiendo imagen...' : 'Subir imágen' }*/}
                {/*</Button>*/}
                {/*</div>*/}
                {/*<div style={{ width: '100%' }}>*/}
                {/*<img*/}
                {/*onClick={() => this.setState({ isOpen2: true })}*/}
                {/*style={{*/}
                {/*width: '350px', height: '150px',*/}
                {/*position: 'absolute',*/}
                {/*marginTop: '-160px', marginLeft: '16px'*/}
                {/*}} src={this.props.post.img2}/>*/}
                {/*</div>*/}
                {/*</InputContainer>*/}
                {/*</div>*/}
                {/*{*/}
                {/*this.state.isOpen2 && this.props.post.img2 &&*/}
                {/*<Lightbox*/}
                {/*mainSrc={this.props.post.img2}*/}
                {/*onCloseRequest={() => this.setState({ isOpen2: false })}/>*/}
                {/*}*/}
                {
                  <div className={styles.col100} style={{ marginTop: '25px' }}>
                    <InputContainer title="Propiedad Verificada" styles={ styles }>
                      <label>
                        Verificado
                        <input
                          style={{ marginLeft: '10px', marginTop: '4px' }}
                          type="checkbox"
                          checked={this.props.post.verified}
                          onChange={this.handleVerify}/>
                      </label>
                    </InputContainer>
                  </div>
                }
              </div>
            </div>
          </div>
        }
      </div>
    );
  }

}

PostConditionsForm.propTypes = {
  post: PropTypes.object.isRequired,
  uploadCondition: PropTypes.func
};

export default PostConditionsForm;
