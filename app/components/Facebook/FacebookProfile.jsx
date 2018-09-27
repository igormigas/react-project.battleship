import React from 'react';
import PropTypes from 'prop-types';

const facebookProfile = props => {
  const message = `Hello ${props.name}!`;
  return (
    <div className="fbProfile">
      <div className="fbPhoto">
        <img src={props.image} alt={props.name} />
      </div>
      <h3>
        {message}
      </h3>
    </div>
  );
};

facebookProfile.propTypes = {
  name: PropTypes.string.isRequired,
  image: PropTypes.string.isRequired,
};

export default facebookProfile;
