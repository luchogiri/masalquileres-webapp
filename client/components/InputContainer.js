import React, { Component, PropTypes } from 'react';

export default class InputContainer extends Component {
  render() {
    return(
      <div className={this.props.styles['form-field-container']}>
        <span className={this.props.styles['form-field-label']}>{ this.props.title }</span>
        <div className={this.props.styles['form-field']}>
          { this.props.children }
        </div>
        {
          this.props.fieldError ?
            <span className={this.props.styles['form-field-error']}>Obligatorio</span> : null
        }
      </div>
    );
  }
}
