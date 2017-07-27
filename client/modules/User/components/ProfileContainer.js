import React, { PropTypes, Component } from 'react';
import { connect } from 'react-redux';

import { Link } from 'react-router';

import DropZone from 'react-dropzone';

import FontAwesome from 'react-fontawesome';

import styles from './ProfileContainer.css';

import success_icon from '../../../assets/success_icon.png';

import { uploadAvatar, removeAvatar } from '../UserActions';

class ProfileContainer extends Component {

  state = {
    subiendo: false
  };

  onDrop = (acceptedFiles, rejectedFiles) => {
    let data = new FormData();
    data.append('file', acceptedFiles[ 0 ]);

    this.setState({ subiendo: true });

    this.props.dispatch(uploadAvatar(this.props.user._id, data))
      .then(() => {
        this.setState({ subiendo: false })
      });
  };

  removeAvatar = () => {
    this.props.dispatch(removeAvatar(this.props.user));
  };

  openDropZone = () => {
    if(this.props.user._id === this.props.loggedUser._id) {
      this.dropzone.open();
    }
  };

  render() {
    const isLoggedUser = this.props.user._id === this.props.loggedUser._id;

    return (
      <div className={styles.contenedor}>
        <div className={styles.columnaNav}>
          <div className={styles.boxImagen}>
            <div>
              <img className={`${styles.avatar} ${this.state.subiendo ? styles.uploading : '' }`}
                   src={ this.props.user.avatar || `http://graph.facebook.com/${ this.props.user.facebook_id }/picture?type=large` }/>
              {
                this.props.user.verified &&
                <img className={styles.successIcon} src={ success_icon }/>
              }
              {
                isLoggedUser &&
                <div>
                  <div className={ styles.pencil } onClick={this.openDropZone}>
                    <FontAwesome
                      name='pencil'
                      size='2x'
                      style={{}}
                    />
                  </div>
                  <div className={ styles.close } onClick={this.removeAvatar}>
                    <FontAwesome
                      name='close'
                      size='2x'
                      style={{}}
                    />
                  </div>
                </div>
              }
            </div>
            <div className={styles[ 'upload-img-dropzone' ]}>
              <DropZone ref={(node) => {
                this.dropzone = node;
              }} multiple={false} accept="image/*" onDrop={this.onDrop}>
              </DropZone>
            </div>
          </div>
          {
            isLoggedUser &&
            <div>
              <ul>
                <li className={this.props.active === 'profile' ? styles.activo : ''}>
                  <Link to={`/profile/${this.props.user._id}`}>PERFIL</Link>
                </li>
                <li className={this.props.active === 'posts' ? styles.activo : ''}>
                  <Link to={`/posts/user/${this.props.user._id}`}>MIS ANUNCIOS</Link>
                </li>
              </ul>
              {
                this.props.loggedUser.rol === 'admin' &&
                <div className={styles.adminArea}>
                  <h4 className={styles.adminTitle}>Administración</h4>
                  <ul>
                    <li className={this.props.active === 'users-posts' ? styles.activo : ''}>
                      <Link to="/posts">ANUNCIOS</Link>
                    </li>
                    <li className={this.props.active === 'users' ? styles.activo : ''}>
                      <Link to={`/users`}>USUARIOS</Link>
                    </li>
                  </ul>
                </div>
              }
            </div>
          }
        </div>
        <div className={styles.columnaMain}>
          { this.props.children }
        </div>
      </div>
    );
  }

}

ProfileContainer.propTypes = {
  active: PropTypes.string.isRequired,
  user: PropTypes.object.isRequired,
};

export default connect(state => ({
  loggedUser: state.user
}))(ProfileContainer);
