import React, { PropTypes, Component } from 'react';
import { connect } from 'react-redux';

import Helmet from 'react-helmet';

import ProfileContainer from '../../components/ProfileContainer';
import ProfileForm from '../../components/ProfileForm';

// Import Style
// import styles from './Profile.css';

// Import Actions
import { changeProfile, uploadDNI, changeField, login } from '../../UserActions';

class Profile extends Component {

  setField = (field, value) => {
    this.props.dispatch(changeField(field, value));
  };

  handleSubmit = () => {
    return this.props.dispatch(changeProfile(this.props.user._id, this.props.user))
      .then(res => {
        return this.props.dispatch(login(res));
      })
  };

  handleUploadDNI = (data) => {
    return this.props.dispatch(uploadDNI(this.props.user._id, data))
      .then(res => {
        this.props.dispatch(login(res));
      });
  };

  render() {
    return (
      <div>
        <Helmet title={ 'Perfil del Usuario' }/>
        <ProfileContainer user={this.props.user} active="profile">
          <ProfileForm setField={this.setField} handleSubmit={this.handleSubmit}
                       handleUploadDNI={this.handleUploadDNI} user={this.props.user}
                       canVerify={false}
          />
        </ProfileContainer>
      </div>
    );
  }

}

// Retrieve data from store as props
function mapStateToProps(state, props) {
  return {
    user: state.user
  };
}

Profile.propTypes = {};

export default connect(mapStateToProps)(Profile);
