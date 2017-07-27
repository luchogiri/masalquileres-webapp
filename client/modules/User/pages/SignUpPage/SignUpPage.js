import React, { PropTypes, Component } from 'react';
import { Link } from 'react-router';

import B, { Button, ButtonToolbar } from 'react-bootstrap';

import { connect } from 'react-redux';
import { browserHistory } from 'react-router'
import Helmet from 'react-helmet';

// Import Style
import styles from './SignUpPage.css';

// Import Actions
import { signUpRequest } from '../../UserActions';

class SignUpPage extends Component {

  constructor(props) {
    super(props);
    this.state = { error: false, msg: '' };
  }

  handleSubmit = () => {
    this.setState({ error: false, msg: '' });
    this.props.dispatch(signUpRequest({
      first_name: this.refs.first_name.value,
      last_name: this.refs.last_name.value,
      email: this.refs.email.value
    })).then(res => {
      ga('send', 'event','Registrarse', 'Enviar');
      browserHistory.push('/');
    }).catch(res => {
      this.setState({
        error: true,
        msg: res.msg
      })
    });
  }

  handleBack = () => {
    browserHistory.push('/');
  }

  render() {
    return (
      <div style={{padding: '30px 0px'}}>
        <Helmet title={ 'User sign up' } />
        <div className={ styles.form }>
          <div className={styles['form-content']}>
            <h2 className={styles['form-title']}>Sign up</h2>
            <div>
              <span>Nombre</span>
              <input className={styles['form-field']} ref="first_name" />
            </div>
            <div>
              <span>Apellido</span>
              <input className={styles['form-field']} ref="last_name" />
            </div>
            <div>
              <span>Email</span>
              <input className={styles['form-field']} ref="email" />
            </div>
            <ButtonToolbar>
              <Button bsStyle="success" onClick={this.handleSubmit}>Submit</Button>
              <Button bsStyle="warning" onClick={this.handleBack}>
                Back
              </Button>
              { this.state.error ? <span className={styles['error']}>{ this.state.msg }</span> : null }
            </ButtonToolbar>
          </div>
        </div>
      </div>
    );
  }

}

// Retrieve data from store as props
function mapStateToProps(state, props) {
  return {};
}

SignUpPage.propTypes = {};

export default connect(mapStateToProps)(SignUpPage);
