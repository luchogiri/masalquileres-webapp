import React, { PropTypes, Component } from 'react';
import { connect } from 'react-redux';

// Import Components
import PostListContainer from '../../components/PostListContainer/PostListContainer';

import ProfileContainer from '../../../User/components/ProfileContainer';

import styles from './PostUserPage.css';

class PostListPage extends Component {

  render() {
    return (
      <div>
        <ProfileContainer user={this.props.user} active="posts">
          <div className={styles.form}>
            <div className={styles[ 'form-content' ]}>
              <h2 className={ styles.titular }>Mis anuncios</h2>
              <PostListContainer all={false} id={this.props.params.id}/>
            </div>
          </div>
        </ProfileContainer>
      </div>
    );
  }
}

export default connect(state => state)(PostListPage);
