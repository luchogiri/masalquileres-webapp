import React, { PropTypes, Component } from 'react';
import { GoogleMapLoader, GoogleMap, Marker } from 'react-google-maps';

import styles from './Map.css';

import imgcerrar from '../assets/btncerrarpop.png';

export class Map extends Component {

  state = {};

  handleClose = () => {
    this.setState({
      toClose: true
    });
    setTimeout(this.props.onClose, 350);
  };

  render() {

    const marker = {
      position: {
        lat: this.props.geolocation[0],
        lng: this.props.geolocation[1],
      },
      key: `address`,
        defaultAnimation: 2,
    };

    const center = { lat: this.props.geolocation[0], lng: this.props.geolocation[1] };

    return(
      <div className={`${styles['bgpopup']} ${ styles.animated } ${ styles.fadeIn } ${ this.state.toClose && styles.fadeOut }`}>
        <div className={styles.popupwindow}>
          <div className={styles.boxMain}>
            <span onClick={this.handleClose} className={styles.btnCerrar}>
              <img src={imgcerrar} className={styles.img100}/>
            </span>
            <div style={{ width: '100%', height: '360px', backgroundColor: 'white', margin: '5px' }}>
              <GoogleMapLoader
                containerElement={
                  <div
                    style={{
                      height: "100%",
                    }}
                  />
                }
                googleMapElement={
                  <GoogleMap
                    defaultZoom={15}
                    center={center}>
                    <Marker {...marker} />
                  </GoogleMap>
                }
              />
            </div>
          </div>
        </div>
      </div>
    )
  }

}

Map.propTypes = {
  onClose: PropTypes.func.isRequired,
  geolocation: PropTypes.array.isRequired
};

export default Map;
