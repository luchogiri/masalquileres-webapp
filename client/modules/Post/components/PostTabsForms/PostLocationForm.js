import React, { Component, PropTypes } from 'react';
import { GoogleMapLoader, GoogleMap, Marker } from 'react-google-maps';

import styles from './PostTabsForms.css';

import InputContainer from '../../../../components/InputContainer';

export class PostLocationForm extends Component {

  constructor(props) {
    super(props);

    let center = {lat: -25.363882, lng: 131.044922};
    if(this.props.post.location.geolocation) {
      center = { lat: this.props.post.location.geolocation[0], lng: this.props.post.location.geolocation[1] };
    }

    this.state = {
      marker: {
        position: {
          lat: props.post.location.geolocation && props.post.location.geolocation[0],
          lng: props.post.location.geolocation && props.post.location.geolocation[1],
        },
        key: `address`,
        defaultAnimation: 2,
      },
      center
    };

  }

  componentDidMount() {
    this.autocomplete = new google.maps.places.Autocomplete(this.refs.autocomplete, {types: ['address']});

    this.autocomplete.addListener('place_changed', this.fillInAddress);
  }

  fillInAddress = () => {
    let place = this.autocomplete.getPlace();

    let lat = place.geometry.location.lat();
    let lng = place.geometry.location.lng();

    this.setLocationField('geolocation')([lat, lng]);

    this.setState({
      marker: {
        position: {
          lat: lat,
          lng: lng,
        },
        key: `address`,
        defaultAnimation: 2,
      },
      center: { lat, lng }
    });

    let location_fields = {
      street_number: 'street_number',
      route: 'street',
      locality: 'city',
      administrative_area_level_2: 'neighborhood',
      administrative_area_level_1: 'state',
      country: 'country'
    };

    place.address_components.forEach((cmp) => {
      let addressType = cmp.types[0];
      let addressField = location_fields[addressType];
      if(addressField) {
        this.setLocationField(addressField)(cmp.long_name)
      }
    });

    this.setLocationField('full_address')(place.formatted_address);
  };

  geolocate = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position) => {
        let geolocation = {
          lat: position.coords.latitude,
          lng: position.coords.longitude
        };
        let circle = new google.maps.Circle({
          center: geolocation,
          radius: position.coords.accuracy
        });
        this.autocomplete.setBounds(circle.getBounds());
      });
    }
  };

  setLocationField(field) {
    return (value) => {
      this.props.setField('location')({
          ...this.props.post.location,
          [field]: value.target ? value.target.value : value
      });
    }
  }

  render() {
    const styleInput1 = {
      ...styles,
      'form-field-container': styles['form-field-container-1']
    };

    const cssClasses = {
      input: styles['places-input']
    };

    return(
      <div>
        <div className={styles['form-section']}>
          <div className={styles['form-content']} style={{ padding: '0px 60px' }}>
            <h2 className={styles['form-title']}>DATOS DE LOCALIZACIÓN</h2>

            <div className={styles['col50']}>
              <InputContainer title="Dirección" styles={ styleInput1 }>
                <input className={ styles['form-field-input'] }
                       defaultValue={this.props.post.location.full_address}
                       onFocus={this.geolocate}
                       ref="autocomplete"
                       placeholder="Ingrese su dirección"
                       type="text">
                </input>
              </InputContainer>
              {
                this.props.post.location.full_address && !this.props.post.location.street_number &&
                <p className={styles['form-field-error']}>
                  No ha ingresado la númeración en la dirección
                </p>
              }
            </div>

            {/*<div className={styles['col50']}>*/}
              {/*<InputContainer title="Calle" styles={ styleInput1 }>*/}
                {/*<input className={ styles['form-field-input'] }*/}
                       {/*placeholder="Ej: Rivadavia"*/}
                       {/*value={this.props.post.location.street}*/}
                       {/*disabled={true}*/}
                {/*/>*/}
              {/*</InputContainer>*/}
            {/*</div>*/}

            {/*<div className={styles['col50sm']}>*/}
              {/*<InputContainer title="Altura" styles={ styleInput1 }>*/}
                {/*<input className={ styles['form-field-input'] }*/}
                       {/*placeholder="Ej: 1455"*/}
                       {/*value={this.props.post.location.street_number}*/}
                       {/*disabled={true}*/}
                {/*/>*/}
              {/*</InputContainer>*/}
            {/*</div>*/}


            <div className={styles['col50sm']}>
              <InputContainer title="Piso / Departamento" styles={ styleInput1 }>
                <input className={ styles['form-field-input'] }
                       placeholder="Ej: Piso 4, Departamento E"
                       defaultValue={this.props.post.location.section}
                       onChange={this.setLocationField('section')}
                />
              </InputContainer>
            </div>

            {/*<div className={styles['col50sm']}>*/}
              {/*<InputContainer title="Localidad" styles={ styleInput1 }>*/}
                {/*<input className={ styles['form-field-input'] }*/}
                       {/*placeholder="Ej: Capital Federal"*/}
                       {/*value={this.props.post.location.city}*/}
                       {/*disabled={true}*/}
                {/*/>*/}
              {/*</InputContainer>*/}
            {/*</div>*/}

            <div style={{ width: '100%', height: '300px', float:'left', backgroundColor: 'white', marginTop: '40px' }}>
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
                    center={this.state.center}>
                    { this.props.post.location.geolocation && <Marker {...this.state.marker} /> }
                  </GoogleMap>
                }
              />

            </div>

          </div>
        </div>
      </div>
    );
  }

}

PostLocationForm.propTypes = {
  post: PropTypes.object.isRequired,
  setField: PropTypes.func.isRequired
};

export default PostLocationForm;
