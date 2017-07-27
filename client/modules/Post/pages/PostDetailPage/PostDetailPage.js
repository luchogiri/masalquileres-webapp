import React, { PropTypes, Component } from 'react';
import { connect } from 'react-redux';
import Helmet from 'react-helmet';

let Lightbox = (<div></div>);

import Map from '../../../../components/Map';

// Import Style
import styles from './PostDetailPage.css';

// Import Actions
import { fetchPost, publishRequest } from '../../PostActions';

import ImgBG from '../../../../assets/img_details.jpg';
import IconVerifUser from '../../../../assets/icon_verificado01.png';
import IconVerifPost from '../../../../assets/icon_verificado02.png';
import IconBath from '../../../../assets/icon_bath.png';
import IconBed from '../../../../assets/icon_bed.png';
import IconCar from '../../../../assets/icon_car.png';
import IconPoint from '../../../../assets/icon_point.png';
// import IconFacebook from '../../../../assets/icon_facebook.png';
// import IconTwitter from '../../../../assets/icon_twitter.png';
// import IconInstagram from '../../../../assets/icon_instagram.png';

import Bootstrap, { Button } from 'react-bootstrap';

const valueOf = (value) => value ? value : '-';

export class PostDetailPage extends Component {

  constructor(props) {
    super(props);
    this.state = { loading: true, photoIndex: 0 }
  }

  publish = () => {
    this.props.dispatch(publishRequest(this.state.post))
      .then(res => {
        this.setState({ loading: false, post: res });
      });
  };

  componentDidMount() {
    Lightbox = require('react-image-lightbox');
    this.props.dispatch(fetchPost(this.props.params.id))
      .then(res => {
        this.setState({ loading: false, post: res });
      });
  }

  toogleMap = () => {
    this.setState({
      mapOpen: !this.state.mapOpen
    });
  };

  render() {
    return (
      <div>
        {
          !this.state.loading &&
            <div>
              {
                this.state.mapOpen &&
                <Map geolocation={this.state.post.location.geolocation} onClose={this.toogleMap}></Map>
              }
              <div className={styles['details-bg']}
                   style={{ background: !this.state.post.uploads[0] && `#FFF url(${ImgBG}) center`, backgroundSize: 'cover' }}>
              </div>
              <div className={styles['preview-header']} style={{
                visibility: this.state.post.published ? 'hidden' : undefined
              }}>
                <div className={styles['preview-container']}>
                  <p className={styles['preview-text']}>
                    Vista previa de su publicación
                  </p>
                  <Button bsStyle="primary" className={styles['preview-button']} onClick={this.publish}>
                    PUBLICAR ANUNCIO
                  </Button>
                </div>
              </div>
              <div className={styles['main-container']}>
                <div className={styles['info-upper-row']} style={{ background: this.state.post.uploads[0] && `url(${this.state.post.uploads[0].url}) center`, backgroundSize: 'cover' }}>
                  <div className={styles['info-upper']}>
                    <div className={styles['info-upper-item-larger']}>
                      <div style={{ marginTop: '20px' }}>
                        <p className={styles['upper-label']}>
                          x Mes
                        </p>
                        <span className={styles['upper-price']}>
                        ${ this.state.post.price ? this.state.post.price : 0 }
                      </span>
                      </div>
                      <div>
                        <p className={styles['upper-label']}>
                          Expensas
                        </p>
                        <span className={styles['upper-expenses']}>
                        ${ this.state.post.expenses ? this.state.post.expenses : 0 } <span className={styles['upper-expenses-aprox']}>(aprox)</span>
                      </span>
                      </div>
                    </div>
                    {
                      this.props.user.verified &&
                      <div className={styles['info-upper-item']}>
                        <img className={styles['verified-img']} src={IconVerifUser}/>
                        <div className={styles['verified-text']}>Usuario Verificado</div>
                      </div>
                    }
                    {
                      this.state.post.verified &&
                      <div className={styles['info-upper-item']}>
                        <img className={styles['verified-img']} src={IconVerifPost}/>
                        <div className={styles['verified-text']}>Propiedad Verificada</div>
                      </div>
                    }
                  </div>
                </div>
                <div className={styles['details-container']}>
                  <div className={styles['details-left']}>
                    <div className={styles['details-title']}>
                      { this.state.post.title ? this.state.post.title : 'Sin Título' }
                    </div>
                    <p className={styles['details-description']}>
                      { this.state.post.description ? this.state.post.description : 'Sin Descripción' }
                    </p>
                    <div className={styles['details-section']}>
                      <div className={styles['details-section-title']}>
                        CARACTERISTICAS
                      </div>
                      <ul className={styles['details-info-list']}>
                        <li className={styles['details-info-item']}>
                          <div className={styles['details-info-label']}>Disponibilidad:</div>
                          <p className={styles['details-info-value']}>{ valueOf(this.state.post.availability) }</p>
                        </li>
                        <li className={styles['details-info-item']}>
                          <span className={styles['details-info-label']}>Tipo de propiedad:</span>
                          <p className={styles['details-info-value']}>{ valueOf(this.state.post.type) }</p>
                        </li>
                        <li className={styles['details-info-item']}>
                          <span className={styles['details-info-label']}>Cant. de Ambientes:</span>
                          <p className={styles['details-info-value']}>{ valueOf(this.state.post.rooms) }</p>
                        </li>
                        <li className={styles['details-info-item']}>
                          <span className={styles['details-info-label']}>Cant. de Dormitorios:</span>
                          <p className={styles['details-info-value']}>{ valueOf(this.state.post.dormitories) }</p>
                        </li>
                        <li className={styles['details-info-item']}>
                          <span className={styles['details-info-label']}>Antigüedad:</span>
                          <p className={styles['details-info-value']}>{ valueOf(this.state.post.years) }</p>
                        </li>
                        <li className={styles['details-info-item']}>
                          <span className={styles['details-info-label']}>Tipo de propiedad:</span>
                          <p className={styles['details-info-value']}>{ valueOf(this.state.post.type) }</p>
                        </li>
                        <li className={styles['details-info-item']}>
                          <span className={styles['details-info-label']}>Superficie total:</span>
                          <p className={styles['details-info-value']}>{ valueOf(this.state.post.total_area) } m2</p>
                        </li>
                        <li className={styles['details-info-item']}>
                          <span className={styles['details-info-label']}>Superficie cubierta:</span>
                          <p className={styles['details-info-value']}>{ valueOf(this.state.post.covered_area) } m2</p>
                        </li>
                      </ul>
                    </div>
                    <div className={styles['details-section']}>
                      <div className={styles['details-section-title']}>
                        GARANTÍAS ACEPTADAS
                      </div>
                      <ul className={styles['details-info-list']}>
                        <li className={styles['details-info-item']}>
                          <div className={styles['details-info-label']}>Garantía propietaria:</div>
                          <p className={styles['details-info-value']}>{ this.state.post.warranty_owner ? 'SI' : 'NO' }</p>
                        </li>
                        <li className={styles['details-info-item']}>
                          <span className={styles['details-info-label']}>Seguro de caución:</span>
                          <p className={styles['details-info-value']}>{ this.state.post.surety_insurance ? 'SI' : 'NO' }</p>
                        </li>
                      </ul>
                    </div>
                    <div className={styles['details-section']}>
                      <div className={styles['details-section-title']}>
                        REQUISITOS
                      </div>
                      <ul className={styles['details-info-list']}>
                        <li className={styles['details-info-item']}>
                          <p className={styles['details-info-value']}>Mayor de 18 años</p>
                        </li>
                        <li className={styles['details-info-item']}>
                          <p className={styles['details-info-value']}>Declaración de ingresos</p>
                        </li>
                      </ul>
                    </div>
                    <div className={styles['details-section']}>
                      <div className={styles['details-section-title']}>
                        GALERÍA DE FOTOS
                      </div>
                      <ul className={styles['details-prop-img-list']}>
                        {
                          this.state.post.uploads &&
                            this.state.post.uploads.map((file) =>
                              <li key={file.filename} className={styles['details-prop-img']}>
                                <img style={{ width: '100%', height: '100%' }} src={file.url}
                                     onClick={() => this.setState({ isOpen: true, photoIndex: this.state.post.uploads.indexOf(file) })}/>
                              </li>
                            )
                        }
                      </ul>
                      {
                        this.state.isOpen &&
                          <Lightbox
                            mainSrc={this.state.post.uploads[this.state.photoIndex].url}
                            nextSrc={this.state.post.uploads[(this.state.photoIndex + 1) % this.state.post.uploads.length].url}
                            prevSrc={
                              this.state.post.uploads[(this.state.photoIndex + this.state.post.uploads.length - 1) % this.state.post.uploads.length].url
                            }
                            onCloseRequest={() => this.setState({ isOpen: false })}
                            onMovePrevRequest={() => this.setState({
                              photoIndex: (this.state.photoIndex + this.state.post.uploads.length - 1) % this.state.post.uploads.length,
                            })}
                            onMoveNextRequest={() => this.setState({
                              photoIndex: (this.state.photoIndex + 1) % this.state.post.uploads.length,
                            })}/>
                      }
                    </div>
                  </div>
                  <div className={styles['details-right']}>
                    <div className={styles['details-right-values-container']}>
                      <div className={styles['details-right-values-row']}>
                        <div className={styles['details-right-values-label']}>
                          <img className={styles['details-right-values-label-img']} src={IconBath}/>
                        </div>
                        <div className={styles['details-right-values-value']}>
                          { valueOf(this.state.post.bathrooms) } Baño
                        </div>
                      </div>
                      <div className={styles['details-right-values-row']}>
                        <div className={styles['details-right-values-label']}>
                          <img className={styles['details-right-values-label-img']} src={IconBed}/>
                        </div>
                        <div className={styles['details-right-values-value']}>
                          { valueOf(this.state.post.dormitories) } Dormitorios
                        </div>
                      </div>
                      <div className={styles['details-right-values-row']}>
                        <div className={styles['details-right-values-label']}>
                          <img className={styles['details-right-values-label-img']} src={IconCar}/>
                        </div>
                        <div className={styles['details-right-values-value']}>
                          { valueOf(this.state.post.parking) } Cochera
                        </div>
                      </div>
                      <div className={styles['details-right-values-row']}>
                        <div className={styles['details-right-values-label']}>
                          <img className={styles['details-right-values-label-img']}
                               style={{ width: '17px', marginLeft: '7px' }}
                               src={IconPoint}/>
                        </div>
                        <div className={styles['details-right-values-value']}>
                          <div style={{ fontSize: '10px' }}>
                            { valueOf(this.state.post.location && this.state.post.location.street) }
                          </div>
                          <div style={{ fontSize: '10px' }}>
                            { valueOf(this.state.post.location && this.state.post.location.city ) }
                          </div>
                        </div>
                      </div>
                      <div className={styles['details-right-see-map']}>
                        <a href="#" onClick={this.toogleMap}
                           style={{ color: 'white' }}>
                          Ver Mapa
                        </a>
                      </div>
                    </div>
                    {/*<div className={styles['details-interested-section']}>*/}
                      {/*<div className={styles['details-interested-title']}>*/}
                        {/*¿Interesado?*/}
                      {/*</div>*/}
                      {/*<p className={styles['details-interested-text']}>*/}
                        {/*Coordiná con el anunciante días y horarios para poder visitarla*/}
                      {/*</p>*/}
                      {/*<Button className={styles['details-interested-button']}>*/}
                        {/*CONTACTAR AL ANUNCIANTE*/}
                      {/*</Button>*/}
                    {/*</div>*/}
                    {/*<div className={styles['details-share-section']}>*/}
                      {/*<div className={styles['details-share-title']}>*/}
                        {/*Compartir la publicación*/}
                      {/*</div>*/}
                      {/*<div className={styles['details-interested-img-container']}>*/}
                        {/*<img src={IconFacebook} className={styles['details-interested-img']}/>*/}
                        {/*<img src={IconTwitter} className={styles['details-interested-img']}/>*/}
                        {/*<img src={IconInstagram} className={styles['details-interested-img']}/>*/}
                      {/*</div>*/}
                    {/*</div>*/}
                    {/*<div className={styles['details-right-banner']}>*/}
                    {/*</div>*/}
                  </div>
                </div>
              </div>
            </div>
        }
      </div>
    );
  }
}

export default connect(store => ({ posts: store.posts, user: store.user }))(PostDetailPage);
