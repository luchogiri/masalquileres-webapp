import React, { PropTypes, Component } from 'react';
import { connect } from 'react-redux';
import Helmet from 'react-helmet';

import Bootstrap, { Button } from 'react-bootstrap';
import PostCreateForm from '../../components/PostTabsForms/PostMainInfoForm';
import PostUploadsForm from '../../components/PostTabsForms/PostUploadsForm';
import PostLocationForm from '../../components/PostTabsForms/PostLocationForm';
import PostConditionsForm from '../../components/PostTabsForms/PostConditionsForm';
import PostTabs from '../../components/PostTabs/PostTabs';

import UserVerification from '../../../User/components/UserVerification/UserVerification';

import { browserHistory } from 'react-router';

// Import Actions
import { savePostRequest } from '../../PostActions';

import styles from './PostCreatePage.css';

export class PostCreatePage extends Component {

  constructor(props) {
    super(props);
    this.state = {
      current: 'main',
      error: '',
      post: {
        location: {
          full_address: ''
        }
      },
    };
  }

  componentDidMount() {
    if(!this.props.user.document_image || !this.props.user.contact_info ) {
      this.setState({
        modalOpen: true
      });
    }
  }

  handleCloseModal = () => {
    this.setState({
      modalOpen: false
    });
  };

  savePost = (e) => {
    e.preventDefault();

    this.setState({ error: '' });

    this.props.dispatch(savePostRequest({ ...this.state.post, user: this.props.user._id }))
      .then((post) => {
        this.setState({
          post: post,
          success: 'Guardado correctamente'
        });
        browserHistory.replace(`/posts/edit/${post._id}`);
      })
      .catch(() => {
        this.setState({ error: 'Error en el servidor' });
      });
  };

  setActive = (tab) => {
    return () => {
      this.setState({ current: tab });
    };
  };

  activeTab = (tab) => {
    if(this.state.current == tab) {
      return 'active';
    } else {
      return '';
    }
  };

  setField = (field) => {
    return (value) => {
      this.setState({ post: { ...this.state.post, [field]: value.target ? value.target.value : value } });
    }
  };

  render() {
    return (
      <div style={{ maxWidth: '80%', margin: '0 auto' }}>
        <div style={{padding: '30px 0px'}}>
          <Helmet title="Crear publicación"></Helmet>
          {
            this.state.modalOpen &&
            <UserVerification user={this.props.user} handleClose={this.handleCloseModal}
                              dispatch={this.props.dispatch}/>
          }
          <PostTabs activeTab={this.activeTab} setActive={this.setActive}/>
          { this.state.current === 'main' ?
              <PostCreateForm setField={this.setField} post={this.state.post}/> : null }
          { this.state.current === 'photos' ?
            <PostUploadsForm setField={this.setField} post={this.state.post}/> : null }
          { this.state.current === 'location' ?
            <PostLocationForm setField={this.setField} post={this.state.post}/> : null }
          { this.state.current === 'conditions' ?
            <PostConditionsForm setField={this.setField} post={this.state.post}/> : null }
          <div className={styles['post-submit-button-container']}>
            <Button bsStyle="primary" className={ styles['form-button'] } onClick={this.savePost}>GUARDAR</Button>
            { this.state.error &&
              <div className={ styles['form-error'] }>{this.state.error}</div>
            }
            { this.state.success &&
              <div className={ styles['form-success'] }>{this.state.success}</div>
            }
          </div>
        </div>
      </div>
    );
  }
}

export default connect(store => ({ user: store.user }))(PostCreatePage);
