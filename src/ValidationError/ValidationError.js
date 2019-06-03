import React from 'react';
import Proptypes from 'prop-types';

function ValidationError(props) {
    if(props.hasError) {
        return (
            <div className="error">{props.message}</div>
        );
    }

    return <></>
};

ValidationError.propTypes = {
    hasError: Proptypes.bool,
    message: Proptypes.string,
};

export default ValidationError;