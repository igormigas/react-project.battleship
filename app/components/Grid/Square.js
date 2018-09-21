import React from 'react';
import PropTypes from 'prop-types';

import imgDot from '../../images/svg/icon-dot.svg';
import imgCross from '../../images/svg/icon-cross.svg';

import classes from './Grid.scss';

const square = (props) => {

	const value = () => {
		switch (props.type) {
			case 'label':
			return props.children;

			case 'missed':
			return <img src={imgDot} />;

			case 'hit':
			return <img src={imgCross} />;

			default:
			return null;
		}
	}

	const onClickHandler = () => {
		props.fireEvent(props.row, props.col)
	}

	return (
		<div
			className={classes.Square + ' ' + props.type}
			onClick={onClickHandler}>
			{value()}
		</div>
	);
};

export default square;
