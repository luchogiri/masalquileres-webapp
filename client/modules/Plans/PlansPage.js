import React, { PropTypes, Component } from 'react';
import { connect } from 'react-redux';
import Helmet from 'react-helmet';

import { browserHistory } from 'react-router';

import Bootstrap, { Button, Modal, OverlayTrigger, Tooltip } from 'react-bootstrap';

import styles from './PlansPage.css';

import img1 from '../../assets/header_login.png';
import moreImg from '../../assets/more@2x.png';

// Import Actions
import { acceptTerms, login } from '../User/UserActions';

class PlansPage extends Component {

  state = {
    accept: false,
    showModal: false
  };

  send = () => {
    this.props.dispatch(acceptTerms(this.props.user)).then((data) => {
      browserHistory.replace('/posts/create');
    });
  };

  closeModal = () => {
    this.setState({ showModal: false });
  };

  openModal = () => {
    this.setState({ showModal: true });
  };

  render() {

    const tooltip1 = (
      <Tooltip id="tooltip1">
        Zonaprop, Argenprop, Mercado Libre,
        Buscainmueble, Clasificados.Clarín, Reporte Inmobiliario, Top Inmobiliario, Properati,
        Liderprop.com, Enbuenosaires.com, Goplaceit.com, Doomos, Icasas, Memudoya.com, etc.
      </Tooltip>
    );

    const tooltip2 = (
      <Tooltip id="tooltip2">
        Red Sumaprop, Red Cucicba, Sistema Dixon, Red Lider
        prop, Red Mapaprop
      </Tooltip>
    );

    return (
      <div style={{ maxWidth: '90%', margin: '0 auto', }}>
        <div style={{ padding: '30px 0px' }}>
          <div style={{ witdh: '100%', textAlign: 'center', marginBottom: '20px' }}>
            <h1>
              Elija su plan
            </h1>
          </div>
          <div className={styles.plansRow}>
            <div className={styles.plan} style={{ opacity: '0.7' }}>
              <div className={styles.planHeader}>
                <img src={img1} className={styles.img100}/>
                <div className={styles.planTitle}><h3>Próximamente</h3></div>
              </div>
              <div className={styles.textContainer}>
              </div>
            </div>
            <div className={styles.plan}>
              <div className={styles.planHeader}>
                <img src={img1} className={styles.img100}/>
                <div className={styles.planTitle}><h3>Plan Básico</h3></div>
              </div>
              <div className={styles.textContainer}>
                <div style={{ textAlign: 'left' }}>
                  <ul>
                    <li className={styles.itemListPlan}>
                      <span className={styles.planText}>
                      Publicación en nuestra web dkprop.com.ar
                      </span>
                    </li>
                    <li className={styles.itemListPlan}>
                      <span className={styles.planText}>
                        Difusión en los principales portales inmobiliarios
                        <OverlayTrigger placement="top" overlay={tooltip1}>
                          <img className={styles.more} src={moreImg}/>
                        </OverlayTrigger>
                      </span>
                    </li>
                    <li className={styles.itemListPlan}>
                      <span className={styles.planText}>
                        Difusión en sistemas interinmobiliarios
                        <OverlayTrigger placement="top" overlay={tooltip2}>
                          <img className={styles.more} src={moreImg}/>
                        </OverlayTrigger>
                      </span>
                    </li>
                    <li className={styles.itemListPlan}>
                      <span className={styles.planText}>
                        Asesoramiento integral
                      </span>
                    </li>
                    <li className={styles.itemListPlan}>
                      <span className={styles.planText}>
                        Informes comerciales sobre los interesados
                      </span>
                    </li>
                    <li className={styles.itemListPlan}>
                      <span className={styles.planText}>
                        Chequeo de la garantía
                      </span>
                    </li>
                    <li className={styles.itemListPlan}>
                      <span className={styles.planText}>
                        Redacción del contrato de locación
                      </span>
                    </li>
                  </ul>
                  <span className={styles.planText}>Comisión: 1/2 mes más IVA.</span>

                  <div className={ styles.formButtonContainer }>
                    <Button bsStyle="primary" className={ styles.formButton } onClick={this.send}>
                      CONTRATAR
                    </Button>
                  </div>

                  <div className={styles.terms}>Al contratar está aceptando las <a href="#" onClick={this.openModal}>condiciones</a></div>
                </div>
              </div>
            </div>
            <div className={styles.plan} style={{ opacity: '0.7' }}>
              <div className={styles.planHeader}>
                <img src={img1} className={styles.img100}/>
                <div className={styles.planTitle}><h3>Próximamente</h3></div>
              </div>
              <div className={styles.textContainer}>
              </div>
            </div>
          </div>
        </div>

        <Modal show={this.state.showModal} bsSize="large" onHide={this.closeModal}>
          <Modal.Header closeButton>
            <Modal.Title style={{ textAlign: 'center' }}>
              TÉRMINOS Y CONDICIONES DE COMERCIALIZACIÓN
            </Modal.Title>
          </Modal.Header>
          <Modal.Body className={styles.modalBody}>
            <p>A continuación se describen los Términos y Condiciones Particulares (en adelante llamados los TYCPP) que
              regirán la contratación de los servicios de comercialización de Durban & Keiller Asesoramiento
              Inmobiliario
              (en adelante la INMOBILIARIA) por parte del Usuario (en adelante llamado LA PARTE AUTORIZANTE).</p>

            <p>El envío del siguiente formulario implica la total e incondicional aceptación de los TYCP. Al completar
              el
              siguiente formulario, Ud. acepta expresamente que está contratando los servicios de corretaje
              inmobiliario,
              intermediación, difusión y asesoramiento de la INMOBILIARIA, de acuerdo a los términos del presente
              documento, y al plan de servicios elegido por Ud.</p>

            <p>Cualquier persona física o jurídica que contrate los servicios de la INMOBILIARIA a través de este medio
              declara conocer y aceptar estos TYCP.</p>

            <p>CUALQUIER PERSONA QUE NO ACEPTE ESTOS TÉRMINOS Y CONDICIONES GENERALES, LOS CUALES TIENEN CARÁCTER
              OBLIGATORIO Y VINCULANTE, DEBERÁ ABSTENERSE DE PUBLICAR SU INMUEBLE.</p>

            <ul>
              <li className={styles.itemModal}>
                <p>Salvo indicación particular en contrario, el corredor público responsable es el Sr. Darío Sebastián
                  Durban, con registros profesionales C.M.C.P.S.I. N° 5654 y C.U.C.I.C.B.A. N° 5606.
                </p>
              </li>
              <li className={styles.itemModal}>
                <p>El Usuario acepta expresamente que la contratación de los productos y servicios ofrecidos implica
                  costos y obliga al Usuario al pago de los gastos, honorarios profesionales e impuestos indicados más
                  abajo.
                </p>
              </li>
              <li className={styles.itemModal}>
                <p>El Usuario es el único y total responsable por la veracidad, pertinencia y exactitud de los datos que
                  suministre al sistema. Al enviar el siguiente formulario de contratación o completar cualquier otro
                  tipo de formulario, el Usuario declara que la información proporcionada es exacta y verdadera.
                </p>
              </li>
              <li className={styles.itemModal}>
                <p>LA PARTE AUTORIZANTE declara que en el INMUEBLE no existe a su entender ningún vicio oculto.
                </p>
              </li>
              <li className={styles.itemModal}>
                <p>LA PARTE AUTORIZANTE declara ser mayor de edad y tener facultades y capacidad suficientes para
                  administrar INMUEBLE.
                </p>
              </li>
              <li className={styles.itemModal}>
                <p>LA PARTE AUTORIZANTE asume la obligación de entregar el INMUEBLE con todos los impuestos,
                  contribuciones, tasas, servicios y demás obligaciones correspondientes al INMUEBLE totalmente pagos
                  hasta el día de la entrega de posesión.
                </p>
              </li>
              <li className={styles.itemModal}>
                <p>LA PARTE AUTORIZANTE autoriza a la INMOBILIARIA a tomar reservas y ofertas AD REFERENDUM de su
                  aprobación.
                </p>
              </li>
              <li className={styles.itemModal}>
                <p>LA PARTE AUTORIZANTE se obliga a cumplimentar las disposiciones de la ley 25.246 y sus modificatorias
                  sobre Lavado de Activos y Financiación del Terrorismo de la Unidad de Información Financiera.
                </p>
              </li>
              <li className={styles.itemModal}>
                <p>Al momento de concretarse la operación, LA PARTE AUTORIZANTE reconocerá la intervención profesional
                  de la INMOBILIARIA, por lo que se obliga a abonarle la suma equivalente a medio (1/2) mes del primer
                  mes del alquiler convenido más IVA en concepto de honorarios al momento de suscribir el contrato de
                  locación.
                </p>
              </li>
              <li className={styles.itemModal}>
                <p>Si una vez aceptada la oferta y acercadas suficientemente LAS PARTES la operación quedara sin efecto
                  por culpa de LA PARTE AUTORIZANTE, o se diera cualquiera de los supuestos mencionados en el artículo
                  1352 del Código Civil y Comercial, ésta deberá abonar la suma completa de honorarios pactados, sin
                  necesidad de interpelación judicial ni extrajudicial alguna.
                </p>
              </li>
              <li className={styles.itemModal}>
                <p>La INMOBILIARIA se reserva el derecho de rechazar la contratación si existieran a su entender
                  circunstancias que llevaren a sospechar una posible acción fraudulenta de parte del Usuario, o si de
                  ella se desprendiera cualquier tipo de inconsistencia con los datos declarados en el formulario
                  enviado.
                </p>
              </li>
              <li className={styles.itemModal}>
                <p>LA PARTE AUTORIZANTE se compromete a facilitar las visitas al inmueble, en días y horas a convenir,
                  siempre dentro del horario de atención inmobiliaria: de lunes a viernes de 9 a 20 hs, y sábados de 9 a
                  18 hs.
                </p>
              </li>
              <li className={styles.itemModal}>
                <p>Estos TYCP, el uso del Sitio, y la contratación y el uso de los productos y servicios ofrecidos por
                  la INMOBILIARIA se rige por la normativa vigente en la República Argentina.
                </p>
              </li>
              <li className={styles.itemModal}>
                <p>Ante cualquier diferencia interpretativa de cualquier situación prevista o no en estos TYCP, la
                  INMOBILIARIA se reserva el derecho de determinar los criterios a aplicar para su mejor resolución.
                </p>
              </li>
              <li className={styles.itemModal}>
                <p>El Usuario y la INMOBILIARIA se someten a la jurisdicción de los tribunales ordinarios de la Ciudad
                  de San Isidro, República Argentina.
                </p>
              </li>
              <li className={styles.itemModal}>
                <p>El Usuario declara haber leído, entendido y aceptado todas las condiciones establecidas en estos
                  TYCP, así como en los demás documentos incorporados a los mismos por referencia.
                </p>
              </li>
            </ul>
          </Modal.Body>
          <Modal.Footer style={{ textAlign: 'center' }}>
            <Button bsStyle="primary" className={ styles[ 'form-button' ] } onClick={this.closeModal}>
              Continuar
            </Button>
          </Modal.Footer>
        </Modal>
      </div>
    )
  }

}

export default connect(store => ({ user: store.user }))(PlansPage);
