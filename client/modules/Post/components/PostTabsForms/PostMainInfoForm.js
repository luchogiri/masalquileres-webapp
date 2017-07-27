import React, { Component, PropTypes } from 'react';

// Import Style
import styles from './PostTabsForms.css';

import InputContainer from '../../../../components/InputContainer';

import { tipo_expensas, types, menores, mascotas, tipo_fianza, calefaccion, periodos } from '../../../../../shared/constants';

export class PostCreateForm extends Component {

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
      (x) => x.target.value >= 0 ? this.props.setField(field)(x) : this.props.setField(field)(0)

    const setMaxima = (field) =>
      (x) => x.target.value >= 24 && x.target.value <= 60 ? this.props.setField(field)(x) :
        x.target.value < 24 ? this.props.setField(field)(24) : this.props.setField(field)(60)

    return (
      <div >
        <div className={styles[ 'form-section' ]}>
          <div className={styles[ 'form-content' ]} style={{ padding: '0px 160px' }}>
            <h2 className={styles[ 'form-title' ]}>INFORMACIÓN PRINCIPAL</h2>

            <InputContainer title="Titulo de tu anuncio" styles={ styleInput1 }>
              <input className={ styles[ 'form-field-input' ] }
                     placeholder="Ej: 3 ambientes en piso alto en las Cañitas"
                     onChange={this.props.setField('title')}
                     defaultValue={this.props.post.title}/>
            </InputContainer>

            <div className={styles.txt}>
              <p>Al describir el inmueble, tené en cuenta lo siguiente:</p>
              <ol>
                <li><p>Es conveniente ir de lo general a lo particular. Describí primero la zona, la cercanía a
                  transportes, a escuelas y centros comerciales y de salud. Luego el edificio o complejo urbanístico, si
                  tiene amenities y cuáles son sus ventajas. Y recién después el inmueble.</p>
                </li>
                <li><p>
                  Describir los ambientes del inmueble en el orden que una persona los recorrería, intentando mantener
                  el orden de sectores sociales (hall, living, comedor), sector familiar (cocina, office, family),
                  sector de servicio (lavadero, dependencia) y sector íntimo (dormitorios, estar, playroom).
                </p>
                </li>
                <li><p>
                  Describir brevemente los detalles de la construcción: carpinterías, aberturas, calefacción, aires
                  acondicionados, agua caliente.
                </p>
                </li>
                <li><p>
                  Finalizar con la descripción exterior, si la hubiera, o la descripción de cocheras y bauleras.
                </p>
                </li>
              </ol>
            </div>
            <InputContainer title="Descripción de la propiedad" styles={ styleInput1 }>
              <textarea className={ styles[ 'form-field-text-area' ] }
                        placeholder=""
                        onChange={this.props.setField('description')}
                        defaultValue={this.props.post.description}>
              </textarea>
            </InputContainer>
          </div>
        </div>

        <div className={styles[ 'form-section' ]} style={{ marginTop: '30px' }}>
          <div className={styles[ 'form-content' ]} style={{ padding: '0px 60px' }}>
            <h2 className={styles[ 'form-title' ]}>CARACTERÍSTICAS DEL INMUEBLE</h2>

            <div className={styles[ 'col3' ]}>
              <InputContainer title="Tipo de propiedad" styles={ styleInput2 }>
                <select className={ styles[ 'form-field-select' ] }
                        onChange={this.props.setField('type')}
                        defaultValue={this.props.post.type}>
                  <option value="">-- SELECIONE TIPO --</option>
                  { types.map((x) => <option value={x} key={x}>{x}</option>) }
                </select>
              </InputContainer>
            </div>
            <div className={styles[ 'col3' ]}>
              <InputContainer title="Plantas de la unidad" styles={ styleInput2 }>
                <input type="number" pattern="[0-9]*" placeholder="1" className={ styles[ 'form-field-input' ] }
                       onChange={setPositive('plantas')}
                       value={this.props.post.plantas}/>
              </InputContainer>
            </div>
            <div className={styles[ 'col3nm' ]}>
              <InputContainer title="Ambientes" styles={ styleInput2 }>
                <input type="number" pattern="[0-9]*" placeholder="2" className={ styles[ 'form-field-input' ] }
                       onChange={setPositive('rooms')}
                       value={this.props.post.rooms}/>
              </InputContainer>
            </div>

            <div className={styles[ 'col3' ]}>
              <InputContainer title="Antigüedad" styles={ styleInput2 }>
                <input type="number" pattern="[0-9]*" placeholder="20 Años" className={ styles[ 'form-field-input' ] }
                       onChange={setPositive('years')}
                       value={this.props.post.years}/>
              </InputContainer>
            </div>
            <div className={styles[ 'col3' ]}>
              <InputContainer title="Estado de la propiedad" styles={ styleInput2 }>
                <input type="text" placeholder="Excelente" className={ styles[ 'form-field-input' ] }
                       onChange={this.props.setField('state')}
                       defaultValue={this.props.post.state}/>
              </InputContainer>
            </div>
            <div className={styles[ 'col3nm' ]}>
              <InputContainer title="Orientacion" styles={ styleInput2 }>
                <input type="text" placeholder="Contrafrente" className={ styles[ 'form-field-input' ] }
                       onChange={this.props.setField('orientacion')}
                       defaultValue={this.props.post.orientacion}/>
              </InputContainer>
            </div>

            <div className={styles[ 'col3' ]}>
              <InputContainer title="Situación" styles={ styleInput2 }>
                <input type="text" placeholder="Vacia" className={ styles[ 'form-field-input' ] }
                       onChange={this.props.setField('situacion')}
                       defaultValue={this.props.post.situacion}/>
              </InputContainer>
            </div>

            <div className={styles[ 'col100' ]}>
              <p style={{
                marginTop: '60px',
                fontSize: 'large',
                color: 'rgb(165,165,165)',
                fontStyle: 'italic'
              }}>
                Detalles Adicionales
              </p>
            </div>

            <div className={styles[ 'col3' ]}>
              <InputContainer title="Dormitorios" styles={ styleInput2 }>
                <input type="number" pattern="[0-9]*" placeholder="2" className={ styles[ 'form-field-input' ] }
                       onChange={this.props.setField('dormitories')}
                       defaultValue={this.props.post.dormitories}/>
              </InputContainer>
            </div>

            <div className={styles[ 'col3' ]}>
              <InputContainer title="Baños" styles={ styleInput2 }>
                <input type="number" pattern="[0-9]*" placeholder="1" className={ styles[ 'form-field-input' ] }
                       onChange={this.props.setField('bathrroms')}
                       defaultValue={this.props.post.bathrooms}/>
              </InputContainer>
            </div>

            <div className={styles[ 'col3nm' ]}>
              <InputContainer title="Toilettes" styles={ styleInput2 }>
                <input type="number" placeholder="1" className={ styles[ 'form-field-input' ] }
                       onChange={this.props.setField('toilette')}
                       defaultValue={this.props.post.toilette}/>
              </InputContainer>
            </div>

            <div className={styles[ 'col3' ]}>
              <InputContainer title="Calefacción" styles={ styleInput2 }>
                <select className={ styles[ 'form-field-select' ] }
                        onChange={this.props.setField('calefaccion')}
                        defaultValue={this.props.post.calefaccion}>
                  <option value="">-- SELECIONE TIPO --</option>
                  { calefaccion.map((x) => <option value={x} key={x}>{x}</option>) }
                </select>
              </InputContainer>
            </div>

            <div className={styles[ 'col3' ]}>
              <InputContainer title="Cocheras" styles={ styleInput2 }>
                <input type="number" placeholder="1" pattern="[0-9]*" className={ styles[ 'form-field-input' ] }
                       onChange={this.props.setField('parking')}
                       defaultValue={this.props.post.parking}/>
              </InputContainer>
            </div>

            <div className={styles[ 'col3nm' ]}>

            </div>
          </div>
        </div>

        <div className={styles[ 'form-section' ]} style={{ marginTop: '30px' }}>
          <div className={styles[ 'form-content' ]} style={{ padding: '0px 60px' }}>
            <h2 className={styles[ 'form-title' ]}>SUPERFICIES</h2>

            <div className={styles[ 'col3' ]}>
              <InputContainer title="Terreno" styles={ styleInput2 }>
                <input type="number" placeholder="en Mts2" className={ styles[ 'form-field-input' ] }
                       onChange={this.props.setField('terreno')}
                       defaultValue={this.props.post.terreno}/>
              </InputContainer>
            </div>
            <div className={styles[ 'col3' ]}>
              <InputContainer title="Cubiertas" styles={ styleInput2 }>
                <input type="number" placeholder="en Mts2" pattern="[0-9]*" className={ styles[ 'form-field-input' ] }
                       onChange={this.props.setField('covered_area')}
                       defaultValue={this.props.post.covered_area}/>
              </InputContainer>
            </div>
            <div className={styles[ 'col3nm' ]}>
              <InputContainer title="Semicubierta" styles={ styleInput2 }>
                <input type="number" placeholder="en Mts2" pattern="[0-9]*" className={ styles[ 'form-field-input' ] }
                       onChange={this.props.setField('semicubierta_area')}
                       defaultValue={this.props.post.semicubierta_area}/>
              </InputContainer>
            </div>

            <div className={styles[ 'col3' ]}>
              <InputContainer title="Descubierta" styles={ styleInput2 }>
                <input type="number" placeholder="en Mts2" className={ styles[ 'form-field-input' ] }
                       onChange={this.props.setField('descubierta_area')}
                       defaultValue={this.props.post.descubierta_area}/>
              </InputContainer>
            </div>
            <div className={styles[ 'col3' ]}>
              <InputContainer title="Total" styles={ styleInput2 }>
                <input type="number" placeholder="en Mts2" pattern="[0-9]*" className={ styles[ 'form-field-input' ] }
                       onChange={this.props.setField('total_area')}
                       defaultValue={this.props.post.total_area}/>
              </InputContainer>
            </div>
            <div className={styles[ 'col3nm' ]}>

            </div>
          </div>
        </div>

        <div className={styles[ 'form-section' ]} style={{ marginTop: '30px' }}>
          <div className={styles[ 'form-content' ]} style={{ padding: '0px 60px' }}>
            <h2 className={styles[ 'form-title' ]}>OBSERVACIONES INTERNAS</h2>

            <div className={styles[ 'col100' ]}>
              <InputContainer title="" styles={ styleInput1 }>
                <textarea className={ styles[ 'form-field-text-area' ] }
                          placeholder="Utilizá este espacio para comentarnos todo lo que creas necesario. Muchas gracias."
                          onChange={this.props.setField('private_description')}
                          defaultValue={this.props.post.description}>
                </textarea>
              </InputContainer>
            </div>

          </div>
        </div>

      </div>
    );
  }
}

PostCreateForm.propTypes = {
  post: PropTypes.object.isRequired
};

export default PostCreateForm;
