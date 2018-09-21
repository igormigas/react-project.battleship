import React from 'react';
import PropTypes from 'prop-types';

import imgDot from '../../../images/svg/icon-dot.svg';
import imgCross from '../../../images/svg/icon-cross.svg';

const icon = (props) => {
	console.log(img);
	return (
		<img
			src={`/images/svg/icon-${props.name}.svg`}
			className={props.name}
			onClick={props.clickEvent} />
	);
};

icon.propTypes = {
	name: PropTypes.string.isRequired,
	clickEvent: PropTypes.func
}

export default icon;
