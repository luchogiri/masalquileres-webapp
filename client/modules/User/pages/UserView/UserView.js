import React, { PropTypes, Component } from 'react';
import { connect } from 'react-redux';
import ReactPaginate from 'react-paginate';

import ProfileContainer from '../../components/ProfileContainer';

import ProfileForm from '../../components/ProfileForm';

// import styles from './UserView.css';

import { getUser, changeProfile, uploadDNI } from '../../UserActions';

class UserView extends Component {

  state = {
    loading: true
  };

  componentDidMount() {
    this.fetchUser();
  }

  fetchUser = () => {
    this.props.dispatch(getUser(this.props.params.id))
      .then(user => {
        this.setState({
          user,
          loading: false
        });
      });
  };

  setField = (field, value) => {
    this.setState({
      user: {
        ...this.state.user,
        [field]: value
      }
    });
  };

  handleSubmit = () => {
    return this.props.dispatch(changeProfile(this.state.user._id, this.state.user))
      .then(res => {
        this.setState({
          user: res.user
        });
      })
  };

  handleUploadDNI = (data) => {
    return this.props.dispatch(uploadDNI(this.state.user._id, data))
      .then(res => {
        this.setState({
          user: res.user
        })
      });
  };

  verify = () => {

  };

  render() {
    return (
      <div>
        {
          !this.state.loading &&
          <ProfileContainer user={this.state.user} active="user">
            <ProfileForm setField={this.setField} handleSubmit={this.handleSubmit}
                         handleUploadDNI={this.handleUploadDNI} user={this.state.user}
                         canVerify={true}/>
          </ProfileContainer>
        }
      </div>
    );
  }

}

export default connect(state => state)(UserView);
