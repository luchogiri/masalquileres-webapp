import React, { Component } from 'react';
import { Link } from 'react-router';
import { connect } from 'react-redux';
import B, { Button } from 'react-bootstrap';

import styles from './HomePage.css';

import ImgBG from '../../../assets/img_bg.jpg';
import Feat1Img from '../../../assets/num_01-8.png';
import Feat2Img from '../../../assets/num_02-8.png';
import Feat3Img from '../../../assets/num_03-8.png';
import LogoWhiteImg from '../../../assets/logo-white.jpg';
import Step1Img from '../../../assets/pasos01.jpg';
import Step2Img from '../../../assets/pasos02.jpg';
import Step3Img from '../../../assets/pasos03.jpg';
import ArrowImg from '../../../assets/arrow02-80.jpg';
import SearchImg from '../../../assets/form-bg.png';

import { toogleLoginPopup, sendSearchRequest } from '../../App/AppActions';
import TermsModal from '../../Common/terms-modal';


const SearchInput = (props) => (
  <div style={{ marginTop: '20px' }}>
    <div style={{ color: 'white', fontSize: '13px' }}>{ props.label }</div>
    <input type="text" placeholder={ props.placeholder } onChange={ props.setField }
           tabIndex={props.tabIndex}
           style={{
             padding: '5px',
             width: '100%',
             marginTop: '10px',
             fontStyle: 'italic',
             fontSize: '14px',
             fontFamily: "'Vollkorn', serif"
           }}/>
  </div>
);

const SearchTextArea = (props) => (
  <div style={{ marginTop: '20px', float: 'left', width: '100%' }}>
    <div style={{ color: 'white', fontSize: '13px' }}>{ props.label }</div>
    <textarea type="text" placeholder={ props.placeholder } onChange={ props.setField }
              tabIndex={props.tabIndex}
              style={{
                padding: '5px',
                width: '100%',
                marginTop: '10px',
                fontSize: '13px',
                fontFamily: "'Vollkorn', serif",
                minHeight: '130px'
              }}
    />
  </div>
);

const FeatureItem = (props) => {
  return (<div className={styles[ 'feature-container' ]}>
    <div className={styles[ 'feature-img' ]}>
      <img src={props.img}/>
    </div>
    <div className={styles[ 'feature' ]}>
      <div className={styles[ 'feature-title' ]}>
        { props.title }
      </div>
      <div className={styles[ 'feature-desc' ]}>
        <p>{ props.desc }</p>
      </div>
    </div>
  </div>)
};

class HomePage extends Component {

  constructor(props) {
    super(props);
    this.state = {
      searchForm: {},
      showModal: false
    };
  }

  setSearchField = (field) => {
    return (value) => {
      this.setState({
        searchForm: {
          ...this.state.searchForm,
          [field]: value.target.value
        }
      });
    }
  };

  sendSearchForm = () => {
    this.props.dispatch(sendSearchRequest(this.state.searchForm)).then(() => {
      ga('send', 'event','Formulario', 'Enviar');
      this.setState({
        success: 'La búsqueda ha sido enviada'
      });
      setTimeout(() => {
        this.setState({
          success: ''
        });
      }, 5000);
    }).catch(() => {
      this.setState({
        error: 'Hubo un error, intente nuevamente'
      });
      setTimeout(() => {
        this.setState({
          error: ''
        });
      }, 5000);
    });
  };

  toogleLoginPopup = (e) => {
    e.preventDefault();
    this.props.dispatch(toogleLoginPopup(true));
  };

  render() {
    return (
      <div>
        <div className={styles[ 'top-container' ]}
             style={{ background: `#FFF url(${ImgBG}) center`, backgroundSize: 'cover' }}>
          <div className={styles[ 'slogan-container' ]}>
            <div className={styles[ 'slogan' ]}>
              <span>ALQUILAR</span> es mucho + facil
              <hr className={styles[ 'section-sep' ]}/>
            </div>
            <div className={styles[ 'slogan-desc' ]}>
              <p>
                Cargá tu propiedad y subí las fotos. Elegí las condiciones del alquiler y verificá tus datos. Sin costos
                ocultos ni letra chica. Pagás por nuestros servicios únicamente si tu propiedad se alquila.
              </p>
            </div>
            <div className={styles[ 'sign-up-button-container' ]}>
              {
                !this.props.user._id &&
                <a href="#" className={styles[ 'sign-up-button' ]} onClick={this.toogleLoginPopup}>
                  REGISTRATE YA
                </a>
              }
            </div>
          </div>
        </div>
        <div className={styles[ 'features-container' ]}>
          <h3 className={styles[ 'subtitle' ]}>en 3 simples pasos</h3>
          <FeatureItem img={Feat1Img}
                       title="Publicá tu propiedad en los principales portales y sistemas inmobiliarios"
                       desc="Cargás una sola vez toda la información y nosotros nos encargamos de replicar tu inmueble en todos los portales."/>
          <FeatureItem img={Feat2Img}
                       title="Verificá tu identidad"
                       desc="Verificamos la identidad de locadores y locatarios para lograr mayor seguridad para ambas partes."/>
          <FeatureItem img={Feat3Img}
                       title="Nosotros hacemos el resto"
                       desc="Acompañamos a los interesados en las visitas al inmueble y te presentamos las mejores propuestas para que tomes una decisión informada.​"/>
        </div>

        <div className={styles[ 'section-separator' ]}>
        </div>

        <div className={styles[ 'section-container' ]}>
          <div className={styles[ 'section-box' ]}>
            <div className={styles[ 'section-title' ]}>
              QUIENES SOMOS
            </div>
            <hr className={styles[ 'section-sep' ]}/>
            <div className={styles[ 'who-desc' ]}>
              masalquileres.com es una plataforma de encuentro entre
              propietarios, inmobiliaria y los interesados en alquilar
              cualquier tipo de inmueble en la Ciudad Autónoma de
              Buenos Aires y en Zona Norte del Gran Buenos Aires.
            </div>
          </div>
        </div>

        <div className={styles[ 'section-separator' ]}>
        </div>

        <div className={styles[ 'steps-container' ]}>
          <div className={styles[ 'section-box' ]}>
            <div className={styles[ 'section-title' ]}>
              NUESTRO DIFERENCIAL
            </div>
            <hr className={styles[ 'section-sep' ]}/>
          </div>
        </div>

        {/*
         <div className={styles['steps-container']}>
         <img src={ArrowImg} className={styles['top-arrow']}/>
         </div>
         */}

        <div className={styles[ 'steps-container' ]}>
          <div className={styles[ 'step-imgs-container' ]}>
            <div className={styles[ 'itemservice' ]}>
              <img className={styles[ 'step-img-container' ]} src={Step1Img}/>
              <h3>+Transparente</h3>
              <p>Vos elegís las condiciones del alquiler que se publican.</p>
            </div>
            <div className={styles[ 'itemservice' ]}>
              <img className={styles[ 'step-img-container' ]} src={Step2Img}/>
              <h3>+Seguro</h3>
              <p>Verificamos ​tu identidad ​y la ​de los interesados​ para lograr un trato mas seguro para ambas
                partes.</p>
            </div>
            <div className={styles[ 'itemservice' ]}>
              <img className={styles[ 'step-img-container' ]} src={Step3Img}/>
              <h3>+Fácil</h3>
              <p>Rapidez, dinamismo, y la asistencia personalizada de nuestros profesionales</p>
            </div>
          </div>
        </div>
        {/*
         <div className={styles['steps-container']}>
         <img src={ArrowImg} className={styles['bottom-arrow']}/>
         </div>
         */}

        <div className={styles[ 'section-separator' ]}>
        </div>


        <div className={styles[ 'steps-container' ]}>
          <div className={styles[ 'section-box' ]}>
            <div className={styles[ 'section-title' ]}>
              LO IMPORTANTE
            </div>
            <hr className={styles[ 'section-sep' ]}/>
          </div>

          <h2 className={styles[ 'condicionesClarash2' ]}>"Condiciones claras y gestión asistida para alquileres más
            simples"</h2>


        </div>


        <div className={styles[ 'section-separator' ]}>
        </div>

        <div className={styles[ 'section-search' ]}>
          <div className={styles[ 'section-search-form' ]}>
            <div>
              <div style={{ color: 'white', fontSize: '25px' }}>¿Buscás un alquiler?</div>
              <p style={{ color: 'white', fontSize: '14px', marginTop: '10px' }}>
                Mirá todos los inmuebles publicados&nbsp;
                <a style={{ color: 'white', textDecoration: 'underline' }} target="_blank"
                   href="http://www.dkprop.com.ar/b/masalquileres">
                  aquí
                </a>&nbsp;
                o dejanos tu búsqueda.
              </p>
            </div>
            <div style={{ marginTop: '45px' }}>
              <SearchInput label="Nombre completo" placeholder="Nombre y Apellido"
                           setField={this.setSearchField('name')} tabIndex={1}/>
              <div style={{
                width: '50%',
                float: 'left',
                paddingRight: '10px'
              }}>
                <SearchInput label="Correo Electrónico" placeholder="Ej: juan@correo.com"
                             setField={this.setSearchField('email')} tabIndex={2}/>
                <SearchInput label="Tipo de Inmueble" placeholder="Departamento" setField={this.setSearchField('type')}
                             tabIndex={4}/>
                <SearchInput label="Dormitorios Mínimos" placeholder="3" setField={this.setSearchField('rooms')}
                             tabIndex={6}/>
              </div>
              <div style={{
                width: '50%',
                float: 'right',
                paddingLeft: '10px'
              }}>
                <SearchInput label="Teléfono" placeholder="Ej: 1142349502" setField={this.setSearchField('phone')}
                             tabIndex={3}/>
                <SearchInput label="Zona" placeholder="Agronomía" setField={this.setSearchField('zone')} tabIndex={5}/>
                <SearchInput label="Valor Máximo" placeholder="4000" setField={this.setSearchField('max_value')}
                             tabIndex={7}/>
              </div>
              <SearchTextArea label="Observaciones" placeholder="departamento"
                              setField={this.setSearchField('observations')} tabIndex={8}/>
              <Button bsStyle="default"
                      tabIndex={9}
                      style={{
                        float: 'left',
                        marginTop: '30px',
                        padding: '10px 40px',
                        borderRadius: '0px'
                      }} onClick={this.sendSearchForm}>
                Enviar Formulario
              </Button>
              {
                this.state.success &&
                <div style={{
                  float: 'left',
                  color: 'lightgreen',
                  fonSize: '13px',
                  marginTop: '41px',
                  marginLeft: '30px'
                }}>
                  { this.state.success }
                </div>
              }
              {
                this.state.error &&
                <div style={{ float: 'left', color: 'red', fonSize: '13px', marginTop: '41px', marginLeft: '30px' }}>
                  { this.state.error }
                </div>
              }
            </div>
          </div>
          <div className={styles[ 'section-search-img' ]}
               style={{ background: `#FFF url(${SearchImg}) center`, backgroundSize: 'cover' }}>
          </div>
        </div>

        <div className={styles[ 'section-separator' ]}>
        </div>

        <div className={styles[ 'section-container' ]}
             style={{ background: `#FFF url(${LogoWhiteImg}) center`, backgroundRepeat: 'no-repeat', padding: '90px' }}>
          <div className={`${styles[ 'section-box' ]} ${styles[ 'disclaimer-box' ]}`}>
            <div className={styles[ 'section-title' ]}>
              MASALQUILERES.COM
            </div>
            <hr className={styles[ 'section-sep' ]}/>
            <div className={styles[ 'disclaimer-desc' ]}>
              <p>
                masalquileres.com no es una inmobiliaria ni se dedica al corretaje inmobiliario. Es una plataforma de
                publicación de inmuebles y de relacionamiento entre locadores y posibles interesados en alquilar un
                inmueble, con la asistencia de profesionales inmobiliarios. Versión beta.
              </p>
              <br/>
              <p>
                El uso de este sitio y todos sus servicios implica la total
                aceptación de los <span className={styles['terms-conditions']} onClick={() => this.setState({ showModal: true})}>términos y condiciones</span>.
              </p>
            </div>
          </div>
        </div>

        <div className={styles[ 'section-separator' ]}>
        </div>


        <TermsModal show={this.state.showModal} close={()=> this.setState({ showModal: false })} />
      </div>
    );
  }
}

export default connect(state => state)(HomePage);
