import React, { PropTypes, Component } from 'react';
import { connect } from 'react-redux';
import Helmet from 'react-helmet';

import { Link } from 'react-router';

import Bootstrap, { Button } from 'react-bootstrap';
import PostCreateForm from '../../components/PostTabsForms/PostMainInfoForm';
import PostUploadsForm from '../../components/PostTabsForms/PostUploadsForm';
import PostLocationForm from '../../components/PostTabsForms/PostLocationForm';
import PostConditionsForm from '../../components/PostTabsForms/PostConditionsForm';
import PostTabs from '../../components/PostTabs/PostTabs';

import styles from '../PostCreatePage/PostCreatePage.css';

// Import Actions
import { fetchPost, savePostRequest, uploadImage, uploadCondition } from '../../PostActions';

export class PostEditPage extends Component {

  constructor(props) {
    super(props);
    this.state = {
      loading: true,
      current: 'main',
      error: ''
    };
  }

  componentDidMount() {
    this.props.dispatch(fetchPost(this.props.params.id))
      .then(res => {
        this.setState({ loading: false, post: res });
      });
  }

  savePost = (e) => {
    e.preventDefault();

    this.setState({ error: '' });

    this.props.dispatch(savePostRequest({ ...this.state.post, user: this.props.user._id }))
      .then((post) => {
        this.setState({
          post: post,
          success: 'Guardado correctamente'
        });
        setTimeout(() => {
          this.setState({
            success: ''
          });
        }, 2000);
      })
      .catch(() => {
        this.setState({ error: 'Error en el servidor' });
      });
  };

  uploadImage = (file) => {
    return this.props.dispatch(uploadImage(this.state.post._id, file)).then(res => {
      this.setState({ post: res });
    });
  };

  removeImg = (file) => {
    return () => {
      this.setState({
        post: {
          ...this.state.post,
          uploads: this.state.post.uploads.filter((f) => {
            return f !== file;
          })
        }
      });
    }
  };

  uploadCondition = (field, file) => {
    return this.props.dispatch(uploadCondition(this.state.post._id, field, file)).then(res => {
      this.setState({ post: res });
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
      <div style={{padding: '30px 0px'}}>
        <Helmet title="Editar publicación"></Helmet>
        {
          !this.state.loading &&
            <div style={{ maxWidth: '80%', margin: '0 auto' }}>
              <div style={{padding: '30px 0px'}}>
                <Helmet title="Crear publicación"></Helmet>
                <PostTabs activeTab={this.activeTab} setActive={this.setActive}/>
                <Link style={{ float: 'right' }} to={`/posts/${this.state.post._id}`}>
                  VISUALIZAR ANUNCIO
                </Link>
                { this.state.current === 'main' &&
                  <PostCreateForm setField={this.setField} post={this.state.post}/> }
                { this.state.current === 'photos' &&
                  <PostUploadsForm setField={this.setField} post={this.state.post}
                                   uploadImage={this.uploadImage} removeImg={this.removeImg}/> }
                { this.state.current === 'location' &&
                  <PostLocationForm setField={this.setField} post={this.state.post}/> }
                { this.state.current === 'conditions' &&
                  <PostConditionsForm setField={this.setField} post={this.state.post} uploadCondition={this.uploadCondition}/> }
                <div className={styles['post-submit-button-container']}>
                  <Button bsStyle="primary" className={ styles['form-button'] } onClick={this.savePost}>
                    GUARDAR
                  </Button>
                  { this.state.error &&
                    <div className={ styles['form-error'] }>{this.state.error}</div>
                  }
                  { this.state.success &&
                    <div className={ styles['form-success'] }>{this.state.success}</div>
                  }
                </div>
              </div>
            </div>
        }
      </div>
    );
  }
}

export default connect(store => ({ posts: store.posts, user: store.user }))(PostEditPage);
