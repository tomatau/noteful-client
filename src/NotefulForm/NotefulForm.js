import React from 'react';
import { PropTypes } from 'prop-types';
import './NotefulForm.css'

const NotefulForm = (props) => {
  const { className, ...otherProps } = props
  return (
    <form
      className={['Noteful-form', className].join(' ')}
      action='#'
      {...otherProps}
    />
  );
};

NotefulForm.propTypes = {
  className: PropTypes.string,
  //
  otherProps: PropTypes.object
};

export default NotefulForm;
