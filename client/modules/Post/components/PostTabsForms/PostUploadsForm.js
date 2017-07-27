import React, { Component, PropTypes } from 'react';
import Bootstrap, { Button, Modal } from 'react-bootstrap';
import DropZone from 'react-dropzone';

import styles from './PostTabsForms.css';

import InputContainer from '../../../../components/InputContainer';

import { uploadImage } from '../../PostActions';

import imgcerrar from '../../../../assets/btncerrarpop.png';

let Lightbox = (<div></div>);

export class PostUploadsForm extends Component {

  constructor(props) {
    super(props);
    this.state = { subiendo: false, showModal: false };
  }

  componentDidMount() {
    Lightbox = require('react-image-lightbox');
  }

  onDrop = (field) => {
    return (acceptedFiles, rejectedFiles) => {
      this.setState({
        [field]: acceptedFiles[ 0 ].preview
      });
      let data = new FormData();
      data.append('file', acceptedFiles[ 0 ]);

      this.setState({ subiendo: true });
      this.props.uploadImage(data)
        .then(() => {
          this.setState({ subiendo: false })
        });
    };
  };

  onOpenClick = () => {
    this.dropzone.open();
  };

  closeConsejos = () => {
    this.setState({ showModal: false });
  };

  openConsejos = () => {
    this.setState({ showModal: true });
  };

  render() {
    const styleInput1 = {
      ...styles,
      'form-field-container': styles[ 'form-field-container-1' ]
    };

    return (
      <div>
        <div className={styles[ 'form-section' ]}>
          <div className={styles[ 'form-content' ]} style={{ padding: '0px 160px' }}>
            <h2 className={styles[ 'form-title' ]}>IMAGENES DE LA PROPIEDAD</h2>
            {
              !this.props.post._id &&
              <h3 className={styles[ 'form-subtitle' ]}>
                Para subir imágenes primero debes guardar el anuncio una vez
              </h3>
            }
            {
              this.props.post._id &&
              <h3 className={styles[ 'form-subtitle' ]}>
                Una imagen vale más que mil palabras. Las fotografías son la parte más importante de su
                anuncio. Por favor, tómese 5 minutos para leer los <a href="#" onClick={this.openConsejos}>siguientes
                consejos</a>.
              </h3>
            }
            {
              this.props.post._id &&
              <div className={styles[ 'upload-imgs-container' ]}>
                <div style={{ textAlign: 'left' }}>
                  {
                    this.props.post.uploads && this.props.post.uploads.map((file) =>
                      <div key={file.filename} className={styles[ 'upload-img-container' ]}>
                        <img className={styles[ 'upload-img' ]} src={file.url}
                             onClick={() => this.setState({ fileOpen: file.url })}/>
                        <span className={styles.btnCerrar} onClick={this.props.removeImg(file)}>
                          <img src={imgcerrar} style={{ width: '100%' }}/>
                        </span>
                      </div>
                    )
                  }
                </div>
                <div className={styles[ 'upload-img-dropzone' ]}>
                  <DropZone ref={(node) => {
                    this.dropzone = node;
                  }}
                            multiple={false} accept="image/*" onDrop={this.onDrop('file1')}>
                  </DropZone>
                </div>
                <div style={{ width: '100%', float: 'left', textAlign: 'center', marginTop: '25px' }}>
                  <Button bsStyle="info" className={styles[ 'upload-img-btn' ]}
                          onClick={this.onOpenClick} disabled={this.state.subiendo}>
                    { this.state.subiendo ? 'Subiendo imagen...' : '+ Imágenes' }
                  </Button>
                </div>
                <div className={styles[ 'upload-img-info' ]}>
                  *Imágenes en formato JPG, GIF o PNG (máximo 5mb)
                </div>
                {
                  this.state.fileOpen &&
                  <Lightbox
                    mainSrc={this.state.fileOpen}
                    onCloseRequest={() => this.setState({ fileOpen: undefined })}/>
                }
              </div>
            }
            {/*<div className={styles['upload-banner']}>*/}
            {/*</div>*/}
          </div>
        </div>

        <div className={styles[ 'form-section' ]} style={{ marginTop: '30px' }}>
          <div className={styles[ 'form-content' ]} style={{ padding: '0px 160px' }}>
            <h2 className={styles[ 'form-title' ]}>¿TENÉS UN VIDEO? AGREGALO</h2>

            <InputContainer title="Pegar aquí la URL de un video de Youtube" styles={ styleInput1 }>
              <input className={ styles[ 'form-field-input' ] }
                     placeholder="Ej: https://www.youtube.com/watch?v=jpjpVxNNNTfQ"
                     defaultValue={this.props.post.video}
                     onChange={this.props.setField('video')}
              />
            </InputContainer>

          </div>
        </div>

        <Modal show={this.state.showModal} bsSize="large" onHide={this.closeConsejos}>
          <Modal.Header closeButton>
            <Modal.Title>
              Al momento de fotograﬁar sus inmuebles, tenga en cuenta los siguientes consejos:
            </Modal.Title>
          </Modal.Header>
          <Modal.Body className={styles.modalBody}>
            <ul>
              <li className={styles.itemModal}>
                El interés de la persona que busca un inmueble es conocer los espacios del mismo, sus dimensiones y su
                luminosidad, para poder imaginarse a sí misma habitando el espacio.
              </li>
              <li className={styles.itemModal}>
                Antes de tomar las fotografías, es necesario ordenar los ambientes y retirar de la vista
                todas las fotografías y objetos personales.
              </li>
              <li className={styles.itemModal}>
                No fotografíe elementos que puedan causar mala impresión: platos sucios sobre la
                mesada, ropa tirada en el piso, la cama deshecha, los placares abiertos, la tapa del
                inodoro levantada, la ducha mojada, etc.
              </li>
              <li className={styles.itemModal}>
                No fotografíe personas en los ambientes, especialmente niños.
              </li>
              <li className={styles.itemModal}>
                Tome varias fotografías por cada ambiente, pero elija sólo la mejor para subir a la web.
              </li>
              <li className={styles.itemModal}>
                Por regla general, intente enviar entre 9 y 15 fotografías.
              </li>
              <li className={styles.itemModal}>
                Tome las fotografías colocando la cámara o el celular más o menos a la altura de sus
                ojos.
              </li>
              <li className={styles.itemModal}>
                No tome fotografías verticales. Trate de que todas las fotografías sean en formato
                horizontal.
              </li>
              <li className={styles.itemModal}>
                Elija el mejor momento del día para tomar las fotografías, cuando el sol ilumine los
                ambientes de forma indirecta. Si es necesario, fotografía los ambientes en distintos
                momentos del día.
              </li>
              <li className={styles.itemModal}>
                No tome fotografías de noche, en días de lluvia, o de frente a ventanas cuando el sol
                entra de pleno.
              </li>
              <li className={styles.itemModal}>
                En exteriores: trate de encuadrar la mayor cantidad de elementos posibles (jardines,
                pileta, fachada, etc).
              </li>
              <li className={styles.itemModal}>
                En fachadas: no fotografía fachadas que estén a la sombra. Si es necesario, tome la
                foto de una fachada de mañana, y de la contrafachada por la tarde.
              </li>
              <li className={styles.itemModal}>
                En interiores: aun cuando sea de día, intente tomar las fotografías con las luces
                encendidas, ya que suelen crear un ambiente más cálido.
              </li>
              <li className={styles.itemModal}>
                En ambientes amplios: ubíquese en un rincón y trate de encuadrar la mayor parte del
                ambiente. Repita ubicándose en otro rincón.
              </li>
              <li className={styles.itemModal}>
                En ambientes pequeños: puede ubicarse en el vano de la puerta o fuera de ella,
                tratando de no incluir en la imagen el marco de la misma.
              </li>
              <li className={styles.itemModal}>
                En baños: trate de no que no aparezca su reflejo en el espejo. Haga fotos desde
                ángulos superiores para captar los objetos vistos desde arriba. El inodoro debe tener
                siempre la tapa bajada. Si el baño es demasiado pequeño, es preferible fotograﬁar un
                detalle que dé a entender el estado general (el lavado, un grifo o una parte de los
                azulejos).
              </li>
              <li className={styles.itemModal}>
                Balcones y terrazas: no fotografíe sólo el espacio. Trate de incluir las vistas del
                entorno.
              </li>
              <li className={styles.itemModal}>
                Destaque todos los objetos que usted considere que dan valor a su inmueble.
              </li>
              <li className={styles.itemModal}>
                Al bajar las imágenes a su computadora para subirlas a la web, cambie el nombre de
                las mismas por una descripción del ambiente. Es decir, reemplace el nombre genérico
                de la imagen (00004534.jpg) por un nombre que describa el ambiente (dormitorio
                principal.jpg).
              </li>
            </ul>
          </Modal.Body>
          <Modal.Footer>
            Cualquier consulta, no dude en comunicarse con nosotros. Estamos para ayudarlo.
          </Modal.Footer>
        </Modal>
      </div>
    );
  }

}

PostUploadsForm.propTypes = {
  post: PropTypes.object.isRequired,
  uploadImage: PropTypes.func,
  removeImg: PropTypes.func
};

export default PostUploadsForm;
